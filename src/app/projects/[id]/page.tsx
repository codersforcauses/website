import type { Route } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import projects from "~/data/projects.json"
import { cn } from "~/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/ui/breadcrumb"
import { buttonVariants } from "~/ui/button"
import { iconMap } from "~/lib/constants"
import { div } from "motion/react-client"

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }))
}

export default async function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params
  const project = projects.find((proj) => id === proj.id)

  if (!project) notFound()

  return (
    <>
      <section className="relative border-b border-black bg-black py-32 md:py-48">
        <Image
          fill
          alt={`An image of the front page of ${project.name}`}
          src={`/projects/${project.img}`}
          className="object-contain object-center"
        />
      </section>
      <div className="container mx-auto px-4 py-12">
        <section>
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/projects">Projects</Link>} />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col gap-4">
            <h1 className="scroll-m-20 font-mono text-4xl tracking-tight text-balance md:text-6xl">{project.name}</h1>
            <div className="grid grid-cols-2 items-center font-mono">
              <div className="flex items-center gap-2">
                <span className="material-symbols-sharp text-xl! leading-none!">{project.icon}</span>
                <p>{project.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-sharp text-xl! leading-none!">date_range</span>
                <p>{project.date}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              {project.desc.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {(project?.url ?? project?.source) && (
              <div className="mt-2 grid grid-cols-2 gap-4 sm:max-w-max">
                {project?.url && (
                  <Link
                    href={project.url as Route}
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full font-mono")}
                  >
                    Visit website
                  </Link>
                )}
                {project?.source && (
                  <Link
                    href={project.source as Route}
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full font-mono")}
                  >
                    View code
                  </Link>
                )}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h2 className="scroll-m-20 font-mono text-2xl font-semibold">Built with</h2>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                {project.tech.map((tech) => {
                  const iconPath = typeof tech.icon === "string" ? iconMap[tech.icon] : undefined
                  return (
                    <div key={tech.name} className="flex items-center gap-2 select-none">
                      {iconPath && (
                        <div className="grid size-8 place-items-center bg-muted">
                          <svg role="img" viewBox="0 0 24 24" height={16} width={16} className="fill-current">
                            <path d={iconPath} />
                          </svg>
                        </div>
                      )}
                      <p>{tech.name}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="scroll-m-20 font-mono text-2xl font-semibold">Members</h2>
              <ul className="grid grid-cols-2 gap-2 leading-tight lg:grid-cols-3">
                {project.members.map((member: string) => (
                  <li key={member}>{member}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
