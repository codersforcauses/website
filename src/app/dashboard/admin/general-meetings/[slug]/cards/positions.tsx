"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { DragDropProvider } from "@dnd-kit/react"
import { useSortable } from "@dnd-kit/react/sortable"
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
import { RestrictToElement } from "@dnd-kit/dom/modifiers"

import { api } from "~/trpc/react"
import { toast } from "~/hooks/use-toast"
import { cn } from "~/lib/utils"
import { Button } from "~/ui/button"
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "~/ui/field"
import { Input } from "~/ui/input"
import { Spinner } from "~/ui/spinner"
import { Textarea } from "~/ui/textarea"

type PositionItem = {
  dndId: string
  id?: string
  title: string
  openings: number
  description: string
}

type DbPosition = {
  id: string
  title: string
  openings: number
  description: string | null
  priority: number
  meetingId: string
}

function SortableRow({
  item,
  index,
  loading,
  onRemove,
  onChange,
}: {
  item: PositionItem
  index: number
  loading: boolean
  onRemove: () => void
  onChange: (field: keyof Pick<PositionItem, "title" | "openings" | "description">, value: string | number) => void
}) {
  const { handleRef, ref } = useSortable({
    id: item.dndId,
    index,
    modifiers: [
      RestrictToVerticalAxis,
      RestrictToElement.configure({
        element() {
          return document.querySelector("[data-positions-container]")
        },
      }),
    ],
  })

  return (
    <div ref={ref} className="group/drag-n-drop relative flex gap-4 bg-neutral-50/75 p-4 dark:bg-neutral-900/25">
      <div
        ref={handleRef}
        className="invisible absolute top-0 left-1/2 -translate-x-1/2 cursor-move px-4 select-none group-hover/drag-n-drop:visible"
      >
        <span className="material-symbols-sharp rotate-90 text-base! leading-none! text-neutral-500 dark:text-neutral-400">
          drag_indicator
        </span>
      </div>
      <div className="invisible absolute top-0 -left-9 bg-white p-0.5 group-hover/drag-n-drop:visible dark:bg-neutral-950">
        <div className="bg-neutral-50/75 dark:bg-neutral-900/25">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={loading}
            className="hover:text-red-400 dark:hover:text-red-600"
            onClick={onRemove}
          >
            <span className="material-symbols-sharp text-base! leading-none!">delete</span>
          </Button>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-1">
          <label className="font-mono text-sm leading-snug font-medium">Title</label>
          <Input
            value={item.title}
            placeholder="President"
            disabled={loading}
            onChange={(e) => onChange("title", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-mono text-sm leading-snug font-medium">Openings</label>
          <Input
            value={item.openings}
            placeholder="1"
            inputMode="numeric"
            type="number"
            min={1}
            disabled={loading}
            onChange={(e) => onChange("openings", e.target.valueAsNumber)}
          />
        </div>
        <div className="col-span-3 flex flex-col gap-1">
          <label className="font-mono text-sm leading-snug font-medium">
            Description <span className="text-neutral-500 dark:text-neutral-400">(optional)</span>
          </label>
          <Textarea
            value={item.description}
            placeholder="Short description about the position"
            disabled={loading}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function PositionsForm({
  meetingId,
  initialPositions,
  onSaved,
}: {
  meetingId: string
  initialPositions: DbPosition[]
  onSaved: () => void
}) {
  const utils = api.useUtils()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [btnText, setBtnText] = React.useState("Save positions")
  const [loading, startTransition] = React.useTransition()

  const [positions, setPositions] = React.useState<PositionItem[]>(() =>
    [...initialPositions]
      .sort((a, b) => a.priority - b.priority)
      .map((p) => ({ dndId: p.id, id: p.id, title: p.title, openings: p.openings, description: p.description ?? "" })),
  )
  const [removedIds, setRemovedIds] = React.useState<string[]>([])

  const createPositions = api.admin.generalMeetings.positions.create.useMutation()
  const updatePosition = api.admin.generalMeetings.positions.update.useMutation()
  const deletePosition = api.admin.generalMeetings.positions.delete.useMutation()

  function handleAdd() {
    setPositions((prev) => [...prev, { dndId: crypto.randomUUID(), title: "", openings: 1, description: "" }])
  }

  function handleRemove(index: number) {
    const item = positions[index]
    if (item?.id) setRemovedIds((prev) => [...prev, item.id!])
    setPositions((prev) => prev.filter((_, i) => i !== index))
  }

  function handleChange(
    index: number,
    field: keyof Pick<PositionItem, "title" | "openings" | "description">,
    value: string | number,
  ) {
    setPositions((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)))
  }

  function handleDragEnd({ operation, canceled }: { operation: { source: unknown }; canceled: boolean }) {
    const source = (operation as { source?: { id?: unknown; index?: unknown } }).source
    if (canceled || !source || typeof source.index !== "number") return
    const sourceIndex = positions.findIndex((p) => p.dndId === source.id)
    const targetIndex = source.index
    if (targetIndex === sourceIndex || sourceIndex === -1) return
    setPositions((prev) => {
      const next = [...prev]
      const [moved] = next.splice(sourceIndex, 1)
      if (moved) next.splice(targetIndex, 0, moved)
      return next
    })
  }

  function validate() {
    for (const pos of positions) {
      if (!pos.title.trim()) return "All positions must have a title"
      if (!pos.openings || pos.openings < 1) return "Openings must be at least 1"
    }
    return null
  }

  function handleSave() {
    const error = validate()
    if (error) {
      toast({ title: error, variant: "destructive" })
      return
    }

    setBtnText("Saving positions")
    startTransition(async () => {
      try {
        const toCreate = positions.filter((p) => !p.id)
        const toUpdate = positions.filter((p) => p.id)
        const toDelete = removedIds

        await Promise.all([
          toDelete.length > 0
            ? Promise.all(toDelete.map((id) => deletePosition.mutateAsync({ id })))
            : Promise.resolve(),
          toCreate.length > 0
            ? createPositions.mutateAsync({
                meetingId,
                positions: toCreate.map((p, i) => ({
                  title: p.title,
                  openings: p.openings,
                  description: p.description || undefined,
                  priority: toUpdate.length + i,
                })),
              })
            : Promise.resolve(),
          ...toUpdate.map((p, i) =>
            updatePosition.mutateAsync({
              id: p.id!,
              title: p.title,
              openings: p.openings,
              description: p.description || undefined,
              priority: i,
            }),
          ),
        ])

        await utils.generalMeetings.positions.get.invalidate({ meetingId })
        toast({ title: "Positions saved" })
        onSaved()
      } catch {
        toast({ title: "Failed to save positions", variant: "destructive" })
        setBtnText("Save positions")
      }
    })
  }

  return (
    <div className={cn("grid w-full gap-4 bg-white p-6 dark:bg-neutral-950")}>
      <FieldSet>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <FieldLegend variant="label">Positions available</FieldLegend>
            <FieldDescription>Modify the positions available and how many openings there are.</FieldDescription>
          </div>
          <Button type="button" size="sm" variant="secondary" onClick={handleAdd} disabled={loading}>
            <span className="material-symbols-sharp text-base! leading-none!">add</span>
            Add
            <span className="hidden md:block">position</span>
          </Button>
        </div>
        <DragDropProvider onDragEnd={handleDragEnd}>
          <FieldGroup data-positions-container>
            {positions.map((item, index) => (
              <SortableRow
                key={item.dndId}
                item={item}
                index={index}
                loading={loading}
                onRemove={() => handleRemove(index)}
                onChange={(field, value) => handleChange(index, field, value)}
              />
            ))}
          </FieldGroup>
        </DragDropProvider>
      </FieldSet>
      <Button ref={btnRef} disabled={loading} className="relative" onClick={handleSave}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={btnText}
            transition={{ type: "spring", duration: 0.2, bounce: 0 }}
            initial={{ opacity: 0, y: -36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 36 }}
          >
            {btnText}
          </motion.span>
        </AnimatePresence>
        {loading && <Spinner className="absolute right-4" />}
      </Button>
    </div>
  )
}

export default function PositionsCard() {
  const { slug } = useParams<{ slug: string }>()
  const [formKey, setFormKey] = React.useState(0)
  const [meeting] = api.generalMeetings.get.useSuspenseQuery({ slug })
  const [positions] = api.generalMeetings.positions.get.useSuspenseQuery({ meetingId: meeting.id })

  return (
    <PositionsForm
      key={formKey}
      meetingId={meeting.id}
      initialPositions={positions}
      onSaved={() => setFormKey((k) => k + 1)}
    />
  )
}
