import { memo, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { Tab } from '@headlessui/react'
import Title from '@components/Utils/Title'
import UsersTable from './UsersTable'
import CreateButton from './CreateButton'
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
  const [projectModal, setProjectModal] = useState(false)
  const [eventModal, setEventModal] = useState(false)
  const openAnnouncementModal = useCallback(
    () => setAnnouncementModal(true),
    []
  )
  const closeAnnouncementModal = useCallback(() => {
    setAnnouncementModal(false)
  }, [])
  const openProjectModal = useCallback(() => setProjectModal(true), [])
  const closeProjectModal = useCallback(() => {
    setProjectModal(false)
  }, [])
  const openEventModal = useCallback(() => setEventModal(true), [])
  const closeEventModal = useCallback(() => {
    setEventModal(false)
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
          <div className='grid gap-4 md:grid-cols-3'>
            <CreateButton
              name='Create Announcement'
              description='Let members know of important updates in the club. [Only viewable if logged-in]'
              handleClick={openAnnouncementModal}
            />
            <CreateButton
              name='Create Project'
              description='Create a summer or winter project. Only paying members will be able to apply.'
              handleClick={openAnnouncementModal}
            />
            <CreateButton
              name='Create Event'
              description='Let members know of upcoming events such as industry nights, workshops, etc.'
              handleClick={openAnnouncementModal}
            />
          </div>
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
