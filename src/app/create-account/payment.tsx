import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"

const PaymentBlock = () => {
  return (
    <div className="relative hidden md:block">
      <div className="absolute inset-0 z-10 -m-4 grid p-4 backdrop-blur-sm">
        <div className="flex select-none items-center place-self-center px-4 py-2">
          <span className="material-symbols-sharp text-6xl">lock</span>
          <p>Complete part 1 to continue to this part.</p>
        </div>
      </div>
      <div aria-hidden className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-semibold leading-none tracking-tight">Payment</h2>
          <div className="text-sm text-muted-foreground">
            <p>
              Become a paying member of Coders for Causes for just $5 a year (ends one year from now). There are many
              benefits to becoming a member which include:
            </p>
            <ul className="list-inside list-disc">
              <li>discounts to paid events such as industry nights</li>
              <li>the ability to vote and run for committee positions</li>
              <li>the ability to join our projects run during the winter and summer breaks.</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Our online payment system is handled by <strong>Square</strong>. We do not store your card details but we do
          record the information Square provides us after confirming your card.
        </p>
        <Skeleton className="h-10 w-full" />
        <div>
          <div className="border border-black/25 p-4 dark:border-white/25">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="mt-8 h-[99px] w-full" />
            <Skeleton className="mt-8 h-5 w-full" />
            <Skeleton className="mt-4 h-10 w-full" />
          </div>
          <div className="border border-t-0 border-black/25 p-4 dark:border-white/25">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="border border-t-0 border-black/25 p-4 dark:border-white/25">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="relative select-none">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold leading-none tracking-tight">Skipping payment</h2>
          <div className="text-sm text-muted-foreground">
            <p>
              You can skip payment for now but you will miss out on the benefits mentioned above until you do. You can
              always pay later by going to your account dashboard.
            </p>
          </div>
        </div>
        <Button disabled variant="outline" className="w-full">
          Skip payment
        </Button>
      </div>
    </div>
  )
}

export default PaymentBlock
