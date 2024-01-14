import Link from "next/link"
import Image from "next/image"

import Contact from "~/components/contact"
import { Button } from "~/components/ui/button"
import { Collapsible, CollapsibleTrigger } from "~/components/ui/collapsible"
import TypedText from "./_components/typed-text"

const services = [
  {
    icon: "devices",
    title: "Applications",
    description:
      "Build custom web and mobile applications to engage with your audience",
  },
  {
    icon: "web",
    title: "Websites",
    description:
      "Build new websites or optimize existing pages to improve online visibility",
  },
  {
    icon: "storage",
    title: "Data Storage",
    description:
      "Design and create databases for efficient information storage and retrieval",
  },
  {
    icon: "how_to_reg",
    title: "Consulting",
    description:
      "Empower your organization through technical knowledge and advice",
  },
]

const clients = [
  {
    src: "/clients/foodbank_logo.svg",
    alt: "Foodbank WA logo",
    width: 140,
    // className: "w-[140]",
  },
  {
    src: "/clients/wais_logo.svg",
    alt: "WAIS logo",
    width: 250,
    // className: "w-[250]",
  },
  {
    src: "/clients/anglicare_logo.svg",
    alt: "Anglicare WA logo",
    width: 100,
    // className: "w-[100]",
  },
  {
    src: "/clients/fog_logo.svg",
    alt: "Friends of Grounds logo",
    width: 180,
    // className: "w-[180]",
  },
  {
    src: "/clients/ignite_logo.svg",
    alt: "Ignite logo",
    width: 100,
    // className: "w-[100]",
  },
  {
    src: "/clients/p2s_logo.svg",
    alt: "P2S RugbyWorks logo",
    width: 200,
    // className: "w-[200]",
  },
]

const width = clients.reduce(
  (val, { width }) => val + width,
  clients.length * 16 * 6,
)

export default async function Home() {
  return (
    <main>
      <div className="bg-black text-white">
        <div className="container grid gap-20 pb-12 pt-28 sm:grid-cols-2 md:py-36">
          <div className="space-y-4">
            <h1 className="font-mono text-4xl font-bold">We are developers.</h1>
            <p className="text-lg">
              Coders for Causes are a group of developers that empower charities
              and non-profit organizations by providing them solutions to their
              technical problems. We are student powered and all of our members
              are volunteers dedicated to providing you the best results.
            </p>
            <div className="grid grid-cols-2 gap-2 font-semibold sm:gap-4">
              <Button variant="dark" size="lg" className="sm:text-lg">
                <Link href="/join">Join us</Link>
              </Button>
              <Button
                asChild
                variant="outline-dark"
                size="lg"
                className="w-full sm:text-lg"
              >
                <Link href="#contact">Work with us</Link>
              </Button>
            </div>
          </div>
          <div
            aria-hidden
            className="hidden select-none border border-white p-4 sm:block"
          >
            <p>
              <span className="text-white">$</span>
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
      <div className="w-screen select-none overflow-hidden bg-neutral-200 py-12 dark:bg-neutral-900">
        <div className="flex animate-slide" style={{ width: width * 2 }}>
          {[1, 2].map((count) => (
            <div key={count} className="flex gap-x-24" style={{ width }}>
              {clients.map(({ alt, ...client }) => (
                <div key={alt} className={`h-[100px]`}>
                  <Image
                    {...client}
                    alt={alt}
                    title={alt}
                    height={100}
                    className=" brightness-110 contrast-[0.2] grayscale transition duration-300"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="py-12 dark:bg-alt-dark dark:text-white md:py-24">
        <div className="container grid grid-cols-1 grid-rows-4 gap-8 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
          {services.map((service) => (
            <div key={service.icon} className="px-0 text-center">
              <span
                aria-hidden
                className="material-symbols-sharp select-none text-7xl"
              >
                {service.icon}
              </span>
              <p className="mb-2 mt-4 font-mono text-2xl font-black">
                {service.title}
              </p>
              <p className="mb-0">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        id="contact"
        className="scroll-mt-16 bg-black py-12 text-white md:py-24"
      >
        <div className="container flex gap-4">
          <div className="flex flex-grow flex-col gap-4">
            <p className="font-mono text-7xl">Let's talk.</p>
            <div>
              <a
                href="mailto:hello@codersforcauses.org"
                className="font-mono text-lg hover:underline md:text-3xl"
              >
                hello@codersforcauses.org
              </a>
            </div>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="outline-dark">Contact us</Button>
              </CollapsibleTrigger>
              <Contact />
            </Collapsible>
          </div>
          <div
            aria-hidden
            className="group hidden select-none font-mono text-9xl md:block"
          >
            <span className="group-hover:hidden">:)</span>
            <span className="hidden group-hover:block">;)</span>
          </div>
        </div>
      </div>
    </main>
  )
}
