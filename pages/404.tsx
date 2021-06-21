import Link from 'next/link'
import Title from '@components/Utils/Title'

const Error404 = () => (
  <>
    <Title typed>./page not found</Title>
    <div className='grid place-items-center bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
      <div className='flex flex-col items-center justify-center space-y-8'>
        <div aria-hidden className='text-6xl md:text-8xl'>
          ¯\_(ツ)_/¯
        </div>
        <h1 className='font-mono text-2xl'>Page not found</h1>
        <Link href='/'>
          <a className='flex items-center px-2 py-1 border border-primary hover:bg-primary hover:text-secondary dark:border-secondary dark:hover:bg-secondary dark:hover:text-primary'>
            <span className='mr-2 material-icons-sharp'>arrow_back</span>
            <span>I want to go home</span>
          </a>
        </Link>
      </div>
    </div>
  </>
)

export default Error404
