import Link from "next/link"

import { Button } from "~/components/ui/button"
import ThemeSwitcher from "./theme"
import UserButton from "./user"

interface HeaderItem {
  href: string
  text: string
  isExternal?: boolean
}

const links: Array<HeaderItem> = [
  { href: "/about", text: "About" },
  { href: "/projects", text: "Projects" },
  { href: "/events", text: "Events" },
  {
    href: "https://guides.codersforcauses.org/",
    text: "Guides",
    isExternal: true,
  },
]

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-black py-3">
      <div className="container flex items-center justify-between">
        <nav className="flex">
          <Button variant="ghost-dark" size="icon" className="sm:hidden">
            <span className="material-symbols-sharp">menu</span>
          </Button>
          <Button
            asChild
            size="icon"
            variant="ghost-dark"
            className="flex self-baseline font-mono text-lg hover:bg-white hover:text-black"
          >
            <Link href="/">cfc</Link>
          </Button>
          <ul className="hidden sm:ml-4 sm:flex sm:items-baseline sm:justify-between">
            {links.map(({ text, href }) => (
              <li key={text}>
                <Button asChild variant="link-dark">
                  <Link href={href}>{text}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-2">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </div>
    </header>
  )
}

export default Header
