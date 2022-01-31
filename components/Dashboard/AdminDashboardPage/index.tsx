import { memo } from 'react'
import { Tab } from '@headlessui/react'
import Title from '@components/Utils/Title'
import UsersTable from './UsersTable'

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
  return (
    <>
      <Title typed>./admin dashboard</Title>
      <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto space-y-8'>
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
    </>
  )
}

export default memo(AdminDashboardPage)
