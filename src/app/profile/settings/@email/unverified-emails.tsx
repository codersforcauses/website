import { useUser } from "@clerk/nextjs"
import { EmailAddressResource } from "@clerk/types"
import { useState } from "react"

import { Button } from "~/components/ui/button"
import { FormLabel } from "~/components/ui/form"
import { toast } from "~/components/ui/use-toast"

type UnverifiedEmailsListProps = {
  unverifiedEmails: EmailAddressResource[]
  user: ReturnType<typeof useUser>["user"]
  toast: typeof toast
}

export const UnverifiedEmailsList = ({ unverifiedEmails, user, toast }: UnverifiedEmailsListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (email: EmailAddressResource) => {
    setDeletingId(email.id)
    try {
      await email.destroy()
      await user!.reload()
      toast({
        title: "Email deleted",
        description: `Unverified email has been removed.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete email",
        description:
          (error as { message?: string })?.message ?? "An unexpected error occurred while deleting the email.",
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mb-4">
      <FormLabel className="font-mono">Unverified emails</FormLabel>
      <p className="text-sm text-muted-foreground md:max-w-2xl mb-2">
        Please remove unverified email addresses before updating your primary email.
      </p>
      <ul className="space-y-2">
        {unverifiedEmails.map((email) => (
          <li key={email.id} className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-muted-foreground border-b">{email.emailAddress}</span>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              disabled={deletingId === email.id}
              onClick={() => handleDelete(email)}
            >
              {deletingId === email.id ? "Deleting..." : "Delete"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
