export const SITE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://codersforcauses.org"
    : process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000"

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
