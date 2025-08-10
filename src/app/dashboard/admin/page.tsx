import * as React from "react"

import { api } from "~/trpc/server"

import { Card } from "./analytics/count"

export default async function AdminDashboard() {
  const count = await api.admin.analytics.getUserCount.query()

  return (
    <>
      <div className="flex h-[50px] items-center p-1">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <Card heading="Users" count={count.users} icon="group" href="/dashboard/admin/users" />
        <Card heading="Members" count={count.members} icon="group" href="/dashboard/admin/users" />
        <Card heading="Projects" count={"N/A"} icon="devices" href="/dashboard/admin/projects" />
        <Card heading="Events" count={"N/A"} icon="event" />
      </div>
    </>
  )
}
