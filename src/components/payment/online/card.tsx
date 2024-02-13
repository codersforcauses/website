"use client"

import * as React from "react"
import { type TokenResult, type Payments, type Card } from "@square/web-sdk"
import { type CheckedState } from "@radix-ui/react-checkbox"

import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { style } from "./styles"
import { Checkbox } from "~/components/ui/checkbox"

interface CardProps {
  theme: string
  amount: string
  paymentInstance: Payments
  cardDetails: [CheckedState, React.Dispatch<React.SetStateAction<CheckedState>>]
  loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  cardTokenizeResponseReceived: (token: TokenResult) => Promise<void>
}

const containerID = "card-container"
const buttonID = "card-button"

const Card = ({ amount, paymentInstance, theme, ...props }: CardProps) => {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [card, setCard] = React.useState<Card | undefined>(() => undefined)

  React.useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    if (!paymentInstance) return

    paymentInstance
      .card()
      .then(async (card) => {
        if (signal.aborted) {
          return
        }
        await card.attach(`#${containerID}`)
        setCard(card)

        if (signal.aborted) {
          void card?.destroy()
        }
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {
      abortController.abort()
    }
  }, [paymentInstance])

  React.useEffect(() => {
    if (!card) return
    card
      .configure({
        style: style(theme ?? "light"),
      })
      .catch((error) => {
        console.log(error)
      })
  }, [card, theme])

  const handlePayment = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!card) {
      console.error("Card is not initialized")
      return
    }
    try {
      props.loadingState[1](true)
      const result = await card.tokenize()

      if ((result.status as string) === "OK") {
        await props.cardTokenizeResponseReceived(result)
      }

      let message = `Tokenization failed with status: ${result.status}`
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors)}`

        throw new Error(message)
      }

      console.warn(message)
    } catch (error) {
      console.error(error)
    } finally {
      props.loadingState[1](false)
    }
  }

  return (
    <form className="@container">
      {!card && <Skeleton className="mb-4 h-[97px] w-full @[485px]:h-[48px]" />}
      <div
        id={containerID}
        className="min-h-10"
        style={{
          // needed to force colours to work on both themes
          // since for some reason background colour works in light theme but is white on dark theme
          colorScheme: "light",
        }}
      />
      <div className="mb-4 flex items-center space-x-2">
        <Checkbox
          id="terms"
          disabled={props.loadingState[0]}
          checked={props.cardDetails[0]}
          onCheckedChange={props.cardDetails[1]}
        />
        <label
          htmlFor="terms"
          className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Save card for future payments
        </label>
      </div>
      <Button
        type="button"
        id={buttonID}
        ref={btnRef}
        disabled={!card || props.loadingState[0]}
        className="relative w-full"
        onClick={handlePayment}
      >
        Pay ${Number(amount)}
        {props.loadingState[0] && (
          <span className="material-symbols-sharp absolute right-4 animate-spin">progress_activity</span>
        )}
      </Button>
    </form>
  )
}

export default Card
