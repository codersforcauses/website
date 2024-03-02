import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

import { Button } from "~/components/ui/button"
import TypedText from "./_components/typed-text"
import BentoDisplay from "~/components/bento"
import JoinUs from "./join-us"
const Contact = dynamic(() => import("../components/contact"), {
  ssr: false,
  loading: () => <Button variant="outline-dark">Contact us</Button>,
})

const clients = [
  {
    src: "/clients/foodbank_logo.svg",
    alt: "Foodbank WA logo",
    width: 140,
  },
  {
    src: "/clients/wais_logo.svg",
    alt: "WAIS logo",
    width: 250,
  },
  {
    src: "/clients/anglicare_logo.svg",
    alt: "Anglicare WA logo",
    width: 100,
  },
  {
    src: "/clients/fog_logo.svg",
    alt: "Friends of Grounds logo",
    width: 180,
  },
  {
    src: "/clients/ignite_logo.svg",
    alt: "Ignite logo",
    width: 100,
  },
  {
    src: "/clients/p2s_logo.svg",
    alt: "P2S RugbyWorks logo",
    width: 200,
  },
  {
    src: "/clients/poops_logo.svg",
    alt: "/clients/poops_logo_dark.svg",
    width: 150,
  },
  {
    src: "/clients/wadl_logo.svg",
    alt: "/clients/wadl_logo_light.svg",
    width: 150,
  },
  {
    src: "/clients/csf_logo_dark.svg",
    alt: "/clients/csf_logo.svg",
    width: 200,
  },
]

const width = clients.reduce((val, { width }) => val + width, clients.length * 16 * 6)

export default async function Home() {
  return (
    <main>
      <div className="bg-black text-white">
        <div className="container grid gap-20 pb-12 pt-28 sm:grid-cols-2 md:py-36">
          <div className="space-y-4">
            <h1 className="font-mono text-4xl font-bold">We are developers.</h1>
            <p className="text-pretty text-lg">
              Coders for Causes are a group of developers that empower charities and non-profit organizations by
              providing them solutions to their technical problems. We are student powered and all of our members are
              volunteers dedicated to providing you the best results.
            </p>
            <div className="grid grid-cols-2 gap-2 font-semibold sm:gap-4">
              <JoinUs />
              <Button asChild variant="outline-dark" size="lg" className="w-full sm:text-lg">
                <Link href="#contact">Work with us</Link>
              </Button>
            </div>
          </div>
          <div aria-hidden className="hidden select-none border border-white/25 p-4 font-mono sm:block">
            <p>
              <span className="text-white">$ </span>
              <TypedText
                text={[
                  'echo "./Innovation with a mission"',
                  "Programming with purpose",
                  "Do good. ^200Write code",
                  "Made with code",
                  "Made with ^500❤",
                  "#include git.c",
                  "yarn add codersforcauses",
                  "sudo rm -rf /",
                ]}
              />
            </p>
          </div>
        </div>
      </div>
      <div className="w-full select-none overflow-hidden bg-neutral-200 py-12 dark:bg-neutral-900">
        <div className="flex animate-slide" style={{ width: width * 2 }}>
          {[1, 2].map((count) => (
            <div key={count} className="flex gap-x-24" style={{ width }}>
              {clients.map(({ alt, ...client }) => (
                <div key={alt} className={`flex h-[100px] items-center`}>
                  <Image
                    {...client}
                    alt={alt}
                    title={alt}
                    height={100}
                    className="brightness-110 contrast-[0.2] grayscale transition duration-300"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="dark:bg-alt-dark">
        <div className="container mx-auto w-full px-8 py-16 dark:bg-alt-dark dark:text-white">
          <BentoDisplay />
        </div>
      </div>
      <div id="_contact_us" className="scroll-mt-16 bg-black py-12 text-white md:py-24">
        <div className="container flex gap-4">
          <div className="flex flex-grow flex-col gap-4">
            <p className="font-mono text-7xl">Let&apos;s talk.</p>
            <div>
              <a href="mailto:hello@codersforcauses.org" className="font-mono text-lg hover:underline md:text-3xl">
                hello@codersforcauses.org
              </a>
            </div>
            <Contact />
          </div>
          <div aria-hidden className="group hidden select-none font-mono text-9xl md:block">
            <span className="group-hover:hidden">:)</span>
            <span className="hidden group-hover:block">;)</span>
          </div>
        </div>
      </div>
    </main>
  )
}
