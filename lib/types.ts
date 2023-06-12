import { Types } from 'mongoose'

export interface ImageProps {
  src: string
  srcDark?: string
  alt: string
}

export interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

export type ColorProps = 'accent' | 'success' | 'danger' | 'warning'
export interface AnnouncementModel {
  color: ColorProps
  html: string
}

interface Mongoose {
  readonly _id: string | Types.ObjectId
  readonly createdAt: string
  readonly updatedAt: string
}

export type Announcements = (AnnouncementModel & Mongoose) | null

export type Role =
  | 'admin'
  | 'HLM'
  | 'president'
  | 'vice_president'
  | 'secretary'
  | 'treasurer'
  | 'tech_lead'
  | 'marketing_officer'
  | 'OCM'
  | 'first_year_rep'
  | 'member'

export type Socials =
  | 'discord'
  | 'github'
  | 'gitlab'
  | 'bitbucket'
  | 'linkedin'
  | 'website'
  | 'email'

interface SocialType {
  type: Socials
  username: string
  link: string
}

export type CardBrand =
  | 'VISA'
  | 'MASTERCARD'
  | 'DISCOVER'
  | 'DISCOVER_DINERS'
  | 'JCB'
  | 'AMERICAN_EXPRESS'
  | 'CHINA_UNIONPAY'
  | 'OTHER_BRAND'

export interface CardDetails {
  token: string
  details: {
    brand: CardBrand
    last4: string
    expMonth: number
    expYear: number
  }
}

export interface UserModel {
  firstName: string
  lastName: string
  email: string
  clerkID: string
  isGuildMember: boolean
  isFinancialMember: boolean
  gender: 'male' | 'female' | 'other'
  profileImage?: string
  dob?: Date
  roles?: Array<Role>
  bio?: string
  socials?: Array<SocialType>
  tech?: Array<string>
  cards?: Array<CardDetails>
}

export type User = (UserModel & Mongoose & { name: string }) | null

export interface ClientModel {
  name: string
  description: string
  email: string
}

export type Client = (ClientModel & Mongoose) | null

type ProjectType = 'web' | 'mobile_app' | 'desktop_app'

interface ProjectLinks {
  type:
    | 'github'
    | 'gitlab'
    | 'bitbucket'
    | 'app_store'
    | 'play_store'
    | 'website'
  link: string
}

interface TechIcons {
  icon: string
  name: string
}

export interface ProjectModel {
  name: string
  slug: string
  description: string
  type: Array<ProjectType>
  client: Array<Types.ObjectId>
  dates: {
    start: Date
    end?: Date
  }
  imageLinks?: Array<String>
  impact?: Array<string>
  links?: Array<ProjectLinks>
  tech?: Array<TechIcons>
  members?: Array<Types.ObjectId>
}

export type Projects = (ProjectModel & Mongoose) | null
