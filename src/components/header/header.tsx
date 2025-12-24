import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import UserButton from "./user"

const MotionButton = motion.create(Button)

interface HeaderProps {
  ref: React.Ref<HTMLElement>
  inView: boolean
}

interface HeaderItem {
  href: string
  text: string
  isExternal?: boolean
}

const links: HeaderItem[] = [
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

export default function HeaderServer({ ref, inView }: HeaderProps) {
  return (
    <>
      <Button
        asChild
        variant="dark"
        className="absolute top-0 left-0 z-50 -translate-y-full transform transition focus:translate-y-0"
      >
        <Link href="#main">Skip to content</Link>
      </Button>
      <header className="fixed inset-x-0 top-2 z-10 container mx-auto flex items-center justify-between px-4 text-neutral-50">
        <div className="bg-black p-0.5">
          <Button
            asChild
            variant="ghost-dark"
            className="aspect-square size-11 p-0 font-mono text-base hover:bg-white hover:text-black focus-visible:ring-white/20"
          >
            <Link href="/">cfc</Link>
          </Button>
        </div>
        <div className="flex gap-x-2">
          <UserButton />
          <DropdownMenu>
            <AnimatePresence initial={false}>
              {!inView && (
                <DropdownMenuTrigger asChild>
                  <MotionButton
                    aria-label="menu"
                    variant="ghost-dark"
                    size="icon"
                    initial={{ x: 0, width: 36 }}
                    animate={{ x: 0, width: 36 }}
                    exit={{ x: 36, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-black focus-visible:ring-white/20"
                  >
                    <span aria-hidden className="material-symbols-sharp text-base! leading-none!">
                      menu
                    </span>
                  </MotionButton>
                </DropdownMenuTrigger>
              )}
            </AnimatePresence>
            <DropdownMenuContent variant="dark" align="end">
              {links.map(({ text, href, isExternal = false }) => (
                <DropdownMenuItem asChild key={text}>
                  <Link href={href} target={isExternal ? "_blank" : undefined}>
                    {text}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <nav ref={ref} className="relative top-2 container mx-auto hidden h-12 items-center px-4 md:flex">
        <div className="relative z-20 ml-16 flex gap-x-2">
          {links.map(({ text, href, isExternal = false }) => (
            <Button asChild key={text} variant="link-dark">
              <Link href={href} target={isExternal ? "_blank" : undefined}>
                {text}
              </Link>
            </Button>
          ))}
        </div>
      </nav>
    </>
  )
}
