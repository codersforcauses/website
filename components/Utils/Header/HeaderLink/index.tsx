import Link from 'next/link'

const HeaderLink = ({ href, text, isExternal }: HeaderItem) =>
  isExternal ? (
    <a
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      className='align-text-bottom text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
      data-cy={`nav-${text}`}
    >
      {text}
    </a>
  ) : (
    <Link href={href} passHref>
      <a
        className='align-text-bottom text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
        data-cy={`nav-${text}`}
      >
        {text}
      </a>
    </Link>
  )

export interface HeaderItem {
  href: string
  text: string
  isExternal?: boolean
}

export default HeaderLink
