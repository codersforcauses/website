import { api } from "~/trpc/server"
import UserTable from "./table"

export default async function AdminUserTable() {
  const users = await api.admin.users.getAll.query()

  return <UserTable data={users} />
}
