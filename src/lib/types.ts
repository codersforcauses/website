export interface PropsWithChildren {
  children: React.ReactNode
}

export interface ImageProps {
  src: string
  srcDark?: string
  alt: string
}

export type Socials =
  | "discord"
  | "github"
  | "gitlab"
  | "bitbucket"
  | "linkedin"
  | "website"
  | "email"

type Social = Partial<Record<Socials, string>>

export interface CardItemProps {
  name: string
  position: string
  about: string
  social: Social
  picture: ImageProps
}
