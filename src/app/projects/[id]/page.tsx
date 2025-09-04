"use client"

import { Value } from "@radix-ui/react-select"
import projects from "data/projects.json"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "~/components/ui/button"

import { api } from "~/trpc/react"

import { Impact } from "../(default)/db-project"
import DBProject from "../(default)/db-project"
import Loading from "./loading"
import TechList from "./tech-list"

const parseDescription = (text: string) =>
  text.split("\n").map((para) => (
    <p key={para} className="mb-4">
      {para}
    </p>
  ))

export default function ProjectPage({ params: { id } }: { params: { id: string } }) {
  const data = projects.find((project) => id === project.id)

  if (!data) {
    const { isLoading, data: project } = api.projects.getProjectByName.useQuery({ name: id })

    if (isLoading) return <Loading />
    return project ? <DBProject data={project} /> : null
  } else {
    return (
      <main className="main">
        {data.img ? (
          <div className="relative bg-black py-32 md:py-48">
            <Image
              alt={`An image of the front page of ${data.name}`}
              src={`/projects/${data.img}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : (
          <></>
        )}

        <div className="py-12">
          <nav className="container mx-auto mb-4 flex px-3 text-sm">
            <Link href="/projects">
              <p className="text-black hover:underline dark:text-white">Projects</p>
            </Link>
            <span className="text-black text-opacity-60 dark:text-white dark:text-opacity-60">{` / ${data.name}`}</span>
          </nav>
          <div className="container relative mx-auto px-3 lg:flex">
            <div className="space-y-8 lg:mr-8">
              <div className="space-y-4">
                <h1 className="mb-6 font-mono text-4xl md:text-6xl">{data.name}</h1>
                <div className="grid grid-cols-2 items-center gap-3 font-mono lg:hidden">
                  <div className="flex items-center">
                    <span className="material-symbols-sharp mr-2 select-none">{data.icon}</span>
                    {data.type}
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-sharp mr-2 select-none" title="Start Date">
                      date_range
                    </span>
                    {data.date}
                  </div>
                </div>
                {parseDescription(data.desc)}
                {data && (
                  <div className="mt-2 grid grid-cols-2 gap-4 sm:max-w-max lg:hidden">
                    {data.url && (
                      <Button asChild variant="outline" className="w-full font-mono" size="lg">
                        <Link href={data.url} target="_blank" rel="noopener noreferrer">
                          Visit website
                        </Link>
                      </Button>
                    )}
                    {data.source && (
                      <Button asChild variant="outline" className="w-full font-mono" size="lg">
                        <Link href={data.source} target="_blank" rel="noopener noreferrer">
                          Visit source
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <Impact impact={data.impact} className="lg:hidden" />
              <div className="space-y-4">
                <h2 className="font-mono text-2xl font-black">Technologies used</h2>
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
                  <span className="material-symbols-sharp mr-3 select-none">{data.icon}</span>
                  {data.type}
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-sharp mr-3 select-none" title="Start Date">
                    date_range
                  </span>
                  {data.date}
                </div>
              </div>
              {data && (
                <div className="grid gap-4">
                  {data.url && (
                    <Button asChild variant="outline" className="w-full font-mono" size="lg">
                      <Link href={data.url}>Visit website</Link>
                    </Button>
                  )}
                  {data.source && (
                    <Button asChild variant="outline" className="w-full font-mono" size="lg">
                      <Link href={data.source}>Visit source</Link>
                    </Button>
                  )}
                </div>
              )}
              <Impact impact={data.impact} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}
