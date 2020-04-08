/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import Link from 'next/link'
import NavLink from 'reactstrap/lib/NavLink'
import { style } from './style'

const HeaderLink = ({ href, text, ...props }: Props) => (
  <span css={style(props.theme)}>
    <Link href={href}>
      <NavLink className='header-link' data-tid={`nav-${text}`}>
        {text}
      </NavLink>
    </Link>
  </span>
)

interface Props {
  href: string
  text: string
  theme: Object
}

export default withTheme(HeaderLink)
