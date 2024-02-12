import * as SimpleIcons from "simple-icons/icons"

import { type NAMED_ROLES } from "./constants"

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

export interface TechIcons {
  icon: string
  name: string
}

export interface ProjectModel {
  alt?: string
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
  impact: string[]
  desc: string
  tech: TechIcons[]
  members: string[]
}

export const iconMap: Record<string, string> = {
  mongodb: SimpleIcons.siMongodb.path,
  vuedotjs: SimpleIcons.siVuedotjs.path,
  nodedotjs: SimpleIcons.siNodedotjs.path,
  express: SimpleIcons.siExpress.path,
  nuxtdotjs: SimpleIcons.siNuxtdotjs.path,
  vuetify: SimpleIcons.siVuetify.path,
  nextdotjs: SimpleIcons.siNextdotjs.path,
  vercel: SimpleIcons.siVercel.path,
  html5: SimpleIcons.siHtml5.path,
  css3: SimpleIcons.siCss3.path,
  javascript: SimpleIcons.siJavascript.path,
  heroku: SimpleIcons.siHeroku.path,
  microsoftsqlserver: SimpleIcons.siMicrosoftsqlserver.path,
  microsoftazure: SimpleIcons.siMicrosoftazure.path,
  firebase: SimpleIcons.siFirebase.path,
  react: SimpleIcons.siReact.path,
  typescript: SimpleIcons.siTypescript.path,
  tailwindcss: SimpleIcons.siTailwindcss.path,
  django: SimpleIcons.siDjango.path,
  digitalocean: SimpleIcons.siDigitalocean.path,
}

export type IconKey = keyof typeof iconMap
