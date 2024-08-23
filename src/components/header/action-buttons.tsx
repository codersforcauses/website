import { api } from "~/trpc/server"
import { type RouterOutputs } from "~/trpc/shared"
import JoinButton from "./join-button"
import ThemeSwitcher from "./theme"
import UserButton from "./user-button"

export default async function ActionButtons() {
  let user: RouterOutputs["user"]["getCurrent"] | undefined = undefined
  try {
    user = await api.user.getCurrent.query()
  } catch (error) {}

  return (
    <div className="flex gap-2">
      <ThemeSwitcher />
      {user ? <UserButton initialUser={user} /> : <JoinButton />}
    </div>
  )
}
