import Link from 'next/link'

const HeaderLink = ({ href, text, isExternal }: HeaderItem) => (
  <>
    {isExternal ? (
      <a
        href={href}
        target='_blank'
        rel='noreferrer noopener'
        className='inline-block align-text-bottom text-secondary'
        data-cy={`nav-${text}`}
      >
        {text}
      </a>
    ) : (
      <Link href={href} passHref>
        <a
          className='inline-block align-text-bottom text-secondary'
          data-cy={`nav-${text}`}
        >
          {text}
        </a>
      </Link>
    )}
  </>
)

export interface HeaderItem {
  href: string
  text: string
  isExternal?: boolean
}

export default HeaderLink
