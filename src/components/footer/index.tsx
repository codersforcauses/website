import Link from "next/link"
import Image from "next/image"
import { siDiscord, siFacebook, siGithub, siInstagram, siLinkedin, siX } from "simple-icons"

import { Button } from "~/components/ui/button"
import { Dialog, DialogTrigger } from "~/components/ui/dialog"
import ConstitutionModal from "./constitution-modal"

const aboutLinks = [
  {
    href: "/about#_what_we_do",
    text: "What we do",
  },
  {
    href: "/about#_meet_the_team",
    text: "Meet the team",
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

const projectLinks = [
  { href: "/projects", text: "Our services" },
  { href: "/projects", text: "Previous projects" },
  { href: "/faq", text: "FAQ" },
]

const eventLinks = [
  { href: "/events?type=upcoming", text: "Upcoming events" },
  { href: "/events?type=past", text: "Past events" },
]

const socialLinks = [
  {
    href: "",
    path: siGithub.path,
    title: siGithub.title,
  },
  {
    href: "",
    path: siDiscord.path,
    title: siDiscord.title,
  },
  {
    href: "",
    path: siFacebook.path,
    title: siFacebook.title,
  },
  {
    href: "",
    path: siLinkedin.path,
    title: siLinkedin.title,
  },
  {
    href: "",
    path: siX.path,
    title: siX.title,
  },
  {
    href: "",
    path: siInstagram.path,
    title: siInstagram.title,
  },
]

const Footer = () => {
  return (
    <footer className="bg-black py-6 text-white">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-5">
          <div className="col-span-2 flex flex-col md:col-span-1">
            <div className="relative h-full min-h-[80px] flex-grow select-none">
              <Image
                fill
                src="/logo/cfc_logo_white_full.svg"
                alt="Coders for Causes logo"
                className="!w-auto object-top md:!h-auto"
              />
            </div>
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
                  <DialogTrigger asChild>
                    <Button variant="link-dark" className="h-auto px-0">
                      Constitution
                    </Button>
                  </DialogTrigger>
                  <ConstitutionModal />
                </Dialog>
              </li>
              <li>
                <Button variant="link-dark" className="h-auto px-0">
                  Terms
                </Button>
              </li>
              <li>
                <Button variant="link-dark" className="h-auto px-0">
                  Privacy
                </Button>
              </li>
              <li>
                <Button variant="link-dark" className="h-auto px-0">
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
                    <Link href={href}>
                      <Button variant="link-dark" className="h-auto px-0">
                        {text}
                      </Button>
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
                  <Link href={href}>
                    <Button variant="link-dark" className="h-auto px-0">
                      {text}
                    </Button>
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
                  <Link href={href}>
                    <Button variant="link-dark" className="h-auto px-0">
                      {text}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 items-center justify-between gap-1 sm:flex">
          <p className="font-mono text-xs">&copy; {new Date().getFullYear()} Coders for Causes</p>
          <div className="grid grid-cols-6 justify-between gap-1">
            {socialLinks.map(({ href, title, path }) => (
              <Button asChild key={title} variant="ghost-dark" size="icon">
                <a href={href}>
                  <svg role="img" viewBox="0 0 24 24" height={24} width={24} className="fill-current">
                    <title>{title}</title>
                    <path d={path} />
                  </svg>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
