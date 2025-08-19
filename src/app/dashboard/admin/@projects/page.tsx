"use client"

import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import { customMetadata } from "~/lib/metadata"
import { api } from "~/trpc/react"

import CreateProject from "./create"

const DBProjectCard = dynamic(() => import("./update").then((mod) => mod.DBProjectCard), {
  ssr: false,
})

//TODO: update to Next.js, and add image to metadata
export default function ProjectsPage() {
  //   const meta = customMetadata({
  //     name: "Our Projects",
  //     page: "projects",
  //     description: "A list of all past and present projects.",
  //     image:
  //       "https://og-social-cards.vercel.app/**.%2Fprojects**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg",
  //   })

  const utils = api.useUtils()
  const { data: ongoingProjects } = api.admin.projects.getPublicProjects.useQuery({ is_public: false })
  const { data: publicProjects } = api.admin.projects.getPublicProjects.useQuery({ is_public: true })

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
      <Tabs defaultValue="ongoing" className="container py-6">
        <TabsList className="mb-2 w-full max-w-xs">
          <TabsTrigger value="ongoing" className="w-full">
            <Link href="?type=ongoing">Ongoing Projects</Link>
          </TabsTrigger>
          <TabsTrigger asChild value="past" className="w-full">
            <Link href="?type=past">Public Projects</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="past">
          <div className="space-y-6">
            {!publicProjects || publicProjects.length == 0 ? (
              <h2 className="font-mono text-3xl text-primary">No public projects</h2>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,300px))] gap-4">
                {publicProjects.map((project, index) => (
                  <div key={index}>
                    <DBProjectCard key={project.name} project={project} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="ongoing">
          <div className="space-y-6">
            {!ongoingProjects || ongoingProjects.length == 0 ? (
              <h2 className="font-mono text-3xl text-black dark:text-white">No ongoing projects</h2>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,300px))] gap-4">
                {ongoingProjects.map((project, index) => (
                  <div key={index}>
                    <DBProjectCard key={project.name} project={project} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
