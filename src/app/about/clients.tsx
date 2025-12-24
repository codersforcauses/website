"use client"

import Image from "next/image"
import { useTheme } from "next-themes"

import clients from "~/data/clients.json"

export default function Clients() {
  const { resolvedTheme } = useTheme()
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] place-items-center gap-8">
      {clients.map((client) => (
        <Image
          key={client.name}
          src={(resolvedTheme === "dark" && client.dark_logo) || client.logo}
          alt={`${client.name} logo`}
          title={client.name}
          width={client.width}
          height={100}
          className="brightness-110 contrast-50 grayscale transition-all duration-150 ease-in hover:filter-none dark:brightness-150 dark:hover:filter-none"
        />
      ))}
    </div>
  )
}
