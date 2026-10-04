import Link from "next/link"
import Image from "next/image"

import clients from "~/data/clients.json"
import { cn } from "~/lib/utils"
import { buttonVariants } from "~/ui/button"
import { TypingText } from "~/ui/typing-text"
import { InfiniteSlider } from "~/ui/infinite-slider"
import JoinUs from "./join-us"
import Contact from "./contact"

export default function Home() {
  return (
    <main id="main" className="bg-background">
      <section className="bg-black text-foreground-dark">
        <div className="container mx-auto grid gap-x-20 px-4 pt-28 pb-12 sm:grid-cols-2 md:py-36 lg:gap-x-32">
          <div className="space-y-4">
            <h1 className="scroll-m-20 font-mono text-4xl font-extrabold tracking-tight text-balance text-white">
              We are developers.
            </h1>
            <p className="text-lg leading-normal text-pretty">
              Coders for Causes are a group of developers that empower charities and non-profit organizations by
              providing them solutions to their technical problems. We are student powered and all of our members are
              volunteers dedicated to providing you the best results.
            </p>
            <div className="grid grid-cols-2 gap-2 font-semibold sm:gap-4">
              <JoinUs />
              <Link
                href="#contact_us"
                className={cn(buttonVariants({ variant: "outline-dark", size: "lg" }), "sm:text-lg")}
              >
                Work with us
              </Link>
            </div>
          </div>
          <div aria-hidden className="hidden border border-border-dark p-4 font-mono select-none sm:block">
            <p className="flex items-center gap-x-2">
              <span className="text-accented">$</span>
              <TypingText
                // todo: change text
                text={[
                  'echo "./Innovation with a mission"',
                  "Programming with purpose",
                  "Do good. Write code",
                  "Made with code",
                  "Made with ❤",
                  "#include git.c",
                  "yarn add codersforcauses",
                  "sudo rm -rf /",
                ]}
              />
            </p>
          </div>
        </div>
      </section>
      <section className="relative bg-primary-foreground py-12 select-none">
        <p className="sr-only">Our past clients</p>
        <InfiniteSlider speed={64} speedOnHover={32} gap={40}>
          {clients.map((client) => (
            <Image
              key={client.name}
              src={client.logo}
              alt={`${client.name} logo`}
              title={client.name}
              width={client.width}
              height={100}
              className="brightness-110 contrast-50 grayscale dark:brightness-150"
            />
          ))}
        </InfiniteSlider>
      </section>
      {/* TODO: Add section */}
      <section className="container mx-auto px-4">hello</section>

      <section id="contact_us" className="scroll-mt-16 bg-black py-12 text-foreground-dark md:py-24">
        <div className="container mx-auto justify-between gap-4 px-4 md:flex">
          <div className="grid gap-4">
            <p className="-ml-1 font-mono text-5xl md:-ml-1.5 md:text-7xl">Let&apos;s talk.</p>
            <a
              href="mailto:hello@codersforcauses.org"
              className={cn(
                buttonVariants({ variant: "link-dark", size: "xs" }),
                "-ml-2 h-auto w-fit font-mono text-lg md:text-3xl",
              )}
            >
              hello@codersforcauses.org
            </a>
            <Contact />
          </div>
          <div aria-hidden className="group hidden font-mono text-9xl select-none md:block">
            <span className="group-hover:hidden">:)</span>
            <span className="hidden group-hover:block">;)</span>
          </div>
        </div>
      </section>
    </main>
  )
}
