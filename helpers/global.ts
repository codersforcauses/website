export interface ImageProps {
  src: string
  alt: string
}

export interface ModalProps {
  isOpen: boolean
  closeModal: () => void
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

interface Mongoose {
  _id: string | string
  createdAt: string
  updatedAt: string
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
  createdAt: string
  updatedAt: string
}

export type User = (UserModel & Mongoose & { name: string }) | null
