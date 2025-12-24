"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

import sponsors from "~/data/sponsors.json"

export default function Sponsors() {
  const { resolvedTheme } = useTheme()
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] place-items-center gap-8">
      {sponsors.map((sponsor) => (
        <Link key={sponsor.name} href={sponsor.link} target="_blank" rel="noopener noreferrer">
          <Image
            src={(resolvedTheme === "dark" && sponsor.dark_logo) || sponsor.logo}
            alt={`${sponsor.name} logo`}
            title={sponsor.name}
            width={200}
            height={100}
            className="brightness-110 contrast-50 grayscale transition-all duration-150 ease-in hover:filter-none dark:brightness-150 dark:hover:filter-none"
          />
        </Link>
      ))}
    </div>
  )
}
