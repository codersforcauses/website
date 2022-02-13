import { useState } from 'react'
import dynamic from 'next/dynamic'
import Title from '@components/Utils/Title'
import Announcements from './Announcements'
import CardSelector from './CardSelector'
import { User } from '@helpers/global'

const CardPayment = dynamic(() => import('./CardPayment'), { ssr: false })

const DashboardPage = ({ user }: DashboardPageProps) => {
  const [selectedCard, setSelectedCard] = useState(
    () => user?.cards?.[0].token || ''
  )
  return (
    <>
      <Title typed>./dashboard</Title>
      <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container grid gap-8 px-3 mx-auto lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='px-4 py-3 space-y-8 bg-alt-light dark:bg-primary'>
              {user?.cards ? (
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
              {user?.cards && (
                <CardSelector
                  cards={user.cards}
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

interface DashboardPageProps {
  user: User
}

export default DashboardPage
