import { memo, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { Disclosure, Transition } from '@headlessui/react'
import Title from '@components/Utils/Title'
import { useUser } from '@lib/user'
import Announcements from './Announcements'
import CardSelector from './CardSelector'

const CardPayment = dynamic(() => import('./CardPayment'), { ssr: false })

const DashboardPage = () => {
  const { user, mutate } = useUser()
  const [selectedCard, setSelectedCard] = useState('')

  const handleCardPayment = useCallback(
    async (token?: string) => {
      if (!token || !selectedCard) return
      await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token || selectedCard,
          id: user?._id,
          email: user?.email
        })
      })
      mutate()
    },
    [selectedCard, user, mutate]
  )

  return (
    <>
      <Title typed>./dashboard</Title>
      <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container grid gap-8 px-3 mx-auto lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='px-4 py-3 space-y-8 bg-alt-light dark:bg-primary'>
              {user?.cards && user?.cards?.length > 0 ? (
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
              {user?.cards && user?.cards?.length > 0 ? (
                <>
                  <CardSelector
                    cards={user.cards}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    handleCardPayment={handleCardPayment}
                  />
                  <div className='relative grid border select-none place-items-center border-primary/25 dark:border-secondary/25'>
                    <span className='absolute z-10 px-4 font-mono bg-alt-light dark:bg-primary'>
                      or
                    </span>
                  </div>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className='relative w-full py-2 bg-secondary dark:bg-alt-dark focus:outline-none focus:ring focus:ring-inset focus:ring-accent'>
                          Use different card
                          <span className='absolute material-icons-sharp right-4'>
                            {open ? 'expand_less' : 'expand_more'}
                          </span>
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter='transition duration-200 ease-out'
                          enterFrom='transform h-0 opacity-0'
                          enterTo='transform h-full opacity-100'
                          leave='transition duration-75 ease-out'
                          leaveFrom='transform h-full opacity-100'
                          leaveTo='transform h-0 opacity-0'
                        >
                          <Disclosure.Panel static>
                            <CardPayment
                              handleCardPayment={handleCardPayment}
                            />
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                </>
              ) : (
                <CardPayment handleCardPayment={handleCardPayment} />
              )}
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

export default memo(DashboardPage)
