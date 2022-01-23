import { createContext, Dispatch, SetStateAction } from 'react'

type UserType = UserProps | undefined | null

export const UserContext = createContext<{
  user: UserType
  setUser: Dispatch<SetStateAction<UserType>>
}>({
  user: undefined,
  setUser: () => {}
})
export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

// All functions for user data should be placed below
export const getInitials = (name: string | null) => {
  const initialArray = name?.split(' ').map(name => name.charAt(0))
  return initialArray
    ? `${initialArray[0]}${initialArray[initialArray.length - 1]}`
    : ''
}

export interface UserProps {
  _id: string
  isGuildMember: boolean
  gender: string
  roles: Array<string>
  isFinancialMember: boolean
  firstName: string
  lastName: string
  name: string
  email: string
  bio: string
  socials: Array<any>
  services: Array<any>
  createdAt: string
  updatedAt: string
  avatar?: string
}
