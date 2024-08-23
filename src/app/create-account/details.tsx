import { siDiscord } from "simple-icons"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"

const DetailsBlock = () => {
  return (
    <div className="relative hidden md:block">
      <div className="absolute inset-0 z-10 -m-4 grid p-4 backdrop-blur-sm">
        <div className="flex select-none items-center place-self-center px-4 py-2">
          <span className="material-symbols-sharp text-6xl">lock</span>
          <p>Complete part 2 to join us!</p>
        </div>
      </div>
      <div aria-hidden className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-semibold leading-none tracking-tight">Personal details</h2>
          <p className="text-sm text-muted-foreground">Fields marked with * are required.</p>
        </div>
        <div className="space-y-1.5">
          <p>Email address</p>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-1.5">
          <p>Full name</p>
          <Skeleton className="h-10 w-full" />
          <p>We use your full name for internal committee records and official correspondence</p>
        </div>
        <div className="space-y-1.5">
          <p>Preferred name</p>
          <Skeleton className="h-10 w-full" />
          <p>This is how we normally refer to you</p>
        </div>
        <div className="space-y-1.5">
          <p>Pronouns</p>
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="space-y-1.5">
          <p>UWA student number</p>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <h2 className="font-semibold leading-none tracking-tight">Socials</h2>
          <p className="text-sm text-muted-foreground">
            These fields are optional but are required if you plan on applying for projects during the winter and summer
            breaks.
          </p>
          <Alert>
            <svg viewBox="0 0 24 24" width={16} height={16} className="mr-2 fill-current">
              <title>{siDiscord.title}</title>
              <path d={siDiscord.path} />
            </svg>
            <AlertTitle>Join our Discord!</AlertTitle>
            <AlertDescription>
              You can join our Discord server at <strong>discord.codersforcauses.org</strong>
            </AlertDescription>
          </Alert>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="space-y-1.5">
            <p>Github username</p>
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-1.5">
            <p>Discord username</p>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Button disabled className="w-full">
          Next
        </Button>
      </div>
    </div>
  )
}

export default DetailsBlock
