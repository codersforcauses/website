"use client"

import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import { api } from "~/trpc/react"

import CreateProject from "./create"

const DBProjectCard = dynamic(() => import("./update").then((mod) => mod.DBProjectCard), {
  ssr: false,
})

export default function ProjectsPage() {
  const utils = api.useUtils()
  const { isLoading: p1Loading, data: ongoingProjects } = api.admin.projects.getPublicProjects.useQuery({
    is_public: false,
  })
  const { isLoading: p2Loading, data: publicProjects } = api.admin.projects.getPublicProjects.useQuery({
    is_public: true,
  })

  return (
    <>
      <Head>
        <title>Admin - Projects</title>
        <meta name="description" content="A list of all projects." />
        <meta name="theme-color" content="black" />
      </Head>
      <div className="flex h-[50px] items-center p-1">
        <h2 className="text-2xl font-semibold">Projects</h2>
      </div>
      <div className="my-4 flex gap-6">
        <CreateProject />
      </div>
      <Tabs defaultValue="ongoing" className=" py-6">
        <TabsList className="mb-2 w-full max-w-xs">
          <TabsTrigger value="ongoing" className="w-full">
            <Link href="?type=ongoing">Ongoing Projects</Link>
          </TabsTrigger>
          <TabsTrigger asChild value="public" className="w-full">
            <Link href="?type=public">Public Projects</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="public">
          <div className="space-y-6">
            {p2Loading ? (
              <h2 className="font-mono text-3xl text-primary">Loading...</h2>
            ) : !publicProjects || publicProjects.length == 0 ? (
              <h2 className="font-mono text-3xl text-primary">No public projects</h2>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4">
                {publicProjects.map((project, index) => (
                  <DBProjectCard key={project.name} project={project} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="ongoing">
          <div className="space-y-6">
            {p1Loading ? (
              <h2 className="font-mono text-3xl text-primary">Loading...</h2>
            ) : !ongoingProjects || ongoingProjects.length == 0 ? (
              <h2 className="font-mono text-3xl text-primary">No ongoing projects</h2>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4">
                {ongoingProjects.map((project, index) => (
                  <DBProjectCard key={project.name} project={project} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
