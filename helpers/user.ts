import { createContext, Dispatch, SetStateAction } from 'react'
import { User } from './global'

export const UserContext = createContext<{
  user: User
  setUser: Dispatch<SetStateAction<User>>
}>({
  user: null,
  setUser: () => {}
})
export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

// All functions for user data should be placed below
export const getInitials = (name: string) => {
  const initialArray = name?.split(' ').map(name => name.charAt(0))
  return initialArray
    ? `${initialArray[0]}${initialArray[initialArray.length - 1]}`
    : ''
}
