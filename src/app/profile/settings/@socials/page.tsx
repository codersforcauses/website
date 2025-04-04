import { Separator } from "~/components/ui/separator"
import { api } from "~/trpc/server"
import SocialsForm from "./form"

export default async function Socials() {
  const data = await api.users.getCurrent.query()

  const defaultValues = {
    github: data?.github ?? undefined,
    discord: data?.discord ?? undefined,
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-mono text-lg font-medium">Your socials</h2>
        <p className="text-sm text-muted-foreground">
          These fields are optional but are required if you plan on applying for projects during the winter and summer
          breaks.
        </p>
      </div>
      <Separator className="md:max-w-2xl" />
      <SocialsForm defaultValues={defaultValues} />
    </div>
  )
}
