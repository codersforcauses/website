import type { Viewport, Metadata } from "next"
import dynamic from "next/dynamic"

import projectData from "data/projects.json"
import { customMetadata } from "~/lib/metadata"
const Card = dynamic(() => import("./card"), {
  ssr: false,
})
const ProjectProcessModal = dynamic(() => import("./modal"), {
  ssr: false,
})

export const viewport: Viewport = {
  themeColor: "black",
}

export const metadata: Metadata = {
  title: "Projects",
  ...customMetadata({
    name: "Our Projects",
    page: "projects",
    description: "A list of all past and present projects.",
    image:
      "https://og-social-cards.vercel.app/**.%2Fprojects**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg",
  }),
}

export default function ProjectsPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row md:gap-12">
        <div className="flex-grow">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4 py-6">
            {projectData.map((project) => (
              <Card key={project.id} project={project} />
            ))}
          </div>
        </div>
        <div className="mt-6 md:w-1/4">
          <ProjectProcessModal />
        </div>
      </div>
    </div>
  )
}
