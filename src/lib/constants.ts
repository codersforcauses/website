import * as SimpleIcons from "simple-icons/icons"

export const SITE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : `http://localhost:${process.env.PORT ?? 3000}`

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

export const iconMap: Record<string, { label: string; value: string; path: string }> = {
  mongodb: {
    label: SimpleIcons.siMongodb.title,
    value: "mongodb",
    path: SimpleIcons.siMongodb.path,
  },
  vuedotjs: {
    label: SimpleIcons.siVuedotjs.title,
    value: "vuedotjs",
    path: SimpleIcons.siVuedotjs.path,
  },
  nodedotjs: {
    label: SimpleIcons.siNodedotjs.title,
    value: "nodedotjs",
    path: SimpleIcons.siNodedotjs.path,
  },
  express: {
    label: SimpleIcons.siExpress.title,
    value: "express",
    path: SimpleIcons.siExpress.path,
  },
  nuxtdotjs: {
    label: SimpleIcons.siNuxtdotjs.title,
    value: "nuxtdotjs",
    path: SimpleIcons.siNuxtdotjs.path,
  },
  vuetify: {
    label: SimpleIcons.siVuetify.title,
    value: "vuetify",
    path: SimpleIcons.siVuetify.path,
  },
  nextdotjs: {
    label: SimpleIcons.siNextdotjs.title,
    value: "nextdotjs",
    path: SimpleIcons.siNextdotjs.path,
  },

  html5: {
    label: SimpleIcons.siHtml5.title,
    value: "html5",
    path: SimpleIcons.siHtml5.path,
  },
  css3: {
    label: SimpleIcons.siCss3.title,
    value: "css3",
    path: SimpleIcons.siCss3.path,
  },
  javascript: {
    label: SimpleIcons.siJavascript.title,
    value: "javascript",
    path: SimpleIcons.siJavascript.path,
  },
  heroku: {
    label: SimpleIcons.siHeroku.title,
    value: "heroku",
    path: SimpleIcons.siHeroku.path,
  },
  microsoftsqlserver: {
    label: SimpleIcons.siMicrosoftsqlserver.title,
    value: "microsoftsqlserver",
    path: SimpleIcons.siMicrosoftsqlserver.path,
  },
  microsoftazure: {
    label: SimpleIcons.siMicrosoftazure.title,
    value: "microsoftazure",
    path: SimpleIcons.siMicrosoftazure.path,
  },
  firebase: {
    label: SimpleIcons.siFirebase.title,
    value: "firebase",
    path: SimpleIcons.siFirebase.path,
  },
  react: {
    label: SimpleIcons.siReact.title,
    value: "react",
    path: SimpleIcons.siReact.path,
  },
  typescript: {
    label: SimpleIcons.siTypescript.title,
    value: "typescript",
    path: SimpleIcons.siTypescript.path,
  },
  tailwindcss: {
    label: SimpleIcons.siTailwindcss.title,
    value: "tailwindcss",
    path: SimpleIcons.siTailwindcss.path,
  },
  django: {
    label: SimpleIcons.siDjango.title,
    value: "django",
    path: SimpleIcons.siDjango.path,
  },
  digitalocean: {
    label: SimpleIcons.siDigitalocean.title,
    value: "digitalocean",
    path: SimpleIcons.siDigitalocean.path,
  },
  prisma: {
    label: SimpleIcons.siPrisma.title,
    value: "prisma",
    path: SimpleIcons.siPrisma.path,
  },
  clerk: {
    label: SimpleIcons.siClerk.title,
    value: "clerk",
    path: SimpleIcons.siClerk.path,
  },
  docker: {
    label: SimpleIcons.siDocker.title,
    value: "docker",
    path: SimpleIcons.siDocker.path,
  },
}

export const PROJECT_ICONS = ["devices", "computer", "mobile"] as const

export const PROJECT_TYPES = ["Mobile application", "Progressive Web App (PWA)", "Website"] as const
