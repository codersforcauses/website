"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"

import { DEFAULT_POSITIONS, DEFAULT_QUESTIONS } from "~/lib/defaults"
import { useApi } from "~/trpc/react"
import { Button } from "~/ui/button"
import { DayPicker } from "~/ui/daypicker"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "~/ui/field"
import { Input } from "~/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { Switch } from "~/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import VenueAutocomplete from "~/components/blocks/venue-autocomplete"
import SubmitButton from "~/blocks/submit-button"

const today = new Date()
const yesterday = new Date(new Date().setDate(today.getDate() - 1))
const nextFiveYears = new Date(new Date().setFullYear(today.getFullYear() + 5))

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date().min(today, "Start date is required").max(nextFiveYears, "Date must be within the next five years"),
  startTime: z.iso.time({ precision: -1, error: "Start time is required" }),
  endTime: z.iso.time({ precision: -1 }),
  venue: z.string(),
  venueID: z.string(),
  room: z.string(),
  positions: z.boolean(),
  questions: z.boolean(),
})

export default function CreateMeetingDialog() {
  const api = useApi()
  const router = useRouter()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [openDate, setOpenDate] = React.useState(false)
  const [btnText, setText] = React.useState("Create meeting")
  const [loading, startTransition] = React.useTransition()
  const { mutate } = useMutation(
    api.admin.generalMeetings.create.mutationOptions({
      onSuccess(data) {
        router.push(`/dashboard/admin/general-meeting/${data.slug}`)
      },
      onSettled() {
        setText("Create meeting")
      },
    }),
  )

  const form = useForm({
    defaultValues: {
      title: `Annual General Meeting ${today.getFullYear()}`,
      venue: "",
      venueID: "", // ID from mapbox suggestion
      room: "",
      date: yesterday,
      startTime: "",
      endTime: "",
      positions: true,
      questions: true,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit({ value }) {
      setText("Creating meeting")
      startTransition(async () => {
        const start = new Date(value.date)
        const [startHours, startMins] = value.startTime.split(":").map(Number)
        start.setHours(startHours!, startMins!)

        let end: Date | undefined
        if (value.endTime) {
          end = new Date(value.date)
          const [endHours, endMins] = value.endTime.split(":").map(Number)
          end.setHours(endHours!, endMins!)
        }

        mutate({
          title: value.title,
          startDate: start,
          endDate: end,
          venue: value.venue,
          venueID: value.venueID,
          room: value.room,
          positions: value.positions,
          questions: value.questions,
        })
      })
    },
  })

  const setVenueID = React.useCallback(
    (val: string) => {
      form.setFieldValue("venueID", val)
    },
    [form],
  )

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create general meeting</DialogTitle>
        <DialogDescription>
          Create a new AGM (Annual General Meeting) or SGM (Special General Meeting).
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          btnRef.current?.focus()
          void form.handleSubmit()
        }}
      >
        <FieldSet>
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
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
          <FieldGroup className="grid grid-cols-3 gap-4">
            <form.Field name="venue">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} className="col-span-2">
                    <FieldLabel htmlFor={field.name}>Meeting venue</FieldLabel>
                    <VenueAutocomplete field={field} setVenueID={setVenueID} />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field name="room">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Room</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      disabled={loading}
                      placeholder="2.01"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      onChange={(e) => {
                        field.handleChange(e.target.value)
                      }}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
          <form.Field name="date">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              const selectedDate = field.state.value
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                  <Popover open={openDate} onOpenChange={setOpenDate}>
                    <PopoverTrigger
                      render={
                        <Button
                          id={field.name}
                          variant="outline"
                          disabled={loading}
                          aria-invalid={isInvalid}
                          data-empty={selectedDate === yesterday}
                          className="w-32 justify-between font-normal data-[empty=true]:text-muted-foreground"
                        >
                          {selectedDate <= yesterday
                            ? "Select date"
                            : selectedDate.toLocaleString("en-AU", {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                          <span className="material-symbols-sharp text-base! leading-none!">keyboard_arrow_down</span>
                        </Button>
                      }
                    />
                    <PopoverContent className="p-0" align="center">
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
                            setOpenDate(false)
                          }
                        }}
                        formatters={{
                          formatWeekdayName(date) {
                            return date.toLocaleString("en-AU", { weekday: "short" })
                          },
                        }}
                        disabled={[{ before: today, after: nextFiveYears }]}
                        className="w-full bg-transparent"
                      />
                    </PopoverContent>
                  </Popover>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
          <FieldGroup className="grid grid-cols-2 gap-4">
            <form.Field name="startTime">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Start time</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="time"
                      min="7:00"
                      max="22:00"
                      step={60 * 1000}
                      disabled={loading}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      onChange={(e) => {
                        field.handleChange(e.target.value)
                      }}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field name="endTime">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>End time</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="time"
                      min="7:05"
                      max="22:00"
                      step={60 * 1000}
                      disabled={loading}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      onChange={(e) => {
                        field.handleChange(e.target.value)
                      }}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
          <form.Field name="positions">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field orientation="horizontal" data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Generate default positions
                    <Tooltip>
                      <TooltipTrigger className="grid place-items-center">
                        <span className="material-symbols-sharp text-sm! leading-none! text-muted-foreground">
                          info
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-semibold">Default positions</p>
                        {DEFAULT_POSITIONS.map((pos) => (
                          <div key={pos.title} className="flex items-center justify-between gap-2">
                            <p>{pos.title}</p>
                            <p className="text-muted-foreground">{pos.openings}</p>
                          </div>
                        ))}
                      </TooltipContent>
                    </Tooltip>
                  </FieldLabel>
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
                  <FieldLabel htmlFor={field.name}>
                    Generate default questions
                    <Tooltip>
                      <TooltipTrigger className="grid place-items-center">
                        <span className="material-symbols-sharp text-sm! leading-none! text-muted-foreground">
                          info
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="mb-1 font-semibold">
                          Default questions
                          <span className="ml-1 text-muted-foreground">(required questions have *)</span>
                        </p>
                        <ul className="flex list-inside list-[square] flex-col gap-0.5 marker:text-muted-foreground">
                          {DEFAULT_QUESTIONS.map((ques) => (
                            <li key={ques.text}>
                              {ques.text}
                              {ques.required && <span className="text-muted-foreground">*</span>}
                            </li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </FieldLabel>
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
            <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
              {([isSubmitting, canSubmit]) => (
                <SubmitButton
                  disabled={(isSubmitting || loading) ?? !canSubmit}
                  loading={(isSubmitting || loading) ?? false}
                >
                  {btnText}
                </SubmitButton>
              )}
            </form.Subscribe>
          </DialogFooter>
        </FieldSet>
      </form>
    </DialogContent>
  )
}
