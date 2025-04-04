import { Separator } from "~/components/ui/separator"
import { api } from "~/trpc/server"
import PersonalForm from "./form"

export default async function Personal() {
  const data = await api.users.getCurrent.query()

  const defaultValues = {
    name: data?.name,
    preferred_name: data?.preferred_name,
    email: data?.email,
    pronouns: data?.pronouns,
    isUWA: !!data?.student_number,
    student_number: data?.student_number ?? undefined,
    uni: data?.university ?? undefined,
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-mono text-lg font-medium">Personal details</h2>
        <p className="text-sm text-muted-foreground">Update your personal details. All fields here are required.</p>
      </div>
      <Separator className="md:max-w-2xl" />
      <PersonalForm defaultValues={defaultValues} />
    </div>
  )
}
