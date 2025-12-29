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
        <p className="text-sm text-muted-foreground md:max-w-2xl">
          You may change your email address associated with your account here. An email that contains verification code
          will be sent to your new email address. It can take up to 10 minutes. Make sure to check your spam folder if
          you can&apos;t find it. Resend the code if you need.
        </p>
      </div>
      <Separator className="md:max-w-2xl" />
      <div className="max-w-xl">
        <EmailForm user_id={user_id} email={email} />
      </div>
    </div>
  )
}
