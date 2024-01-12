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
