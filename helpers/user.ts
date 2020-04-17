import { createContext } from 'react'

export const UserContext = createContext({})
export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

// All functions for user data should be placed below
export const getInitials = (name: string) => {
  const initialArray = name.split(' ').map(name => name.charAt(0))
  return `${initialArray[0]}${initialArray[initialArray.length - 1]}`
}
