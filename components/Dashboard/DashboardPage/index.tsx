import { useState } from 'react'
import dynamic from 'next/dynamic'
import Title from '@components/Utils/Title'
import { CardDetails } from '@helpers/global'
import Announcements from './Announcements'
import CardSelector from './CardSelector'

const CardPayment = dynamic(() => import('./CardPayment'), { ssr: false })

const test: Array<CardDetails> = [
  {
    token: 'hbiuidjskandbhfsjlkd',
    details: {
      brand: 'VISA',
      last4: '1111',
      expMonth: 11,
      expYear: 2019
    },
    updatedAt: new Date()
  },
  {
    token: 'mknjuoijknlbkuholsndf',
    details: {
      brand: 'MASTERCARD',
      last4: '1024',
      expMonth: 1,
      expYear: 2022
    },
    updatedAt: new Date()
  }
]

const DashboardPage = () => {
  const [selectedCard, setSelectedCard] = useState(() => test[0].token || '')
  return (
    <>
      <Title typed>./dashboard</Title>
      <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container grid gap-8 px-3 mx-auto lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='px-4 py-3 space-y-8 bg-alt-light dark:bg-primary'>
              {test ? (
                <p>
                  We&apos;ve noticed that your membership has expired. Would you
                  like to renew it to get access to discounts to events we run
                  during the year?
                </p>
              ) : (
                <p>
                  You need to be a paying member to be eligible to apply to
                  projects or run for committee. Paying members also get
                  discounts to events we run during the year.
                </p>
              )}
              {test && (
                <CardSelector
                  cards={test}
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard}
                />
              )}
              <CardPayment />
            </div>
          </div>
          <div className='space-y-3 lg:col-start-3'>
            <h6 className='mb-4 font-bold'>Announcements</h6>
            <Announcements />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
