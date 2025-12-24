import * as React from "react"

import { authClient } from "~/lib/auth-client"
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/ui/alert-dialog"
import { Button } from "~/ui/button"
import { Spinner } from "~/ui/spinner"

interface DeleteUserProps {
  name: string
  userId: string
  refetchData: () => Promise<void>
}

export default function DeleteUser({ name, userId, refetchData }: DeleteUserProps) {
  const [loading, setTransition] = React.useTransition()
  const deleteUser = React.useCallback(() => {
    setTransition(async () => {
      await authClient.admin.removeUser({
        userId,
      })
      await refetchData()
    })
  }, [refetchData, userId])

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Deleting <span className="font-bold">{name}</span> is permanent and cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
        <Button type="submit" variant="destructive" disabled={loading} onClick={deleteUser}>
          Yes, delete user
          {loading && <Spinner />}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
