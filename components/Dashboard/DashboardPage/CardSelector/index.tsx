import { Dispatch, memo, SetStateAction } from 'react'
import { RadioGroup as Radio } from '@headlessui/react'
import { CardBrand, CardDetails } from '@lib/types'
import BrandIcons from '@elements/BrandIcons'
import { Button } from '@elements/Button'

const getIcon = (icon: CardBrand) => {
  switch (icon) {
    case 'AMERICAN_EXPRESS':
      return 'americanexpress'
    case 'DISCOVER':
      return 'discover'
    case 'JCB':
      return 'jcb'
    case 'MASTERCARD':
      return 'mastercard'
    case 'VISA':
      return 'visa'
    case 'CHINA_UNIONPAY':
      return ''
    case 'DISCOVER_DINERS':
      return ''
    default:
      return ''
  }
}

const CardSelector = ({ cards, ...props }: CardSelectorProps) => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  return (
    <>
      <Radio
        value={props.selectedCard}
        className='flex flex-col mb-4 space-y-1'
        onChange={props.setSelectedCard}
      >
        <div className='flex flex-col'>
          <Radio.Label className='font-mono'>Your saved cards</Radio.Label>
        </div>
        <div className='flex flex-col space-y-2'>
          {cards.map(({ details, token }: CardDetails, idx) => (
            <Radio.Option
              key={idx}
              value={token}
              disabled={
                details.expYear <= currentYear &&
                details.expMonth < currentMonth
              }
              className={({ disabled }) =>
                `flex place-items-center focus:outline-none w-fit select-none ${
                  disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer '
                }`
              }
            >
              {({ active, checked, disabled }) => (
                <>
                  <i
                    className={[
                      'material-icons-sharp',
                      active ? 'ring ring-accent rounded-full' : ''
                    ]
                      .join(' ')
                      .trim()}
                  >
                    {checked
                      ? 'radio_button_checked'
                      : 'radio_button_unchecked'}
                  </i>
                  <div className='flex items-center ml-3'>
                    {details.brand === 'CHINA_UNIONPAY' ||
                    details.brand === 'DISCOVER_DINERS' ? (
                      <span className='!mr-4 !text-[52px] material-icons-sharp'>
                        payment
                      </span>
                    ) : (
                      <BrandIcons
                        className='mr-4 fill-current'
                        icon={getIcon(details.brand)}
                        dimensions={52}
                      />
                    )}
                    <div className='flex flex-col'>
                      <Radio.Label
                        className={`font-mono text-sm md:text-xl ${
                          disabled ? 'cursor-not-allowed' : 'cursor-pointer '
                        }`}
                      >
                        **** **** **** {details.last4}
                      </Radio.Label>
                      <Radio.Description className='opacity-80'>
                        {`${details.expMonth
                          .toString()
                          .padStart(2, '0')}/${details.expYear
                          .toString()
                          .substring(2)}`}
                        <span className='font-mono'>
                          {disabled && '(expired)'}
                        </span>
                      </Radio.Description>
                    </div>
                  </div>
                </>
              )}
            </Radio.Option>
          ))}
        </div>
      </Radio>
      <Button fill className='w-full' onClick={props.handleCardPayment}>
        Renew membership
      </Button>
    </>
  )
}

interface CardSelectorProps {
  cards: Array<CardDetails>
  selectedCard: string
  setSelectedCard: Dispatch<SetStateAction<string>>
  handleCardPayment: () => void
}

export default memo(CardSelector)
