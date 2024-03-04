import dynamic from "next/dynamic"

import { api } from "~/trpc/server"

const UsersPerDay = dynamic(() => import("./_components/users-per-day"), {
  ssr: false,
})

const UsersGraph = async () => {
  const userCount = await api.analytics.usersPerDay.query()

  return (
    <div className="col-span-3 border bg-card text-card-foreground">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium tracking-tight">Users per day</h3>
      </div>
      <div className="h-96 w-full p-6 pt-0">
        <UsersPerDay data={userCount} />
      </div>
    </div>
  )
}

export default UsersGraph
