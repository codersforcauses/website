"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

import type { ProjectModel } from "./types"

interface ProjectCardProps {
  project: ProjectModel
}

const Card = ({ project }: ProjectCardProps) => {
  const { resolvedTheme: theme } = useTheme()
  return (
    <div className="relative aspect-square border border-black/25 hover:cursor-pointer dark:border-white/25">
      <Link href={`projects/${project.id}`}>
        <div className="relative h-full flex-grow">
          <Image
            src={theme === "dark" ? project.dark_logo : project.logo}
            alt={project.client}
            fill
            className="object-contain object-center p-6"
          />
          <div className="absolute left-0 top-0 flex size-full items-center justify-center bg-black opacity-0 transition-opacity duration-300 hover:opacity-90">
            <p className="w-3/4 text-center font-mono text-white">{project.name}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
