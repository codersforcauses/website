import { headers } from "next/headers"
import { redirect } from "next/navigation"

import Link from "next/link"

import { auth } from "~/lib/auth"
import { api, HydrateClient } from "~/trpc/server"
import { Button } from "~/ui/button"
import NominateForm from "./nominate-form"

export default async function NominatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect(`/join?redirect=/general-meetings/${slug}/nominate`)

  void api.generalMeetings.get.prefetch({ slug })

  return (
    <HydrateClient>
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-10">
          <Button variant="ghost" size="sm" className="-ml-3 text-neutral-500" asChild>
            <Link href={`/general-meetings/${slug}` as never}>
              <span className="material-symbols-sharp text-base! leading-none!">arrow_back</span>
              Back to meeting
            </Link>
          </Button>
          <div>
            <h1 className="scroll-m-20 font-mono text-4xl tracking-tight">Nominate yourself</h1>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Select the positions you&apos;d like to be considered for and answer any application questions.
            </p>
          </div>
          <NominateForm slug={slug} />
        </div>
      </main>
    </HydrateClient>
  )
}
