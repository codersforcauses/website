import React from 'react'
import Link from 'next/link'
import NavLink from 'reactstrap/lib/NavLink'

export default function (props: Props) {
  const { href, text } = props
  return (
    <span className='header-link'>
      {style}
      <Link href={href}>
        <NavLink>{text}</NavLink>
      </Link>
    </span>
  )
}

const style = (
  <style jsx>{`
    a.header-link {
      color: #ffffff;
    }
  `}</style>
)

interface Props {
  href: string
  text: string
}
