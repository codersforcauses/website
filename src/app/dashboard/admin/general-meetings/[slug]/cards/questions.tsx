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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"
import { Spinner } from "~/ui/spinner"
import { Switch } from "~/ui/switch"

type QuestionType = "short" | "long" | "checkbox"

type QuestionItem = {
  dndId: string
  id?: string
  text: string
  type: QuestionType
  required: boolean
}

type DbQuestion = {
  id: string
  text: string
  type: QuestionType | null
  required: boolean | null
  order: number
  meetingId: string
}

function SortableRow({
  item,
  index,
  loading,
  onRemove,
  onChange,
}: {
  item: QuestionItem
  index: number
  loading: boolean
  onRemove: () => void
  onChange: <K extends keyof Pick<QuestionItem, "text" | "type" | "required">>(field: K, value: QuestionItem[K]) => void
}) {
  const { handleRef, ref } = useSortable({
    id: item.dndId,
    index,
    modifiers: [
      RestrictToVerticalAxis,
      RestrictToElement.configure({
        element() {
          return document.querySelector("[data-questions-container]")
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
      <div className="grid flex-1 grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-1">
          <label className="font-mono text-sm leading-snug font-medium">Text</label>
          <Input
            value={item.text}
            placeholder="Why do you want to join?"
            disabled={loading}
            onChange={(e) => onChange("text", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-mono text-sm leading-snug font-medium">Type</label>
          <Select value={item.type} disabled={loading} onValueChange={(v) => onChange("type", v as QuestionType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              <SelectItem value="short">Short answer</SelectItem>
              <SelectItem value="long">Paragraph</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch
              id={`required-${item.dndId}`}
              checked={item.required}
              disabled={loading}
              onCheckedChange={(v) => onChange("required", v)}
            />
            <label htmlFor={`required-${item.dndId}`} className="font-mono text-sm leading-snug font-medium">
              Required
            </label>
          </div>
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
    </div>
  )
}

function QuestionsForm({
  meetingId,
  initialQuestions,
  onSaved,
}: {
  meetingId: string
  initialQuestions: DbQuestion[]
  onSaved: () => void
}) {
  const utils = api.useUtils()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [btnText, setBtnText] = React.useState("Save questions")
  const [loading, startTransition] = React.useTransition()

  const [questions, setQuestions] = React.useState<QuestionItem[]>(() =>
    [...initialQuestions]
      .sort((a, b) => a.order - b.order)
      .map((q) => ({
        dndId: q.id,
        id: q.id,
        text: q.text,
        type: q.type ?? "short",
        required: q.required ?? false,
      })),
  )
  const [removedIds, setRemovedIds] = React.useState<string[]>([])

  const createQuestions = api.admin.generalMeetings.questions.create.useMutation()
  const updateQuestion = api.admin.generalMeetings.questions.update.useMutation()
  const deleteQuestion = api.admin.generalMeetings.questions.delete.useMutation()

  function handleAdd() {
    setQuestions((prev) => [...prev, { dndId: crypto.randomUUID(), text: "", type: "short", required: false }])
  }

  function handleRemove(index: number) {
    const item = questions[index]
    if (item?.id) setRemovedIds((prev) => [...prev, item.id!])
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }

  function handleChange<K extends keyof Pick<QuestionItem, "text" | "type" | "required">>(
    index: number,
    field: K,
    value: QuestionItem[K],
  ) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, [field]: value } : q)))
  }

  function handleDragEnd({ operation, canceled }: { operation: { source: unknown }; canceled: boolean }) {
    const source = (operation as { source?: { id?: unknown; index?: unknown } }).source
    if (canceled || !source || typeof source.index !== "number") return
    const sourceIndex = questions.findIndex((q) => q.dndId === source.id)
    const targetIndex = source.index
    if (targetIndex === sourceIndex || sourceIndex === -1) return
    setQuestions((prev) => {
      const next = [...prev]
      const [moved] = next.splice(sourceIndex, 1)
      if (moved) next.splice(targetIndex, 0, moved)
      return next
    })
  }

  function validate() {
    for (const q of questions) {
      if (!q.text.trim()) return "All questions must have text"
    }
    return null
  }

  function handleSave() {
    const error = validate()
    if (error) {
      toast({ title: error, variant: "destructive" })
      return
    }

    setBtnText("Saving questions")
    startTransition(async () => {
      try {
        const toCreate = questions.filter((q) => !q.id)
        const toUpdate = questions.filter((q) => q.id)
        const toDelete = removedIds

        await Promise.all([
          toDelete.length > 0
            ? Promise.all(toDelete.map((id) => deleteQuestion.mutateAsync({ id })))
            : Promise.resolve(),
          toCreate.length > 0
            ? createQuestions.mutateAsync({
                meetingId,
                questions: toCreate.map((q, i) => ({
                  text: q.text,
                  type: q.type,
                  required: q.required,
                  order: toUpdate.length + i,
                })),
              })
            : Promise.resolve(),
          ...toUpdate.map((q, i) =>
            updateQuestion.mutateAsync({
              id: q.id!,
              text: q.text,
              type: q.type,
              required: q.required,
              order: i,
            }),
          ),
        ])

        await utils.generalMeetings.questions.get.invalidate({ meetingId })
        toast({ title: "Questions saved" })
        onSaved()
      } catch {
        toast({ title: "Failed to save questions", variant: "destructive" })
        setBtnText("Save questions")
      }
    })
  }

  return (
    <div className={cn("grid w-full gap-4 bg-white p-6 dark:bg-neutral-950")}>
      <FieldSet>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <FieldLegend variant="label">Questions for candidates</FieldLegend>
            <FieldDescription>Modify the questions candidates must answer when applying.</FieldDescription>
          </div>
          <Button type="button" size="sm" variant="secondary" onClick={handleAdd} disabled={loading}>
            <span className="material-symbols-sharp text-base! leading-none!">add</span>
            Add
            <span className="hidden md:block">question</span>
          </Button>
        </div>
        <DragDropProvider onDragEnd={handleDragEnd}>
          <FieldGroup data-questions-container>
            {questions.map((item, index) => (
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

export default function QuestionsCard() {
  const { slug } = useParams<{ slug: string }>()
  const [formKey, setFormKey] = React.useState(0)
  const [meeting] = api.generalMeetings.get.useSuspenseQuery({ slug })
  const [questions] = api.generalMeetings.questions.get.useSuspenseQuery({ meetingId: meeting.id })

  return (
    <QuestionsForm
      key={formKey}
      meetingId={meeting.id}
      initialQuestions={questions}
      onSaved={() => setFormKey((k) => k + 1)}
    />
  )
}
