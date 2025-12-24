import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "~/lib/auth"
import { Separator } from "~/ui/separator"
import SocialForm from "./form"

export default async function SocialPage() {
  const data = await auth.api.getSession({
    headers: await headers(),
  })
  if (!data?.user) redirect("/join")

  const defaultValues = {
    github: data.user.github ?? undefined,
    discord: data.user.discord ?? undefined,
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-mono text-lg font-medium">Your socials</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          These fields are optional but are required if you plan on applying for projects during the winter and summer
          breaks.
        </p>
      </div>
      <Separator className="md:max-w-2xl" />
      <SocialForm defaultValues={defaultValues} />
    </div>
  )
}
