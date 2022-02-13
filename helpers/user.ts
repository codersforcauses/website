import { useAuth } from '@clerk/nextjs'
import useSWR from 'swr'
import { User } from './global'

// All functions for user data should be placed below
export const getInitials = (name: string) => {
  const initialArray = name?.split(' ').map(name => name.charAt(0))
  return initialArray
    ? `${initialArray[0]}${initialArray[initialArray.length - 1]}`
    : ''
}

export const useUser = (id?: string) => {
  const { userId } = useAuth()
  const route = id ? `/api/users?id=${id}` : `/api/users?clerkID=${userId}`

  const { data: user, mutate } = useSWR<User>(route)
  return { user, mutate }
}
