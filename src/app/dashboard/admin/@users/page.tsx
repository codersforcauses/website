import { api } from "~/trpc/server"
import UserTable from "./table"

export default async function AdminUserTable() {
  const users = await api.user.getAllAdmin.query()

  return <UserTable data={users} />
}
