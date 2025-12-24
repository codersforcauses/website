import {
  siClerk,
  siCss3,
  siDigitalocean,
  siDjango,
  siDocker,
  siExpress,
  siFirebase,
  siHeroku,
  siHtml5,
  siJavascript,
  siMicrosoftazure,
  siMicrosoftsqlserver,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNuxtdotjs,
  siPrisma,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVuedotjs,
  siVuetify,
} from "simple-icons/icons"

export const NAMED_ROLES = ["member", "honorary", "past", "returning", "committee", "admin"] as const
export const ADMIN_ROLES = ["admin", "committee"]
export const MEETING_ADMIN_ROLES = ["admin", "returning"] as const // access to general meeting election controls
export const MEETING_ACCESS_ROLES = ["admin", "committee", "returning"] as const // access to general meeting admin pages

export const PRONOUNS = [
  {
    label: "He/Him",
    value: "he/him",
  },
  {
    label: "She/Her",
    value: "she/her",
  },
  {
    label: "They/Them",
    value: "they/them",
  },
] as const

export const UNIVERSITIES = [
  {
    label: "Curtin University",
    value: "curtin",
  },
  {
    label: "Edith Cowan University",
    value: "ecu",
  },
  {
    label: "Murdoch University",
    value: "murdoch",
  },
  {
    label: "University of Notre Dame",
    value: "notre-dame",
  },
  {
    label: "TAFE",
    value: "tafe",
  },
] as const

export const iconMap: Record<string, string> = {
  mongodb: siMongodb.path,
  vuedotjs: siVuedotjs.path,
  nodedotjs: siNodedotjs.path,
  express: siExpress.path,
  nuxtdotjs: siNuxtdotjs.path,
  vuetify: siVuetify.path,
  nextdotjs: siNextdotjs.path,
  vercel: siVercel.path,
  html5: siHtml5.path,
  css3: siCss3.path,
  javascript: siJavascript.path,
  heroku: siHeroku.path,
  microsoftsqlserver: siMicrosoftsqlserver.path,
  microsoftazure: siMicrosoftazure.path,
  firebase: siFirebase.path,
  react: siReact.path,
  typescript: siTypescript.path,
  tailwindcss: siTailwindcss.path,
  django: siDjango.path,
  digitalocean: siDigitalocean.path,
  prisma: siPrisma.path,
  clerk: siClerk.path,
  docker: siDocker.path,
}
