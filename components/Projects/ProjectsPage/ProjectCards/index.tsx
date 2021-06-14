import Link from 'next/link'
import Image from 'next/image'
import projects from '@data/projects.json'

const ProjectCards = () => (
  <div className='grid flex-grow grid-cols-1 gap-6 md:grid-cols-2'>
    {projects.map(project => (
      <Link key={project.name} href={project.purl}>
        <a className='focus:outline-none focus:ring focus:ring-accent hover:opacity-75'>
          <div className='bg-alt-light dark:bg-primary'>
            <div className='relative h-80'>
              <Image
                src={`/projects/${project.logo}`}
                alt={project.client}
                layout='fill'
                objectFit='contain'
                quality={90}
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
          </div>
        </a>
      </Link>
    ))}
  </div>
)

export default ProjectCards
