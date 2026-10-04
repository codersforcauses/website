// microsoft icons patched in from simple icons 12.4.0 since it was removed in latest version
import {
  siClerk,
  siCss,
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
  siNuxt,
  siPrisma,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVuedotjs,
  siVuetify,
} from "simple-icons"

import type { MapCoordinates } from "~/ui/map/types"

export const UWA_COORDS = [115.819114082271, -31.98067096024902] satisfies MapCoordinates

export const NAMED_ROLES = ["member", "honorary", "past", "returning", "committee", "admin"] as const
export const ADMIN_ROLES = ["admin", "committee"]
export const MEETING_ADMIN_ROLES = ["admin", "returning"] // access to general meeting election controls
export const MEETING_ACCESS_ROLES = ["admin", "committee", "returning"] // access to general meeting admin pages

export const MEETING_STATUS = ["draft", "upcoming", "ongoing", "completed", "cancelled"] as const
export const MEETING_QUESTION_TYPE = ["short", "long", "checkbox"] as const
export const MEETING_CONTEST_STATUS = ["closed", "open", "finished"] as const

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
  nuxtdotjs: siNuxt.path,
  vuetify: siVuetify.path,
  nextdotjs: siNextdotjs.path,
  vercel: siVercel.path,
  html5: siHtml5.path,
  css: siCss.path,
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
