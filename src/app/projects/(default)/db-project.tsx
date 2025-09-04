"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "~/components/ui/button"

import type { DashboardCardProps } from "~/app/dashboard/(root)/card"
import type { defaultValueType } from "~/app/dashboard/admin/@projects/project-form"
import { api } from "~/trpc/react"

const parseDescription = (text: string) =>
  text.split("\n").map((para) => (
    <p key={para} className="mb-4">
      {para}
    </p>
  ))
export type DBProjectProps = {
  data: DashboardCardProps
}

type DBTechListProps = {
  data: { label: string; value: string; path: string }[] | undefined
}
const DBTechList = ({ data }: DBTechListProps) => (
  <div className="grid grid-cols-2 gap-4">
    {data?.map((tech) => {
      return (
        <div key={tech.value} className="flex items-center space-x-3 font-mono md:space-x-4">
          <svg role="img" viewBox="0 0 24 24" height={24} width={24} className="fill-current text-4xl">
            <path d={tech.path} />
          </svg>
          <p className="md:text-xl">{tech.label}</p>
        </div>
      )
    })}
  </div>
)

export const Impact = ({ impact, ...props }: { impact?: string[]; className?: string }) => (
  <div {...props}>
    <h2 className="mb-4 font-mono text-2xl font-black">Potential impact</h2>
    {impact && (
      <ul className="space-y-3">
        {impact.map((text: string, i: number) => (
          <li key={i} className="flex items-center">
            <span className="material-symbols-sharp mr-3 select-none">check_circle</span>
            {text}
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default function DBProject({ data }: DBProjectProps) {
  const { data: users } = api.admin.users.getNamesByEmails.useQuery({ emails: data.members ? data.members : [] })

  let icon = "devices" // default "devices"
  if (data.type === "Mobile application") {
    icon = "mobile"
  } else if (data.type === "Website") {
    icon = "computer"
  }
  return (
    <main className="main flex justify-center">
      {data.img_path ? (
        <div className="relative bg-black py-32 md:py-48">
          <Image
            alt={`An image of the front page of ${data.name}`}
            src={`/projects/${data.img_path}`}
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
                  <span className="material-symbols-sharp mr-2 select-none">{icon}</span>
                  {data.type}
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-sharp mr-2 select-none" title="Start Date">
                    date_range
                  </span>
                  {data.start_date?.toISOString().slice(0, 10)}
                </div>
              </div>
              {parseDescription(data.description ?? "")}
              {data && (
                <div className="mt-2 grid grid-cols-2 gap-4 sm:max-w-max lg:hidden">
                  {data.website_url && (
                    <Button asChild variant="outline" className="w-full font-mono" size="lg">
                      <Link href={data.website_url} target="_blank" rel="noopener noreferrer">
                        Visit website
                      </Link>
                    </Button>
                  )}
                  {data.github_url && (
                    <Button asChild variant="outline" className="w-full font-mono" size="lg">
                      <Link href={data.github_url} target="_blank" rel="noopener noreferrer">
                        Visit source
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
            <Impact impact={data.impact?.map((item) => item.value)} className="lg:hidden" />
            <div className="space-y-4">
              <h2 className="font-mono text-2xl font-black">Technologies used</h2>
              {data.tech && <DBTechList data={data.tech} />}
            </div>
            <div className="space-y-4">
              <h2 className="font-mono text-2xl font-black">Members</h2>
              <ul className="grid grid-cols-2 gap-2 leading-tight">
                {users?.map((member: string) => <li key={member}>{member}</li>)}
              </ul>
            </div>
          </div>
          <div className="hidden w-full max-w-xs space-y-8 lg:block">
            <div className="space-y-4 font-mono">
              <div className="flex items-center">
                <span className="material-symbols-sharp mr-3 select-none">{icon}</span>
                {data.type}
              </div>
              <div className="flex items-center">
                <span className="material-symbols-sharp mr-3 select-none" title="Start Date">
                  date_range
                </span>
                {data.start_date?.toISOString().slice(0, 10)}
              </div>
            </div>
            {data && (
              <div className="grid gap-4">
                {data.website_url && (
                  <Button asChild variant="outline" className="w-full font-mono" size="lg">
                    <Link href={data.website_url}>Visit website</Link>
                  </Button>
                )}
                {data.github_url && (
                  <Button asChild variant="outline" className="w-full font-mono" size="lg">
                    <Link href={data.github_url}>Visit source</Link>
                  </Button>
                )}
              </div>
            )}
            <Impact impact={data.impact?.map((item) => item.value)} />
          </div>
        </div>
      </div>
    </main>
  )
}
