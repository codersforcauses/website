import * as React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import type { Route } from "next"
import { AnimatePresence, motion } from "motion/react"

import { Button, buttonVariants } from "~/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/ui/dropdown-menu"
import { Skeleton } from "~/ui/skeleton"
import UserButton from "./user"

const ThemeSwitcher = dynamic(() => import("./theme"), {
  ssr: false,
  loading: () => (
    <Button variant="ghost-dark" size="icon">
      <span className="size-4 bg-muted-dark" />
    </Button>
  ),
})

const MotionButton = motion.create(Button)

interface HeaderProps {
  ref: React.Ref<HTMLElement>
  inView: boolean
}

interface HeaderItem {
  href: Route
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
      <Link
        href="#main"
        className={buttonVariants({
          variant: "dark",
          className: "absolute top-0 left-0 z-50 -translate-y-full transform transition focus:translate-y-0",
        })}
      >
        Skip to content
      </Link>
      <header className="fixed inset-x-0 top-2 z-10 container mx-auto flex items-center justify-between px-4 text-foreground-dark">
        <Link
          href="/"
          className={buttonVariants({
            variant: "ghost-dark",
            className: "size-11! p-0 font-mono text-base font-medium bg-black hover:bg-white hover:text-black!",
          })}
        >
          cfc
        </Link>
        <div className="flex gap-x-2">
          <React.Suspense
            fallback={
              <>
                <ThemeSwitcher />
                <Skeleton className="h-9 w-24 bg-muted-dark" />
              </>
            }
          >
            <UserButton />
          </React.Suspense>
          <DropdownMenu>
            <AnimatePresence initial={false}>
              {!inView && (
                <DropdownMenuTrigger
                  render={
                    <MotionButton
                      aria-label="menu"
                      variant="ghost-dark"
                      size="icon"
                      initial={{ x: 0, width: 36 }}
                      animate={{ x: 0, width: 36 }}
                      exit={{ x: 36, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-black"
                    >
                      <span aria-hidden className="material-symbols-sharp text-base! leading-none!">
                        menu
                      </span>
                    </MotionButton>
                  }
                />
              )}
            </AnimatePresence>
            <DropdownMenuContent variant="dark" align="end">
              {links.map(({ text, href, isExternal = false }) => (
                <DropdownMenuItem
                  key={text}
                  render={
                    <Link href={href} target={isExternal ? "_blank" : undefined}>
                      {text}
                    </Link>
                  }
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <nav ref={ref} className="absolute inset-x-0 top-3 container mx-auto hidden px-4 md:flex md:items-center">
        <div className="relative z-20 ml-16 flex gap-x-2">
          {links.map(({ text, href, isExternal = false }) => (
            <Link
              key={text}
              href={href}
              target={isExternal ? "_blank" : undefined}
              className={buttonVariants({
                variant: "link-dark",
              })}
            >
              {text}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
