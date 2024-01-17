"use client"

import { type ProjectModel } from "~/lib/types"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

interface ProjectCardProps {
  project: ProjectModel
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { theme } = useTheme()

  return (
    <div className="relative aspect-square bg-alt-light hover:cursor-pointer dark:bg-black">
      <Link key={project.id} href={`projects/${project.id}`}>
        <div className="relative h-full flex-grow">
          <Image
            priority
            src={theme === "dark" ? project.dark_logo : project.logo}
            alt={project.client}
            fill
            className="object-contain object-center p-6"
          />
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black opacity-0 transition-opacity duration-300 hover:opacity-90">
            <p className="w-3/4 text-center font-mono text-white">
              {project.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProjectCard
