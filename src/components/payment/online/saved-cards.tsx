import { zodResolver } from "@hookform/resolvers/zod"
import { type Payments, type TokenResult, type TokenStatus } from "@square/web-sdk"
import * as React from "react"
import { useForm } from "react-hook-form"
import { siAmericanexpress, siMastercard, siVisa } from "simple-icons"
import * as z from "zod"

import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

interface Cards {
  id: string
  brand?: string
  number: string
  expiry: string
}

interface SavedCardsProps {
  amount: string
  paymentInstance: Payments
  loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  cardTokenizeResponseReceived: (token: TokenResult) => Promise<void>
  cards: Cards[]
}

const CardIcon = ({ brand }: { brand: string }) => {
  switch (brand) {
    case "MASTERCARD":
      return (
        <svg viewBox="0 0 24 24" className="h-10 fill-current">
          <path d={siMastercard.path} />
        </svg>
      )
    case "VISA":
      return (
        <svg viewBox="0 0 24 24" className="h-10 fill-current">
          <path d={siVisa.path} />
        </svg>
      )
    case "AMERICAN_EXPRESS":
      return (
        <svg viewBox="0 0 24 24" className="h-10 fill-current">
          <path d={siAmericanexpress.path} />
        </svg>
      )
    default:
      return <span className="material-symbols-sharp">credit_card</span>
  }
}

const formSchema = z.object({
  card: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

const SavedCardsForm = ({ amount, cards, ...props }: SavedCardsProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      card: cards[0]?.id,
    },
  })

  const handlePayment = async (values: FormSchema) => {
    try {
      props.loadingState[1](true)
      await props.cardTokenizeResponseReceived({
        // fuck you square
        status: "OK" as TokenStatus,
        token: values.card,
      })
    } catch (error) {
      console.error(error)
    } finally {
      props.loadingState[1](false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
        <FormField
          control={form.control}
          name="card"
          render={({ field }) => (
            <FormItem className="space-y-0 @container">
              <FormLabel className="sr-only">Your saved cards</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid gap-x-2 gap-y-1 @[550px]:grid-cols-2"
                >
                  {cards.map((card) => (
                    <FormItem key={card.id} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={card.id} />
                      </FormControl>
                      <FormLabel
                        aria-label={`${card.brand?.toLowerCase()} ending with ${card.number.slice(-4)} expiring on ${card.expiry}`}
                        className="font-normal"
                      >
                        <div key={card.id} className="flex gap-x-4">
                          <CardIcon brand={`${card.brand}`} />
                          <div className="flex flex-col justify-evenly">
                            <div className="font-mono">{card.number}</div>
                            <div className="text-xs text-muted-foreground">{card.expiry}</div>
                          </div>
                        </div>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage className="mt-1.5" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={props.loadingState[0]} className="relative w-full">
          Pay ${Number(amount)}
          {props.loadingState[0] && (
            <span className="material-symbols-sharp absolute right-4 animate-spin">progress_activity</span>
          )}
        </Button>
      </form>
    </Form>
  )
}

const SavedCards = (props: SavedCardsProps) => {
  return props.cards.length > 0 ? (
    <SavedCardsForm {...props} />
  ) : (
    <div>
      <p className="text-muted-foreground">No cards have been saved.</p>
    </div>
  )
}

export default SavedCards
