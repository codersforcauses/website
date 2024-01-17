export interface PropsWithChildren {
  children: React.ReactNode
}

export interface ImageProps {
  src: string
  srcDark?: string
  alt: string
}

export type Socials = "discord" | "github" | "gitlab" | "bitbucket" | "linkedin" | "website" | "email"

type Social = Partial<Record<Socials, string>>

export interface CardItemProps {
  name: string
  position: string
  about: string
  social: Social
  picture: ImageProps
}

interface TechIcons {
  icon: string
  name: string
}

export interface ProjectModel {
  id: string
  icon: string
  logo: string
  dark_logo: string
  img: string
  name: string
  client: string
  type: string
  date: string
  purl: string
  url?: string
  source: string
  impact?: string[]
  desc: string
  tech?: TechIcons[]
  members?: string[]
}
