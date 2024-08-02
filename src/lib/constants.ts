import * as SimpleIcons from "simple-icons/icons"

export const SITE_URL = process.env.VERCEL_URL ? process.env.VERCEL_URL : `http://localhost:${process.env.PORT ?? 3000}`

export const NAMED_ROLES = ["member", "honorary", "past", "committee", "admin"] as const

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
