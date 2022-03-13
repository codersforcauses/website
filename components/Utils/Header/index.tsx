import { Fragment } from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Transition, Popover } from '@headlessui/react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import DarkToggle from './DarkToggle'
const SignedInUser = dynamic(() => import('./SignedInUser'))

const links: Array<HeaderItem> = [
  { href: '/about', text: 'About' },
  { href: '/projects', text: 'Projects' },
  { href: '/events', text: 'Events' },
  {
    href: 'https://guides.codersforcauses.org/',
    text: 'Guides',
    isExternal: true
  }
]

const Header = () => (
  <Popover
    as='header'
    className='fixed inset-x-0 top-0 z-30 py-3 bg-primary min-h-[64]'
  >
    {({ open }) => (
      <div className='container px-3 mx-auto'>
        <div className='flex items-center justify-between h-10'>
          <div className='flex items-center text-secondary'>
            {/* <Link href='#main'>
              <a
                role='link'
                className='absolute p-1 text-transparent select-none top-16 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:h-12'
              >
                Skip to content
              </a>
            </Link> */}
            <Popover.Button className='material-icons-sharp p-1 mr-3 text-secondary hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent/50 focus:ring-offset-primary md:!hidden'>
              {open ? 'close' : 'menu'}
            </Popover.Button>
            <Link href='/'>
              <a
                id='Home'
                className='px-1 py-2 -my-2 -mr-3 font-mono text-xl font-black no-underline select-none text-secondary hover:bg-secondary hover:text-primary md:mr-12 focus:outline-none focus:bg-secondary focus:text-primary'
                data-cy='nav-Home'
              >
                cfc
              </a>
            </Link>
            <nav className='hidden space-x-3 md:flex'>
              {links.map(({ isExternal, text, href }: HeaderItem) => (
                <Fragment key={text}>
                  {isExternal ? (
                    <a
                      href={href}
                      target='_blank'
                      rel='noreferrer noopener'
                      className='align-text-bottom text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent/50 focus:ring-offset-4 focus:ring-offset-primary'
                      data-cy={`nav-${text}`}
                    >
                      {text}
                    </a>
                  ) : (
                    <Link href={href} passHref>
                      <a
                        className='align-text-bottom text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent/50 focus:ring-offset-4 focus:ring-offset-primary'
                        data-cy={`nav-${text}`}
                      >
                        {text}
                      </a>
                    </Link>
                  )}
                </Fragment>
              ))}
            </nav>
          </div>
          <div className='flex items-end ml-3 space-x-3'>
            <DarkToggle />
            <SignedIn>
              <SignedInUser />
            </SignedIn>
            <SignedOut>
              {/* <Link href='/membership'>
                <a className='px-4 py-1.5 my-px bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-primary focus:outline-none focus:bg-secondary focus:text-primary'>
                  Membership
                </a>
              </Link> */}
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLSfQ8vbBY1Iqok234oFxNfpsXhLp-J2t6PcfI37TSi19GNJsXw/viewform'
                target='_blank'
                rel='noreferrer noopener'
                className='px-4 py-1.5 my-px bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-primary focus:outline-none focus:bg-secondary focus:text-primary'
              >
                Join Us
              </a>
            </SignedOut>
          </div>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel
            static
            as='nav'
            className='flex flex-col mt-3 space-y-2 ml-11 md:hidden max-w-min'
          >
            {links.map(({ isExternal, text, href }) => (
              <Fragment key={text}>
                {isExternal ? (
                  <a
                    href={href}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='p-1 align-text-bottom text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-primary'
                    data-cy={`nav-${text}`}
                  >
                    {text}
                  </a>
                ) : (
                  <Link href={href} passHref>
                    <a
                      className='p-1 align-text-bottom text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-primary'
                      data-cy={`nav-${text}`}
                    >
                      {text}
                    </a>
                  </Link>
                )}
              </Fragment>
            ))}
          </Popover.Panel>
        </Transition>
      </div>
    )}
  </Popover>
)

interface HeaderItem {
  href: string
  text: string
  isExternal?: boolean
}

export default Header
