import { createContext, Dispatch, SetStateAction } from 'react'

export const UserContext = createContext<{
  user: UserProps | undefined | null
  setUser: Dispatch<SetStateAction<UserProps | undefined | null>>
}>({
  user: undefined,
  setUser: () => {}
})
export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export const DarkContext = createContext<boolean | undefined>(false)
export const DarkProvider = DarkContext.Provider

// All functions for user data should be placed below
export const getInitials = (name: string) => {
  const initialArray = name.split(' ').map(name => name.charAt(0))
  return `${initialArray[0]}${initialArray[initialArray.length - 1]}`
}

export interface UserProps {
  _id: string
  signUpType: string
  isGuildMember: boolean
  gender: string
  roles: Array<string>
  isFinancialMember: boolean
  firstName: string
  lastName: string
  name?: string
  email: string
  awsSub: string
  bio: string
  socials: Array<any>
  services: Array<any>
  createdAt: string
  updatedAt: string
  jwtToken?: string
}
