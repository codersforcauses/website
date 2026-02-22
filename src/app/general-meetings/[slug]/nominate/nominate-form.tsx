"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"

import { api } from "~/trpc/react"
import { toast } from "~/hooks/use-toast"
import { Alert, AlertDescription } from "~/ui/alert"
import { Button } from "~/ui/button"
import { Checkbox } from "~/ui/checkbox"
import { Input } from "~/ui/input"
import { Spinner } from "~/ui/spinner"
import { Textarea } from "~/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "~/ui/toggle-group"

type Question = {
  id: string
  text: string
  type: "short" | "long" | "checkbox" | null
  required: boolean | null
  order: number
}

function AlreadyApplied({
  slug,
  loading,
  onEdit,
  onWithdraw,
}: {
  slug: string
  loading: boolean
  onEdit: () => void
  onWithdraw: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border p-4">
        <span className="material-symbols-sharp text-2xl! leading-none! text-green-500">check_circle</span>
        <div>
          <p className="font-medium">You&apos;ve applied</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Your nomination has been submitted for this meeting.
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href={`/general-meetings/${slug}` as never}>Back to meeting</Link>
        </Button>
        <Button variant="outline" disabled={loading} onClick={onEdit}>
          {loading && <Spinner />}
          Edit nomination
        </Button>
        <Button variant="outline" disabled={loading} className="text-red-500 hover:text-red-600" onClick={onWithdraw}>
          {loading && <Spinner />}
          Withdraw application
        </Button>
      </div>
    </div>
  )
}

export default function NominateForm({ slug }: { slug: string }) {
  const utils = api.useUtils()
  const [meeting] = api.generalMeetings.get.useSuspenseQuery({ slug })
  const [positions] = api.generalMeetings.positions.get.useSuspenseQuery({ meetingId: meeting.id })
  const [questions] = api.generalMeetings.questions.get.useSuspenseQuery({ meetingId: meeting.id })
  const [myCandidate] = api.generalMeetings.candidates.getByUser.useSuspenseQuery({ meetingId: meeting.id })

  const { data: existingNominations } = api.generalMeetings.nominations.getByCandidate.useQuery(
    { candidateId: myCandidate?.id ?? "" },
    { enabled: !!myCandidate },
  )
  const { data: existingAnswers } = api.generalMeetings.answers.getAnswersByCandidate.useQuery(
    { candidateId: myCandidate?.id ?? "" },
    { enabled: !!myCandidate },
  )

  const [isEditing, setIsEditing] = React.useState(false)
  const [selectedPositions, setSelectedPositions] = React.useState<Set<string>>(new Set())
  const [answers, setAnswers] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, ""])),
  )
  const [btnText, setBtnText] = React.useState("Submit nomination")
  const [loading, startTransition] = React.useTransition()

  const createCandidate = api.generalMeetings.candidates.create.useMutation()
  const deleteCandidate = api.generalMeetings.candidates.delete.useMutation()
  const createNomination = api.generalMeetings.nominations.create.useMutation()
  const createAnswer = api.generalMeetings.answers.create.useMutation()

  function togglePosition(id: string) {
    setSelectedPositions((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleEdit() {
    if (existingNominations) {
      setSelectedPositions(new Set(existingNominations.map((n) => n.positionId)))
    }
    if (existingAnswers) {
      setAnswers((prev) => {
        const next = { ...prev }
        for (const answer of existingAnswers) {
          const question = questions.find((q) => q.id === answer.questionId)
          next[answer.questionId] =
            question?.type === "checkbox" ? (answer.text === "Yes" ? "true" : "false") : answer.text
        }
        return next
      })
    }
    setBtnText("Update nomination")
    setIsEditing(true)
  }

  function handleWithdraw() {
    if (!myCandidate) return
    startTransition(async () => {
      try {
        await deleteCandidate.mutateAsync({ id: myCandidate.id })
        await utils.generalMeetings.candidates.getByUser.invalidate()
        toast({ title: "Application withdrawn" })
      } catch {
        toast({ title: "Failed to withdraw application", variant: "destructive" })
      }
    })
  }

  function handleSubmit() {
    if (selectedPositions.size === 0) {
      toast({ title: "Select at least one position", variant: "destructive" })
      return
    }

    const requiredUnanswered = questions.filter((q) => q.required && q.type !== "checkbox" && !answers[q.id]?.trim())
    if (requiredUnanswered.length > 0) {
      toast({ title: `Please answer all required questions`, variant: "destructive" })
      return
    }

    startTransition(async () => {
      try {
        if (isEditing && myCandidate) {
          await deleteCandidate.mutateAsync({ id: myCandidate.id })
        }

        const candidate = await createCandidate.mutateAsync({ meetingId: meeting.id })
        if (!candidate) throw new Error("Failed to create candidate")

        await Promise.all([
          ...[...selectedPositions].map((positionId) =>
            createNomination.mutateAsync({ meetingId: meeting.id, positionId, candidateId: candidate.id }),
          ),
          ...questions
            .filter((q) => q.type === "checkbox" || answers[q.id]?.trim())
            .map((q) =>
              createAnswer.mutateAsync({
                candidateId: candidate.id,
                questionId: q.id,
                text: q.type === "checkbox" ? (answers[q.id] === "true" ? "Yes" : "No") : (answers[q.id] ?? ""),
              }),
            ),
        ])

        await utils.generalMeetings.candidates.getByUser.invalidate()
        toast({ title: isEditing ? "Nomination updated" : "Nomination submitted" })
        setIsEditing(false)
      } catch {
        toast({
          title: isEditing ? "Failed to update nomination" : "Failed to submit nomination",
          variant: "destructive",
        })
        setBtnText(isEditing ? "Update nomination" : "Submit nomination")
      }
    })
  }

  if (myCandidate && !isEditing) {
    return <AlreadyApplied slug={slug} loading={loading} onEdit={handleEdit} onWithdraw={handleWithdraw} />
  }

  const sortedPositions = [...positions].sort((a, b) => a.priority - b.priority)
  const sortedQuestions = [...questions].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-10">
      <Alert>
        <span className="material-symbols-sharp">event_available</span>
        <AlertDescription>
          Candidates who attend the meeting in person are significantly more likely to be elected. If you can, we
          strongly encourage you to be there.
        </AlertDescription>
      </Alert>

      {/* Positions */}
      <section className="space-y-4">
        <div>
          <h2 className="font-mono text-xl font-semibold tracking-tight">Select positions</h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Choose the committee positions you&apos;d like to be considered for.
          </p>
        </div>
        <Alert>
          <span className="material-symbols-sharp">info</span>
          <AlertDescription>
            Please only nominate yourself for positions you feel best suited for, instead of every position.
          </AlertDescription>
        </Alert>
        <div className="divide-y border">
          {sortedPositions.map((position) => (
            <label
              key={position.id}
              className="flex cursor-pointer items-start gap-4 p-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <Checkbox
                checked={selectedPositions.has(position.id)}
                disabled={loading}
                onCheckedChange={() => togglePosition(position.id)}
                className="mt-0.5"
              />
              <div className="space-y-0.5">
                <p className="leading-none font-medium">{position.title}</p>
                {position.description && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{position.description}</p>
                )}
                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  {position.openings} {position.openings === 1 ? "opening" : "openings"}
                </p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Questions */}
      {sortedQuestions.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="font-mono text-xl font-semibold tracking-tight">Application questions</h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              These answers will be shared during the general meeting.
            </p>
          </div>
          <div className="space-y-6">
            {sortedQuestions.map((question: Question) => (
              <div key={question.id}>
                <label className="mb-4 block font-mono text-sm leading-snug font-medium">
                  {question.text}
                  {question.required && <span className="ml-1 text-red-500">*</span>}
                </label>
                {question.type === "long" ? (
                  <Textarea
                    placeholder="Your answer"
                    disabled={loading}
                    value={answers[question.id] ?? ""}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
                  />
                ) : question.type === "checkbox" ? (
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={answers[question.id] ?? ""}
                    disabled={loading}
                    onValueChange={(v) => setAnswers((prev) => ({ ...prev, [question.id]: v }))}
                  >
                    <ToggleGroupItem value="true">Yes</ToggleGroupItem>
                    <ToggleGroupItem value="false">No</ToggleGroupItem>
                  </ToggleGroup>
                ) : (
                  <Input
                    placeholder="Your answer"
                    disabled={loading}
                    value={answers[question.id] ?? ""}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex items-center gap-4">
        <Button disabled={loading} className="relative" onClick={handleSubmit}>
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
        {isEditing ? (
          <Button variant="ghost" disabled={loading} onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        ) : (
          <Button asChild variant="ghost">
            <Link href={`/general-meetings/${slug}` as never}>Cancel</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
