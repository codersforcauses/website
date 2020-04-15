import React from 'react'
import Link from 'next/link'
import NavLink from 'reactstrap/lib/NavLink'

export default ({ href, text }: Props) => (
  <>
    {style}
    <Link href={href}>
      <NavLink className='header-link' data-tid={`nav-${text}`}>
        {text}
      </NavLink>
    </Link>
  </>
)

const style = (
  <style jsx>{`
    .navbar-dark .navbar-nav .nav-link,
    a.header-link {
      color: #ffffff;
      cursor: pointer;
    }
  `}
  </style>
)

interface Props {
  href: string
  text: string
}
