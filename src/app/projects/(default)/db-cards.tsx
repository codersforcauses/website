"use client"

import Image from "next/image"
import Link from "next/link"

import { api } from "~/trpc/react"

export const DBCard = ({ logo, name, client }: { logo: string; name: string; client: string }) => {
  return (
    <div className="relative aspect-square border border-black/25 hover:cursor-pointer dark:border-white/25">
      <Link href={`projects/${name}`}>
        <div className="relative h-full flex-grow">
          <Image src={logo} alt={client} fill className="object-contain object-center p-6" />
          <div className="absolute left-0 top-0 flex size-full items-center justify-center bg-black opacity-0 transition-opacity duration-300 hover:opacity-90">
            <p className="w-3/4 text-center font-mono text-white">{name}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function DBCards() {
  const { data: projects } = api.projects.getPublic.useQuery()
  return (
    <>
      {projects &&
        projects.map((project) => (
          <DBCard key={project.id} name={project.name} logo={project.logo_path} client={project.client} />
        ))}
    </>
  )
}
