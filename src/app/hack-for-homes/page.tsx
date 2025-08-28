import Image from "next/image"
import Link from "next/link"

import { Button } from "~/components/ui/button"

import GuidingQuestionsAccordion from "./guiding-qs"
import ResourcesAccordion from "./resources"
import VenueAccordion from "./venue2"

export default function Itinerary() {
  return (
    <>
      <div className="relative text-primary dark:bg-alt-dark dark:text-primary">
        <div className="container grid gap-4 py-12 md:py-16 lg:grid-cols-2">
          <div id="_what_we_do" className="space-y-2">
            <h2 className="mb-4 font-mono text-3xl font-black">Problem Statement</h2>
            <p className="text-lg">
              How can we improve housing accessibility and living conditions for Western Australians struggling to find
              affordable, safe, and stable housing during the current housing crisis?
            </p>
            <div className="flex pl-5 space-x-5 pt-4">
              <Button>
                <Link href="/hack-for-homes/agenda">
                  <p className="text-black hover:underline">Agenda</p>
                </Link>
              </Button>
              <Button>
                <Link href="/hack-for-homes/participants">
                  <p className="text-black hover:underline">Participants</p>
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative h-full w-full max-w-lg">
            <Image alt="Hackathon Poster" fill className="object-contain" src="/events/img_792.png" />
          </div>
        </div>
      </div>
      <div className="container w-full flex flex-col items-start justify-start py-8">
        <VenueAccordion />
        <div className="py-8 w-full">
          <GuidingQuestionsAccordion />
          <ResourcesAccordion />
        </div>
      </div>
      <div className="bg-secondary bg-white py-6 text-primary dark:bg-alt-dark dark:text-secondary md:py-12 ">
        <div className="container mx-auto space-y-12">
          <h3 className="font-mono text-2xl font-black dark:text-white">Past Clients</h3>
          <h3 className="font-mono text-2xl font-black dark:text-white">Proudly Supported By</h3>
        </div>
      </div>
    </>
  )
}
