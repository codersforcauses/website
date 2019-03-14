import React from 'react'
import Link from 'next/link'
import NavLink from 'reactstrap/lib/NavLink'

export default function (props: Props) {
  const { href, text } = props
  return (
    <span>
      {style}
      <Link href={href}>
        <NavLink className='header-link'>{text}</NavLink>
      </Link>
    </span>
  )
}

const style = (
  <style jsx>{`
    a.header-link {
      color: #ffffff;
      cursor: pointer;
    }
  `}</style>
)

interface Props {
  href: string
  text: string
}
