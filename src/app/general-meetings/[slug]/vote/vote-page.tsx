"use client"

import Link from "next/link"

import { api } from "~/trpc/react"
import { Button } from "~/ui/button"

export default function VotePage({ slug }: { slug: string }) {
  const [meeting] = api.generalMeetings.get.useSuspenseQuery({ slug })
  const [positions] = api.generalMeetings.positions.getWithCounts.useSuspenseQuery({ meetingId: meeting.id })

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-10">
        <Button variant="ghost" size="sm" className="-ml-3 text-neutral-500" asChild>
          <Link href={`/general-meetings/${slug}` as never}>
            <span className="material-symbols-sharp text-base! leading-none!">arrow_back</span>
            Back to meeting
          </Link>
        </Button>
        <div>
          <h1 className="scroll-m-20 font-mono text-4xl tracking-tight">Vote</h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Cast your vote for each committee position.
          </p>
        </div>

        {positions.length > 0 && (
          <ul className="space-y-2">
            {positions.map((position) => (
              <li key={position.id}>
                <Link
                  href={`/general-meetings/${slug}/positions/${position.id}` as never}
                  className="group flex items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
                >
                  <div className="min-w-0">
                    <p className="font-mono font-medium">{position.title}</p>
                    {position.description && (
                      <p className="mt-0.5 truncate text-sm text-neutral-500 dark:text-neutral-400">
                        {position.description}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-mono text-sm text-neutral-500 dark:text-neutral-400">
                      {position.nomineeCount} {position.nomineeCount === 1 ? "nominee" : "nominees"}
                    </span>
                    <span className="material-symbols-sharp text-base! leading-none! text-neutral-400 transition-colors group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm text-neutral-500 dark:text-neutral-400">Voting coming soon.</p>
      </div>
    </main>
  )
}
