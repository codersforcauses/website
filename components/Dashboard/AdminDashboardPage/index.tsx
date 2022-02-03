import { memo, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { Tab } from '@headlessui/react'
import Title from '@components/Utils/Title'
import { Button } from '@elements/Button'
import UsersTable from './UsersTable'
const AnnouncementModal = dynamic(() => import('./AnnouncementModal'))

const tabs = [
  {
    name: 'Users',
    icon: 'people_alt'
  },
  {
    name: 'Projects',
    icon: 'assignment'
  },
  {
    name: 'Events',
    icon: 'celebration'
  }
]

const AdminDashboardPage = () => {
  const [announcementModal, setAnnouncementModal] = useState(false)
  const openAnnouncementModal = useCallback(
    () => setAnnouncementModal(true),
    []
  )
  const closeAnnouncementModal = useCallback(() => {
    setAnnouncementModal(false)
  }, [])
  return (
    <>
      <Title typed>./admin dashboard</Title>
      <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto space-y-8'>
          {/* <div className='grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-x-4 lg:gap-x-16'>
            <div className='px-4 py-2 bg-alt-light dark:bg-primary'>
              <span className='text-xs'>Total Members</span>
              <p className='font-mono text-4xl'>{users.length}</p>
            </div>
            <div className='px-4 py-2 bg-alt-light dark:bg-primary'>
              <span className='text-xs'>Total Paying Members</span>
              <p className='font-mono text-4xl'>{users.length}</p>
            </div>
            <div className='px-4 py-2 bg-alt-light dark:bg-primary'>
              <span className='text-xs'>Total Paying Members</span>
              <p className='font-mono text-4xl'>{users.length}</p>
            </div>
          </div> */}
          <Button onClick={openAnnouncementModal}>
            <span className='flex items-center'>
              <span className='mr-2 material-icons-sharp'>add</span>
              Create Announcement
            </span>
          </Button>
          <Tab.Group as='div'>
            <Tab.List className='flex border'>
              {tabs.map(({ name, icon }) => (
                <Tab
                  key={name}
                  className={({ selected }) =>
                    `font-mono font-black flex-grow px-3 py-2 sm:px-4 flex items-center justify-center focus:outline-none focus:ring focus:ring-accent ${
                      selected &&
                      'bg-primary text-secondary dark:bg-secondary dark:text-primary'
                    }`
                  }
                >
                  <i className='hidden mr-3 select-none material-icons-sharp md:block'>
                    {icon}
                  </i>
                  <span>{name}</span>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className='pt-4'>
              <Tab.Panel>
                <UsersTable />
              </Tab.Panel>
              <Tab.Panel>
                <>projects</>
              </Tab.Panel>
              <Tab.Panel>
                <>events</>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <AnnouncementModal
        isOpen={announcementModal}
        closeModal={closeAnnouncementModal}
      />
    </>
  )
}

export default memo(AdminDashboardPage)
