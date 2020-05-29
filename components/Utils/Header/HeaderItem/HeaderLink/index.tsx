/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import Link from 'next/link'
import NavLink from 'reactstrap/lib/NavLink'
import { styles } from './styles'

const HeaderLink = ({ href, text }: Props) => {
  const theme = useTheme()

  return (
    <span css={styles(theme)}>
      <Link href={href}>
        <NavLink className='header-link' data-tid={`nav-${text}`}>
          {text}
        </NavLink>
      </Link>
    </span>
  )
}

interface Props {
  href: string
  text: string
}

export default HeaderLink
