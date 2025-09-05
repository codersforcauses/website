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
  purl: string // project URL `/projects/[id]`
  url?: string
  source: string
  impact: string[]
  desc: string
  tech: TechIcons[]
  members: string[]
}
