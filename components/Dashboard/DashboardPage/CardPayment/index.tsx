import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { payments, Card, CardClassSelectors } from '@square/web-sdk'
import { useUser } from '@helpers/user'
import { Button } from '@elements/Button'
import BrandIcons from '@elements/BrandIcons'

const applicationID = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!
const locationID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!

const commonStyles: CardClassSelectors = {
  'input.is-error': {
    color: '#ff0000'
  },
  'input::placeholder': {
    color: '#6b7280'
  },
  '.input-container.is-error': {
    borderColor: '#ff0000'
  },
  '.message-icon.is-error': {
    color: '#ff0000'
  },
  '.message-text.is-error': {
    color: '#ff0000'
  }
}
const lightTheme: CardClassSelectors = {
  input: {
    backgroundColor: '#f5f5f5',
    color: '#000000',
    fontFamily: 'helvetica neue, sans-serif'
  },
  '.input-container': {
    borderRadius: '0',
    borderColor: '#000000'
  },
  '.input-container.is-focus': {
    borderColor: '#000000'
  },
  '.message-icon': {
    color: '#000000'
  },
  '.message-text': {
    color: '#000000'
  }
}
const darkTheme: CardClassSelectors = {
  input: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontFamily: 'helvetica neue, sans-serif'
  },
  '.input-container': {
    borderRadius: '0',
    borderColor: '#ffffff'
  },
  '.input-container.is-focus': {
    borderColor: '#ffffff'
  },
  '.message-icon': {
    color: '#ffffff'
  },
  '.message-text': {
    color: '#ffffff'
  }
}

const CardPayment = ({ handleCardPayment }: CardPaymentProps) => {
  const [card, setCard] = useState<Card>()
  const [error, setError] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme: theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const loadCard = async () => {
      try {
        const paymentResponse = await payments(applicationID, locationID)
        if (paymentResponse === null)
          throw new Error('Square Web Payments SDK failed to load')
        paymentResponse.setLocale('en-AU')
        const cardResponse = await paymentResponse.card({
          style: {
            ...commonStyles,
            ...(isDark ? darkTheme : lightTheme)
          }
        })
        await cardResponse.attach('#card-container')
        await cardResponse.focus('cardNumber')
        setCard(cardResponse)
      } catch (error: any) {
        console.log(error.message)
      }
    }
    if (applicationID && locationID) {
      if (card) {
        card.configure({
          style: {
            ...commonStyles,
            ...(isDark ? darkTheme : lightTheme)
          }
        })
      } else loadCard()
      card?.focus('cardNumber')
      const cardMessage = cardRef?.current?.children[0]
        .children[1] as HTMLSpanElement
      if (cardMessage) cardMessage.style.fontFamily = 'IBM Plex Sans'
    }
  }, [error, card, isDark])

  const cardResponse = useCallback(
    async e => {
      e.preventDefault()
      if (!card) return
      const { errors, status, token } = await card.tokenize()
      if (status !== 'OK') setError(errors?.[0].message as string)

      handleCardPayment(token)
    },
    [card, handleCardPayment]
  )

  return (
    <div className='relative'>
      <div className='absolute right-0 z-10 top-[99px] md:top-[51px] flex items-center text-xs select-none justify-self-end opacity-50'>
        Powered by
        <BrandIcons
          icon='square'
          dimensions={12}
          className='mr-0.5 ml-1 fill-current'
        />
        Square
      </div>
      <form
        id='payment-form'
        className='min-h-[191px] md:min-h-[142px] focus:outline-none'
      >
        <div
          ref={cardRef}
          id='card-container'
          className='min-h-[145px] md:min-h-[96px] focus:outline-none'
        >
          {!card && (
            <div className='w-full h-full'>
              <div className='grid w-full h-[99px] md:h-12 font-mono border place-items-center animate-pulse border-primary dark:border-secondary bg-secondary dark:bg-alt-dark'>
                Loading secure payment portal
              </div>
            </div>
          )}
        </div>
        <Button fill className='w-full' onClick={cardResponse}>
          Pay $5 membership
        </Button>
      </form>
    </div>
  )
}

interface CardPaymentProps {
  handleCardPayment: (token?: string) => void
}

export default memo(CardPayment)
