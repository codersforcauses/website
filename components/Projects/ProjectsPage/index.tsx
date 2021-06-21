import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import Title from '@components/Utils/Title'
import ProjectCards from './ProjectCards'

const ClientBriefModal = dynamic(() => import('./ProjectDevelopmentModal'))

const ProjectsPage = () => {
  const [clientBriefModal, setClientBriefModal] = useState(false)

  const toggleModal = useCallback(() => {
    setClientBriefModal(prev => !prev)
  }, [])

  return (
    <>
      <Title typed>./projects</Title>
      <div id='#' className='py-12 bg-secondary dark:bg-alt-dark md:py-24'>
        <div className='container flex flex-col px-3 mx-auto lg:space-x-6 lg:flex-row'>
          <ProjectCards />
          <div className='mt-6 lg:mt-0 lg:w-1/5 text-primary dark:text-secondary'>
            <p>
              If you&apos;re a charity or non-profit looking to potentially work
              with us, click on the button to see our process.
            </p>
            <button
              className='grid w-full px-4 py-2 mt-4 font-mono font-black bg-transparent border place-items-center border-primary text-primary hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary dark:border-secondary dark:text-secondary dark:hover:bg-secondary dark:hover:text-primary dark:focus:bg-secondary dark:focus:text-primary focus:outline-none'
              onClick={toggleModal}
            >
              Project Development
            </button>
          </div>
        </div>
        <ClientBriefModal isOpen={clientBriefModal} closeModal={toggleModal} />
      </div>
    </>
  )
}

export default ProjectsPage
