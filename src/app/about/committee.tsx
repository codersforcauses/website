import committee from "@/data/committee.json"
import Image from "next/image"
import * as React from "react"
import { siGithub } from "simple-icons"

import type { CardItemProps } from "~/lib/types"

const CommitteeCard = ({ name, position, about, social, picture: { src, alt } }: CardItemProps) => (
  <div className="group relative flex">
    <div className="relative h-96 w-full md:h-64 lg:h-72">
      <div className="h-full w-full animate-pulse bg-secondary dark:bg-alt-dark" />
      <Image priority src={src} alt={alt} fill className="h-full w-full object-cover object-top" />
    </div>
    <div className="absolute inset-x-0 bottom-0 p-4 text-secondary opacity-0 transition-opacity duration-300 group-hover:bg-primary group-hover:opacity-100">
      <p className="font-mono font-black">
        {name} <span className="text-sm font-normal text-secondary/75">({about})</span>
      </p>
      <p className="mb-0.5 text-secondary/75">{position}</p>
      <div className="flex items-center space-x-2">
        {Object.entries(social).map(([key, value]) => (
          <React.Fragment key={key}>
            {key === "email" ? (
              <a href={"mailto:" + value} className="flex self-center" title={value}>
                <span className="material-symbols-sharp">email</span>
              </a>
            ) : (
              <a target="_blank" rel="noopener noreferrer" href={value}>
                <svg height={20} width={20} viewBox="0 0 24 24" aria-label={key} role="img" className="fill-current">
                  <title>{key}</title>
                  <path d={siGithub.path} />
                </svg>
              </a>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
)

const Committee = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {committee.map((member) => (
        <CommitteeCard key={member.name} {...member} />
      ))}
    </div>
  )
}

export default Committee
