"use client"

import * as React from "react"
import Link from "next/link"
import type { Route } from "next"
import { siDiscord, siFacebook, siGithub, siInstagram, siLinkedin, siX } from "simple-icons"
import { usePrefetchQuery } from "@tanstack/react-query"

import { cn } from "~/lib/utils"
import { Button, buttonVariants } from "~/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/ui/dialog"
import ConstitutionModal, { constitutionUrl } from "./constitution"

interface Links {
  href: Route
  text: string
}

interface SocialLink {
  href: Route
  path: string
  title: string
}

const aboutLinks: Array<Links> = [
  {
    href: "/about#what_we_do",
    text: "What we do",
  },
  {
    href: "/about#committee",
    text: "The committee",
  },
  {
    href: "/branding",
    text: "Our branding",
  },
  {
    href: "/#_contact_us",
    text: "Contact us",
  },
]

const projectLinks: Array<Links> = [
  { href: "/projects", text: "Our services" },
  { href: "/projects", text: "Previous projects" },
  { href: "/faq", text: "FAQ" },
]

const eventLinks: Array<Links> = [
  { href: "/events?type=upcoming", text: "Upcoming events" },
  { href: "/events?type=past", text: "Past events" },
]

const socialLinks: Array<SocialLink> = [
  {
    href: "http://github.com/codersforcauses/",
    path: siGithub.path,
    title: siGithub.title,
  },
  {
    href: "https://discord.codersforcauses.org/",
    path: siDiscord.path,
    title: siDiscord.title,
  },
  {
    href: "https://www.facebook.com/codersforcauses",
    path: siFacebook.path,
    title: siFacebook.title,
  },
  {
    href: "https://www.linkedin.com/company/18611041/",
    path: siLinkedin.path,
    title: siLinkedin.title,
  },
  {
    href: "https://x.com/codersforcauses",
    path: siX.path,
    title: siX.title,
  },
  {
    href: "https://www.instagram.com/cfc_uwa",
    path: siInstagram.path,
    title: siInstagram.title,
  },
]

const currentYear = new Date().getFullYear()

export default function Footer() {
  usePrefetchQuery({
    queryKey: ["constitution"],
    queryFn: async () => {
      const response = await fetch(constitutionUrl)
      const md = await response.text()
      const lines = md.split("\n")
      return lines.slice(1).join("\n")
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  })
  return (
    <footer className="bg-black py-6 text-foreground-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-5">
          <div className="col-span-2 flex flex-col md:col-span-1">
            <svg viewBox="0 0 425 134.84" className="max-h-20 max-w-3xs select-none">
              <g className="fill-white">
                <rect x={0} y={0} width={270} height={70} />
                <rect x={0} y={65} width={425} height={70} />
              </g>
              <g transform="translate(4.3, 0)" className="fill-black font-mono text-[4.5em] font-medium">
                <text dy={56}>coders</text>
                <text dy={124}>for</text>
                <text dx={155} dy={124}>
                  causes
                </text>
              </g>
            </svg>
            <p className="m-0 font-mono">
              <small>Made with &#10084;</small>
              <small className="text-black"> by Jeremiah</small>
            </p>
          </div>
          <div className="">
            <p className="mb-4 font-mono text-xl">Legal</p>
            <ul>
              <li>
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button variant="link-dark" className="-ml-4 h-auto">
                        Constitution
                      </Button>
                    }
                  />
                  <DialogContent className="max-h-screen w-full overflow-hidden sm:max-h-[calc(95vh)] md:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Constitution</DialogTitle>
                    </DialogHeader>
                    <React.Suspense fallback={<p>Loading...</p>}>
                      <ConstitutionModal />
                    </React.Suspense>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Button variant="link-dark" className="-ml-4 h-auto">
                  Terms
                </Button>
              </li>
              <li>
                <Button variant="link-dark" className="-ml-4 h-auto">
                  Privacy
                </Button>
              </li>
              <li>
                <Button variant="link-dark" className="-ml-4 h-auto">
                  Security
                </Button>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="mb-4 font-mono text-xl">About us</p>
            <nav>
              <ul>
                {aboutLinks.map(({ href, text }) => (
                  <li key={text}>
                    <Link href={href} className={cn(buttonVariants({ variant: "link-dark" }), "-ml-4 h-auto")}>
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="">
            <p className="mb-4 font-mono text-xl">Projects</p>
            <ul>
              {projectLinks.map(({ href, text }) => (
                <li key={text}>
                  <Link href={href} className={cn(buttonVariants({ variant: "link-dark" }), "-ml-4 h-auto")}>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <p className="mb-4 font-mono text-xl">Events</p>
            <ul>
              {eventLinks.map(({ href, text }) => (
                <li key={text}>
                  <Link href={href} className={cn(buttonVariants({ variant: "link-dark" }), "-ml-4 h-auto")}>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 items-center justify-between gap-1 sm:flex">
          <p className="font-mono text-xs">&copy; {currentYear} Coders for Causes</p>
          <div className="grid grid-cols-6 justify-between gap-1">
            {socialLinks.map(({ href, title, path }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={title}
                className={buttonVariants({ variant: "ghost-dark", size: "icon" })}
              >
                <svg aria-hidden viewBox="0 0 24 24" height={16} width={16} className="fill-current">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
