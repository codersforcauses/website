import { useTheme } from 'emotion-theming'
import Link from 'next/link'
import NavLink from 'reactstrap/lib/NavLink'
import { styles } from './styles'

const HeaderLink = ({ href, text, isExternal }: Props) => {
  const theme = useTheme()

  return (
    <span css={styles(theme)}>
      {isExternal ? (
        <a
          href={href}
          target='_blank'
          rel='noreferrer noopener'
          className='header-link p-0 m-2 my-md-0 nav-link'
          data-cy={`nav-${text}`}
        >
          {text}
        </a>
      ) : (
        <Link href={href}>
          <NavLink
            className='header-link p-0 m-2 my-md-0 '
            data-cy={`nav-${text}`}
          >
            {text}
          </NavLink>
        </Link>
      )}
    </span>
  )
}

interface Props {
  href: string
  text: string
  isExternal?: boolean
}

export default HeaderLink
