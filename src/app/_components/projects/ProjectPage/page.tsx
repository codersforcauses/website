"use client"

import { ProjectModel } from "~/lib/types"
import { QueryFunctionContext, useQuery } from "@tanstack/react-query"
import NotFound from "~/app/not-found"
import Image from "next/image"
import Link from "next/link"
import WebsiteButton from "./button"
import TechList from "./Techlist/page"

interface ProjectPageProps {
  projectId: string
}

const parseDescription = (text: string) =>
  text.split("\n").map((para) => (
    <p key={para} className="mb-4">
      {para}
    </p>
  ))

const Impact = ({
  impact,
  ...props
}: {
  impact: string[]
  className?: string
}) => (
  <div {...props}>
    <h2 className="mb-4 font-mono text-2xl font-black">Potential impact</h2>
    <ul className="space-y-3">
      {impact.map((text: string, i: number) => (
        <li key={i} className="flex items-center">
          <span className="material-symbols-sharp mr-3 select-none">
            check_circle
          </span>
          {text}
        </li>
      ))}
    </ul>
  </div>
)

const ProjectPage = ({ projectId }: ProjectPageProps) => {
  const { data: data, isError } = useQuery(["project", projectId], fetchProject)

  if (isError) {
    return <NotFound />
  }

  if (data) {
    return (
      <>
        <div className="relative bg-black py-32 md:py-48">
          <Image
            alt={data?.alt ?? `An image of the front page of ${data.name}`}
            src={`/projects/${data.img}`}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="bg-secondary py-12 text-black dark:bg-alt-dark dark:text-white">
          <nav className="container mx-auto mb-4 flex px-3 text-sm">
            <Link href="/projects">
              <p className="text-black hover:underline dark:text-white">
                Projects
              </p>
            </Link>
            <span className="text-black text-opacity-60 dark:text-white dark:text-opacity-60">{` / ${data.name}`}</span>
          </nav>
          <div className="container relative mx-auto px-3 lg:flex">
            <div className="space-y-8 lg:mr-8">
              <div className="space-y-4">
                <h1 className="mb-6 font-mono text-4xl md:text-6xl">
                  {data.name}
                </h1>
                <div className="grid grid-cols-2 items-center font-mono lg:hidden">
                  <div className="flex items-center">
                    <span className="material-icons-sharp mr-3 select-none">
                      {data.icon}
                    </span>
                    {data.type}
                  </div>
                  <div className="flex items-center">
                    <span
                      className="material-icons-sharp mr-3 select-none"
                      title="Start Date"
                    >
                      date_range
                    </span>
                    {data.date}
                  </div>
                </div>
                {parseDescription(data.desc)}
                {data && (
                  <div className="mt-2 grid grid-cols-2 gap-4 sm:max-w-max lg:hidden">
                    {data.url && (
                      <WebsiteButton link={data.url} text="Visit Website" />
                    )}
                    {data.source && (
                      <WebsiteButton link={data.source} text="View Source" />
                    )}
                  </div>
                )}
              </div>
              <Impact impact={data.impact} className="lg:hidden" />
              <div className="space-y-4">
                <h2 className="font-mono text-2xl font-black">
                  Technologies used
                </h2>
                <TechList data={data.tech} />
              </div>
              <div className="space-y-4">
                <h2 className="font-mono text-2xl font-black">Members</h2>
                <ul className="grid grid-cols-2 gap-2 leading-tight">
                  {data.members.map((member: string) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="hidden w-full max-w-xs space-y-8 lg:block">
              <div className="space-y-4 font-mono">
                <div className="flex items-center">
                  <span className="material-symbols-sharp mr-3 select-none">
                    devices
                  </span>
                  {data.type}
                </div>
                <div className="flex items-center">
                  <span
                    className="material-symbols-sharp mr-3 select-none"
                    title="Start Date"
                  >
                    date_range
                  </span>
                  {data.date}
                </div>
              </div>
              {data && (
                <div className="grid gap-4">
                  {data.url && (
                    <WebsiteButton link={data.url} text="Visit Website" />
                  )}
                  {data.source && (
                    <WebsiteButton link={data.source} text="View Source" />
                  )}
                </div>
              )}
              <Impact impact={data.impact} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

async function fetchProject(context: QueryFunctionContext<string[]>) {
  const id = context.queryKey[1]
  const response = await fetch(`/api/projects/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch project")
  }

  const data = (await response.json()) as ProjectModel

  return data
}

export default ProjectPage
