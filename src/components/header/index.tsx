import Link from "next/link"

import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import ActionButtons from "./action-buttons"
import { Suspense } from "react"
import JoinButton from "./join-button"

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
  {
    href: "https://workshops.codersforcauses.org/",
    text: "Workshops",
    isExternal: true,
  },
]

const Header = () => {
  return (
    <header className="container fixed inset-x-0 top-2 z-30">
      <div className="-mx-1.5 flex items-center justify-between bg-black p-1.5">
        <nav className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost-dark" size="icon" className="mr-2 sm:hidden">
                <span className="material-symbols-sharp">menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="mt-1 w-screen border-none p-0.5">
              <div className="container px-6">
                <div className="border border-white/25 bg-black px-2 py-1 text-white">
                  {links.map(({ text, href, isExternal = false }) => (
                    <DropdownMenuItem asChild key={text} className="focus:bg-white/20 focus:text-white">
                      <Link href={href} target={isExternal ? "_blank" : undefined}>
                        {text}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            asChild
            size="icon"
            variant="ghost-dark"
            className="flex self-baseline font-mono text-lg hover:bg-white hover:text-black"
          >
            <Link href="/">cfc</Link>
          </Button>
          <ul className="hidden sm:ml-4 sm:flex sm:items-baseline sm:justify-between">
            {links.map(({ text, href, isExternal = false }) => (
              <li key={text}>
                <Button asChild variant="link-dark">
                  <Link href={href} target={isExternal ? "_blank" : undefined}>
                    {text}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <Suspense fallback={<JoinButton />}>
          <ActionButtons />
        </Suspense>
      </div>
    </header>
  )
}

export default Header
