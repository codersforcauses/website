import { api } from "~/trpc/server"
import QRCode from "./code"

export default async function GeneralMeetingJoinPage({
  params,
}: PageProps<"/dashboard/admin/general-meeting/[slug]/join">) {
  const { slug } = await params
  const meeting = await api.admin.generalMeetings.get(slug)
  return (
    <main className="fixed inset-0 z-10 bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 font-mono text-4xl font-extrabold tracking-tight text-balance">
          Welcome to {meeting?.title}
        </h1>
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-y-16">
            <div>
              <h2 className="pb-2 text-xl font-medium tracking-tight">Rules to vote:</h2>
              <ol className="list-inside list-decimal [&>li]:mt-2 [&>li]:text-xl [&>li]:tracking-tight">
                <li>You must be a UWA student or staff member</li>
                <li>You must be part of the UWA Student Guild</li>
                <li>You must be a Coders for Causes member</li>
                {/* <li>If you are unsure of your member status, log in to find out</li> */}
              </ol>
            </div>
            <div>
              <h2 className="pb-2 text-xl tracking-tight">Not a member and want to become one?</h2>
              <ol className="list-inside list-decimal [&>li]:mt-2 [&>li]:text-lg [&>li]:font-medium [&>li]:tracking-tight">
                <li>You must be a UWA student or staff member</li>
                <li>You must be part of the UWA Student Guild</li>
                <li>You must be a Coders for Causes member</li>
                {/* <li>If you are unsure of your member status, log in to find out</li> */}
              </ol>
            </div>
          </div>
          <div>
            <QRCode />
            <div className="my-4 space-y-1">
              <p className="text-xl font-bold">Scan code to vote</p>
              <p className="text-muted-foreground">An admin will then approve you to vote</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
