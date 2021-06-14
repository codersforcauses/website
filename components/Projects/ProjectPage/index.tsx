import Image from 'next/image'
import Link from 'next/link'
import TechList from './TechList'
import type { Tech } from './TechList'
import WebsiteButton from './button'

const parseDescription = (text: string) =>
  text.split('\n').map(para => (
    <p key={para} className='mb-4'>
      {para}
    </p>
  ))

const Impact = ({
  impact,
  ...props
}: {
  impact: Array<string>
  className?: string
}) => (
  <div {...props}>
    <h2 className='mb-4 font-mono text-2xl font-black'>Potential impact</h2>
    <ul className='space-y-3'>
      {impact.map((text: string, i: number) => (
        <li key={i} className='flex items-center'>
          <span className='mr-4 material-icons-sharp'>check_circle</span>
          {text}
        </li>
      ))}
    </ul>
  </div>
)

const ProjectPage = ({ data }: Props) => (
  <>
    <div className='relative py-32 md:py-48 bg-primary'>
      <Image
        alt={data?.alt ?? `An image of the front page of ${data.name}`}
        src={`/projects/${data.img}`}
        layout='fill'
        objectFit='contain'
      />
    </div>
    <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
      <nav className='container px-3 mx-auto mb-4 text-sm'>
        <Link href='/projects'>
          <a className='text-primary dark:text-secondary hover:underline'>
            Projects
          </a>
        </Link>
        <span className='opacity-60'>{` / ${data.name}`}</span>
      </nav>
      <div className='container relative px-3 mx-auto lg:flex'>
        <div className='space-y-8 lg:mr-8'>
          <div className='space-y-4'>
            <h1 className='mb-6 font-mono text-4xl md:text-6xl'>{data.name}</h1>
            <div className='grid items-center grid-cols-2 font-mono lg:hidden'>
              <div className='flex items-center'>
                <span className='mr-3 material-icons-sharp'>{data.icon}</span>
                {data.type}
              </div>
              <div className='flex items-center'>
                <span className='mr-3 material-icons-sharp'>date_range</span>
                {data.date}
              </div>
            </div>
            {parseDescription(data.desc)}
            {data && (
              <div className='grid grid-cols-2 gap-4 mt-2 max-w-max lg:hidden'>
                {data.url && (
                  <WebsiteButton link={data.url} text='Visit Website' />
                )}
                {data.source && (
                  <WebsiteButton link={data.source} text='View Source' />
                )}
              </div>
            )}
          </div>
          <Impact impact={data.impact} className='lg:hidden' />
          <div className='space-y-4'>
            <h2 className='font-mono text-2xl font-black'>Technologies used</h2>
            <TechList data={data.tech} />
          </div>
          <div className='space-y-4'>
            <h2 className='font-mono text-2xl font-black'>Members</h2>
            <ul className='grid grid-cols-2 gap-2 leading-tight'>
              {data.members.map((member: string) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='hidden w-full max-w-xs space-y-8 lg:block'>
          <div className='space-y-4 font-mono'>
            <div className='flex items-center'>
              <span className='mr-3 material-icons-sharp'>devices</span>
              {data.type}
            </div>
            <div className='flex items-center'>
              <span className='mr-3 material-icons-sharp' title='Start Date'>
                date_range
              </span>
              {data.date}
            </div>
          </div>
          {data && (
            <div className='grid gap-4'>
              {data.url && (
                <WebsiteButton link={data.url} text='Visit Website' />
              )}
              {data.source && (
                <WebsiteButton link={data.source} text='View Source' />
              )}
            </div>
          )}
          <Impact impact={data.impact} />
        </div>
      </div>
    </div>
  </>
)

interface ProjectType {
  id: string
  icon: string
  img: string
  alt?: string
  name: string
  client: string
  type: string
  date: string
  purl: string
  url?: string
  source?: string
  impact: Array<string>
  desc: string
  tech: Array<Tech>
  members: Array<string>
}

interface Props {
  data: ProjectType
}

export default ProjectPage
export type { ProjectType }
