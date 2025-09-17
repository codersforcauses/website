import { Separator } from "~/components/ui/separator"

import { api } from "~/trpc/server"

import EmailForm from "./form"

export default async function Socials() {
  const data = await api.users.getCurrent.query()
  const user_id = data.id
  const email = {
    email: data?.email ?? undefined,
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-mono text-lg font-medium">Change your email</h2>
        <p className="text-sm text-muted-foreground">
          You may change your email address associated with your account here. An email will be sent to your new email
          address.
        </p>
      </div>
      <Separator className="md:max-w-2xl" />
      <div className="max-w-xl">
        <EmailForm user_id={user_id} email={email} />
      </div>
    </div>
  )
}
