import { api } from "~/trpc/server"

import DashboardContent from "./content"

export default async function Dashboard() {
  const user = await api.users.getCurrent.query()

  return (
    <>
      <div className="container py-12">
        <h2 className="font-bold">Hey, {user?.preferred_name}</h2>
        <p className="mt-4">
          Here you can see our upcoming projects and the projects you have participated in. You can apply for new
          projects here if we link the application form.
        </p>
        <div className="h-full mb-8">
          <DashboardContent />
        </div>
      </div>
    </>
  )
}
