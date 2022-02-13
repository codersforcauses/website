export interface ImageProps {
  src: string
  alt: string
}

export interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

interface Mongoose {
  readonly _id: string | string
  readonly createdAt: string
  readonly updatedAt: string
}

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
  updatedAt: Date
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

export type ColorProps = 'accent' | 'success' | 'danger' | 'warning'
export interface AnnouncementModel {
  color: ColorProps
  html: string
}

export type Announcements = (AnnouncementModel & Mongoose) | null
