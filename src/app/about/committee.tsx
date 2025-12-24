import Image from "next/image"
import { siGithub } from "simple-icons"

import committee from "~/data/committee.json"
import { Button } from "~/ui/button"

export default function Committee() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {committee.map((com) => (
        <div key={com.name} className="relative h-64 w-full md:h-64 lg:h-80">
          <Image
            fill
            src={com.picture.src}
            alt={com.picture.alt}
            className="h-full w-full object-cover object-top grayscale transition-all duration-150 ease-in hover:filter-none"
          />
          <div className="absolute bottom-0 flex flex-col gap-y-px p-2">
            <p className="w-fit bg-neutral-950 px-1.5 py-1 text-sm leading-none font-medium text-neutral-50">
              {com.name}
              <span className="ml-2 text-xs text-neutral-300">{com.pronouns}</span>
            </p>
            <p className="w-fit bg-neutral-950 px-1.5 py-1 text-xs text-neutral-200">{com.position}</p>
            {/* <div className="hidden w-fit grid-cols-2 gap-px md:grid">
              <Button asChild aria-label="email" variant="ghost-dark" size="icon" className="size-6 bg-neutral-950">
                <a target="_blank" rel="noopener noreferrer" href={`mailto:${com.social.email}`}>
                  <span aria-hidden className="material-symbols-sharp text-base! leading-none!">
                    mail
                  </span>
                </a>
              </Button>
              <Button
                asChild
                aria-label="GitHub profile"
                variant="ghost-dark"
                size="icon"
                className="size-6 bg-neutral-950"
              >
                <a target="_blank" rel="noopener noreferrer" href={com.social.github}>
                  <svg aria-hidden height={16} width={16} viewBox="0 0 24 24" className="fill-neutral-50">
                    <path d={siGithub.path} />
                  </svg>
                </a>
              </Button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  )
}
