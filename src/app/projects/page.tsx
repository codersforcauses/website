import type { Viewport, Metadata } from "next"
import ProjectsPage from "../_components/projects/page"
import { customMetadata } from "~/lib/metadata"

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
const Projects = () => {
  return (
    <>
      <ProjectsPage />
    </>
  )
}

export default Projects
