"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

import projects from "~/data/projects.json"
import { Button } from "~/ui/button"

export default function ProjectsPage() {
  const { resolvedTheme } = useTheme()
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <section className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        {projects.map((project) => (
          <div key={project.id} className="group relative aspect-square size-full border select-none">
            <Image
              src={(resolvedTheme === "dark" && project.dark_logo) || project.logo}
              alt={project.client}
              fill
              className="object-contain object-center p-12 brightness-110 contrast-50 grayscale transition-all duration-300 group-hover:filter-none dark:brightness-150 dark:group-hover:filter-none"
            />
            <div className="absolute bottom-0 flex w-full items-end justify-between gap-px p-2">
              <div className="flex flex-col gap-y-px">
                <p className="w-fit bg-neutral-950 px-1.5 py-1 text-sm leading-none font-medium text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950">
                  {project.name}
                </p>
                <p className="w-fit bg-neutral-950 px-1.5 py-1 text-xs text-neutral-200 dark:bg-neutral-50 dark:text-neutral-800">
                  {project.client}
                </p>
              </div>
              <Button asChild size="icon">
                <Link href={`projects/${project.id}`}>
                  <span className="material-symbols-sharp">arrow_outward</span>
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
