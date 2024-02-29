import OnlinePaymentForm from "~/components/payment/online"
import { Separator } from "~/components/ui/separator"
import { toast } from "~/components/ui/use-toast"
import { setUserCookie } from "~/app/actions"
import { api } from "~/trpc/server"

export default async function Membership() {
  const user = await api.user.getCurrent.query()

  const handleAfterOnlinePayment = async (paymentID: string) => {
    try {
      const updatedUser = await api.user.updateRole.mutate({
        id: user!.id,
        role: "member",
        paymentID,
      })
      await setUserCookie(updatedUser!)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update role",
        description: "An error occurred while trying to update your role.",
      })
    }
  }
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-mono text-lg font-medium">Membership</h3>
        <p className="text-sm text-muted-foreground">View your current membership details or renew your membership.</p>
      </div>
      <Separator className="md:max-w-2xl" />
      {user?.role === "admin" && (
        <div>
          <h3 className="font-mono text-lg font-medium">Admin</h3>
          <p className="text-sm text-muted-foreground">Manage your membership and other settings.</p>
        </div>
      )}
      {user?.role === "committee" && (
        <div>
          <h3 className="font-mono text-lg font-medium">Committee</h3>
          <p className="text-sm text-muted-foreground">Manage your membership and other settings.</p>
        </div>
      )}
      {user?.role === "past" && (
        <div>
          <h3 className="font-mono text-lg font-medium">Past committee</h3>
          <p className="text-sm text-muted-foreground">Manage your membership and other settings.</p>
        </div>
      )}
      {user?.role === "honorary" && (
        <div>
          <h3 className="font-mono text-lg font-medium">Honorary member</h3>
          <p className="text-sm text-muted-foreground">Manage your membership and other settings.</p>
        </div>
      )}
      {user?.role === "member" && (
        <div>
          <h3 className="font-mono text-lg font-medium">Member</h3>
          <p className="text-sm text-muted-foreground">
            You are current a Coders for Causes member until 31st December {new Date().getFullYear()}
          </p>
        </div>
      )}
      {user?.role === null && (
        <div>
          <h3 className="font-mono text-lg font-medium"></h3>
          <OnlinePaymentForm afterPayment={handleAfterOnlinePayment} />
        </div>
      )}
    </div>
  )
}
