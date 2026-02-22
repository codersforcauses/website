"use client"

import * as React from "react"
import Link from "next/link"

import { api } from "~/trpc/react"
import { Badge } from "~/ui/badge"
import { Button } from "~/ui/button"

function useStarred(positionId: string) {
  const key = `cfc-stars-${positionId}`
  const [starred, setStarred] = React.useState<Set<string>>(new Set())

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) setStarred(new Set(JSON.parse(stored) as string[]))
    } catch {}
  }, [key])

  function toggle(candidateId: string) {
    setStarred((prev) => {
      const next = new Set(prev)
      if (next.has(candidateId)) next.delete(candidateId)
      else next.add(candidateId)
      try {
        localStorage.setItem(key, JSON.stringify([...next]))
      } catch {}
      return next
    })
  }

  return { starred, toggle }
}

export default function PositionPage({ slug, positionId }: { slug: string; positionId: string }) {
  const [{ position, questions, candidates }] = api.generalMeetings.positions.getCandidates.useSuspenseQuery({
    positionId,
  })
  const { starred, toggle } = useStarred(positionId)

  const sorted = [...candidates].sort((a, b) => {
    const aStarred = starred.has(a.id) ? 0 : 1
    const bStarred = starred.has(b.id) ? 0 : 1
    return aStarred - bStarred
  })

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-10">
        <section className="space-y-3">
          <Button variant="ghost" size="sm" className="-ml-3 text-neutral-500" asChild>
            <Link href={`/general-meetings/${slug}` as never}>
              <span className="material-symbols-sharp text-base! leading-none!">arrow_back</span>
              Back to meeting
            </Link>
          </Button>
          <h1 className="scroll-m-20 font-mono text-4xl tracking-tight">{position.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {position.openings} {position.openings === 1 ? "opening" : "openings"}
            </Badge>
            <Badge variant="outline">
              {candidates.length} {candidates.length === 1 ? "nominee" : "nominees"}
            </Badge>
          </div>
          {position.description && <p className="text-neutral-600 dark:text-neutral-400">{position.description}</p>}
        </section>

        {candidates.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">No nominees yet.</p>
        ) : (
          <section className="space-y-6">
            {sorted.map((candidate) => {
              const isStarred = starred.has(candidate.id)
              return (
                <div
                  key={candidate.id}
                  className="space-y-4 rounded-lg border border-neutral-200 p-6 dark:border-neutral-800"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {candidate.userImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={candidate.userImage} alt="" className="size-10 rounded-full object-cover" />
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100 font-mono text-sm font-medium dark:bg-neutral-800">
                          {(candidate.userPreferredName ?? candidate.userName ?? "?")[0]?.toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-mono font-medium">
                          {candidate.userPreferredName ?? candidate.userName ?? "Unknown"}
                        </p>
                        {candidate.userPronouns && (
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{candidate.userPronouns}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggle(candidate.id)}
                      aria-label={isStarred ? "Unstar candidate" : "Star candidate"}
                      className="text-neutral-300 transition-colors hover:text-amber-400 dark:text-neutral-600 dark:hover:text-amber-400"
                    >
                      <span
                        className="material-symbols-sharp text-xl! leading-none!"
                        style={{ fontVariationSettings: isStarred ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    </button>
                  </div>

                  {questions.length > 0 && (
                    <dl className="space-y-4">
                      {questions.map((question) => {
                        const answer = candidate.answers.find((a) => a.questionId === question.id)
                        if (!answer?.text) return null
                        return (
                          <div key={question.id}>
                            <dt className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                              {question.text}
                            </dt>
                            <dd className="mt-1 text-sm whitespace-pre-wrap text-neutral-600 dark:text-neutral-400">
                              {answer.text}
                            </dd>
                          </div>
                        )
                      })}
                    </dl>
                  )}
                </div>
              )
            })}
          </section>
        )}
      </div>
    </main>
  )
}
