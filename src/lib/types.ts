import type { iconMap, NAMED_ROLES } from "./constants"

export interface PropsWithChildren {
  children: React.ReactNode
}

export interface ClerkError {
  errors: Array<{
    message: string
    long_message: string
    code: string
  }>
}

export interface User {
  email: string
  name: string
  id: string
  preferred_name: string
  pronouns: string
  student_number: string | null
  university: string | null
  github: string | null
  discord: string | null
  subscribe: boolean
  role: (typeof NAMED_ROLES)[number] | null
  square_customer_id: string
  createdAt: Date
  updatedAt: Date | null
}

export interface ImageProps {
  src: string
  srcDark?: string
  alt: string
  link?: string
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

export interface Event {
  slug: string
  tags: Array<string>
  title: string
  image: ImageProps
  date: string
  time: {
    start: string
    end: string
  }
  location: string
  desc: string
  type?: "workshop" | "industry night" | "social event"
  isPaid?: boolean
}

export type IconKey = keyof typeof iconMap
