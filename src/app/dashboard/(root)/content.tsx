"use client"

import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import { api } from "~/trpc/react"

import { DashboardCard } from "./card"

export default function DashboardContent() {
  const { data: user } = api.users.getCurrent.useQuery()
  const { isLoading: p1Loading, data: pastProjects } = api.projects.getProjectByUser.useQuery({
    user: user?.email ?? "",
  })
  const { isLoading: p2Loading, data: openProjects } = api.projects.getApplicationOpen.useQuery()
  return (
    <Tabs defaultValue="upcoming" className=" py-6">
      <TabsList className="mb-2 w-full max-w-xs">
        <TabsTrigger asChild value="past" className="w-full">
          <Link href="?type=past">Past Participation</Link>
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="w-full">
          <Link href="?type=upcoming">Upcoming Projects</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="past">
        <div className="space-y-6">
          {p1Loading ? (
            <h2 className="font-mono text-3xl text-primary">Loading...</h2>
          ) : !pastProjects || pastProjects.length == 0 ? (
            <h2 className="font-mono text-3xl text-primary">No past participated projects</h2>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,300px))] gap-4">
              {pastProjects.map((project, index) => (
                <div key={index}>
                  <DashboardCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="upcoming">
        <div className="space-y-6">
          {p2Loading ? (
            <h2 className="font-mono text-3xl text-primary">Loading...</h2>
          ) : !openProjects || openProjects.length == 0 ? (
            <h2 className="font-mono text-3xl text-primary">No upcoming projects</h2>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,300px))] gap-4">
              {openProjects.map((project, index) => (
                <div key={index}>
                  <DashboardCard project={project} upcoming={true} />
                </div>
              ))}
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
