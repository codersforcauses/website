"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

import { Button } from "~/components/ui/button"

import Clients from "./clients"
import Committee from "./committee"
import Sponsors from "./sponsors"

const Map = dynamic(() => import("~/app/about/map"), { ssr: false })

export default function About() {
  const router = useRouter()
  return (
    <>
      <div className="relative text-primary dark:bg-alt-dark dark:text-primary">
        <div className="container grid gap-4 py-12 md:py-16 lg:grid-cols-2">
          <div id="_what_we_do" className="space-y-2">
            <h2 className="mb-4 font-mono text-3xl font-black">We build software for charities</h2>
            <p className="text-lg">
              Coders for Causes is a not for profit organization that empowers charities and other not for profit
              organizations by connecting them with university students to develop technical solutions. We are a
              student-run club based in Perth, Western Australia with a wide range of clients.
            </p>
          </div>
          <div id="_map" className="h-64 w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
            <Map />
          </div>
        </div>
      </div>

      <div id="_meet_the_team" className="bg-alt-light py-12 text-primary dark:bg-black dark:text-white md:py-16">
        <div className="container mx-auto">
          <h3 className="mb-4 font-mono text-2xl font-bold">Committee</h3>
          <Committee />
        </div>
      </div>

      <div className="bg-secondary bg-white py-6 text-primary dark:bg-alt-dark dark:text-secondary md:py-12 ">
        <div className="container mx-auto space-y-12">
          <h3 className="font-mono text-2xl font-black dark:text-white">Past Clients</h3>
          <Clients />
          <h3 className="font-mono text-2xl font-black dark:text-white">Proudly Supported By</h3>
          <Sponsors />
          <div className="flex justify-center">
            <Button className="text-md" size="lg" onClick={() => router.push("/sponsor-us")}>
              Sponsor us
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
