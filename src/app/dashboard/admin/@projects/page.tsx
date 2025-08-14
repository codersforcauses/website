"use client"

import { Metadata } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { O } from "node_modules/@upstash/redis/zmscore-07021e27"

import { Button } from "~/components/ui/button"

import { customMetadata } from "~/lib/metadata"
import { api } from "~/trpc/react"

import CreateProject from "./create-project"
import UpdateMembers from "./update-members"

const DBProjectCard = dynamic(() => import("./update-project").then((mod) => mod.DBProjectCard), {
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
  const { data: projects } = api.admin.projects.getProjects.useQuery({})

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
        <UpdateMembers project_name="cfc" />
      </div>
      <div className="flex flex-col md:flex-row md:gap-12">
        <div className="flex-grow">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,300px))] gap-4">
            {projects?.map((project) => <DBProjectCard key={project.name} project={project} />)}
          </div>
        </div>
      </div>
    </>
  )
}
