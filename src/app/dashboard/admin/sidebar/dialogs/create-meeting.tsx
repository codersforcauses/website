"use client"

import * as React from "react"
import { z } from "zod"
import { AnimatePresence, motion } from "motion/react"
import { useForm } from "@tanstack/react-form"

import { api } from "~/trpc/react"
import { toast } from "~/hooks/use-toast"
import { Button } from "~/ui/button"
import { DayPicker } from "~/ui/daypicker"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/ui/dialog"
import { Input } from "~/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "~/ui/field"
import { Spinner } from "~/ui/spinner"
import { Switch } from "~/ui/switch"
import { Label } from "~/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"

const today = new Date()
const yesterday = new Date(new Date().setDate(today.getDate() - 1))
const nextFiveYears = new Date(new Date().setFullYear(today.getFullYear() + 5))

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  start_date: z
    .date()
    .min(today, "Start date is required")
    .max(nextFiveYears, "Date must be within the next five years"),
  start_time: z.iso.time({ precision: -1, error: "Start time is required" }),
  end_time: z.iso.time({ precision: -1, error: "End time is required" }),
  venue: z.string().min(1, "Venue is required"),
  positions: z.boolean(),
  questions: z.boolean(),
})

export default function CreateMeetingDialog({ onSuccess }: { onSuccess?: () => void }) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [openDate, setOpenDate] = React.useState(false)
  const [btnText, setText] = React.useState("Create meeting")
  const [loading, startTransition] = React.useTransition()

  const utils = api.useUtils()
  const { mutateAsync } = api.admin.generalMeetings.create.useMutation()

  const form = useForm({
    defaultValues: {
      title: `Annual General Meeting ${today.getFullYear()}`,
      start_date: yesterday,
      start_time: "17:30",
      end_time: "19:30",
      venue: "",
      positions: true,
      questions: true,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit({ value }) {
      setText("Creating meeting")
      startTransition(async () => {
        const startDate = new Date(value.start_date)
        const [startHours, startMinutes] = value.start_time.split(":").map(Number)
        startDate.setHours(startHours!, startMinutes!, 0, 0)

        const endDate = new Date(value.start_date)
        const [endHours, endMinutes] = value.end_time.split(":").map(Number)
        endDate.setHours(endHours!, endMinutes!, 0, 0)

        try {
          await mutateAsync({
            title: value.title,
            start_date: startDate,
            end_date: endDate,
            venue: value.venue,
            positions: value.positions,
            questions: value.questions,
          })
          await utils.admin.generalMeetings.getAll.invalidate()
          toast({ title: "Meeting created", description: `${value.title} has been created successfully.` })
          onSuccess?.()
        } catch {
          toast({ title: "Failed to create meeting", variant: "destructive" })
          setText("Create meeting")
        }
      })
    },
  })

  return (
    <DialogContent className="overflow-y-auto sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Create general meeting</DialogTitle>
        <DialogDescription>
          Create a new AGM (Annual General Meeting) or SGM (Special General Meeting) for Coders for Causes.
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          btnRef.current?.focus()
          void form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field name="title">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Meeting title</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    disabled={loading}
                    placeholder={`General Meeting ${today.getFullYear()}`}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="start_date">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              const selectedDate = field.state.value

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Date and time</FieldLabel>
                  <Popover open={openDate} onOpenChange={setOpenDate}>
                    <PopoverTrigger asChild>
                      <Button
                        id={field.name}
                        variant="outline"
                        disabled={loading}
                        aria-invalid={isInvalid}
                        data-empty={selectedDate === yesterday}
                        className="w-32 justify-between font-normal data-[empty=true]:text-neutral-500 dark:data-[empty=true]:text-neutral-400"
                      >
                        {selectedDate === yesterday
                          ? "Select date"
                          : selectedDate.toLocaleString("en-AU", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                        <span className="material-symbols-sharp text-base! leading-none!">keyboard_arrow_down</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="relative flex w-(--radix-popover-trigger-width) flex-col items-center"
                      align="start"
                    >
                      <DayPicker
                        mode="single"
                        captionLayout="dropdown"
                        selected={selectedDate}
                        showOutsideDays={false}
                        defaultMonth={today}
                        startMonth={today}
                        endMonth={nextFiveYears}
                        onSelect={(newDate) => {
                          if (newDate) {
                            field.handleChange(newDate)
                          }
                        }}
                        formatters={{
                          formatWeekdayName(date) {
                            return date.toLocaleString("en-AU", { weekday: "short" })
                          },
                        }}
                        disabled={[{ before: today, after: nextFiveYears }]}
                        className="bg-transparent p-0"
                      />
                      <div className="flex gap-2 border-t px-4 pt-4! *:[div]:w-full">
                        <form.Field name="start_time">
                          {(timeField) => (
                            <div>
                              <Label htmlFor="time-from">Start Time</Label>
                              <Input
                                id="time-from"
                                type="time"
                                step={60 * 1000}
                                min="07:00"
                                max="22:00"
                                value={timeField.state.value}
                                onChange={(e) => timeField.handleChange(e.target.value)}
                                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                              />
                            </div>
                          )}
                        </form.Field>
                        <span>-</span>
                        <form.Field name="end_time">
                          {(timeField) => (
                            <div>
                              <Label htmlFor="time-to">End Time</Label>
                              <Input
                                id="time-to"
                                type="time"
                                step={60 * 1000}
                                min="07:05"
                                max="22:00"
                                value={timeField.state.value}
                                onChange={(e) => timeField.handleChange(e.target.value)}
                                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                              />
                            </div>
                          )}
                        </form.Field>
                      </div>
                      <div className="flex items-center justify-between border-t p-2">
                        <p></p>
                        <Button size="sm" onClick={() => setOpenDate(false)}>
                          Confirm
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="venue">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Meeting venue</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    disabled={loading}
                    placeholder={`General Meeting ${today.getFullYear()}`}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="positions">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field orientation="horizontal" data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Generate default positions</FieldLabel>
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                    aria-invalid={isInvalid}
                  />
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="questions">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field orientation="horizontal" data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Generate default questions</FieldLabel>
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                    aria-invalid={isInvalid}
                  />
                </Field>
              )
            }}
          </form.Field>
          <DialogFooter>
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <Button ref={btnRef} type="submit" disabled={loading ?? !canSubmit} className="relative w-full">
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
              )}
            </form.Subscribe>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  )
}
