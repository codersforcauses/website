import Link from 'next/link'
import Image from 'next/image'
import projects from '@data/projects.json'

const ProjectCards = () => (
  <div className='grid flex-grow grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
    {projects.map(project => (
      <Link key={project.name} href={project.purl}>
        <a className='flex flex-col focus:outline-none focus:ring focus:ring-accent hover:opacity-75 aspect-square bg-alt-light dark:bg-primary'>
          <div className='relative flex-grow m-8 text-center h-3/4'>
            <Image
              priority
              src={project.logo}
              alt={project.client}
              layout='fill'
              objectFit='contain'
            />
          </div>
          <div className='flex items-center space-x-4'>
            <div className='bg-primary'>
              <span className='p-4 material-icons-sharp text-secondary'>
                {project.icon}
              </span>
            </div>
            <p className='font-mono font-black text-primary dark:text-secondary'>
              {project.name}
            </p>
          </div>
        </a>
      </Link>
    ))}
  </div>
)

export default ProjectCards
