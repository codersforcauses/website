"use client"

import { type ProjectModel } from "~/lib/types"
import Image from "next/image"

interface ProjectCardProps {
  project: ProjectModel
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="relative aspect-square bg-alt-light hover:cursor-pointer dark:bg-black">
      <div className="relative h-full flex-grow">
        <Image
          priority
          src={project.logo}
          alt={project.client}
          fill
          className="object-contain object-center p-6 dark:grayscale"
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black opacity-0 transition-opacity duration-300 hover:opacity-90">
          <p className="w-3/4 text-center font-mono text-white">
            {project.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
