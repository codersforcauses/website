import Title from 'components/Utils/Title'
import Announcements from './Announcements'

const DashboardPage = () => {
  return (
    <>
      <Title typed>./dashboard</Title>
      <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container grid gap-4 px-3 mx-auto lg:grid-cols-3'>
          <div className='space-y-2 lg:col-start-3'>
            <h6 className='mb-4 font-bold'>Announcements</h6>
            <Announcements />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
