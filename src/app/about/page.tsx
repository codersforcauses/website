"use client"

import dynamic from "next/dynamic"
import Clients from "../_components/clients/page"
import Committee from "../_components/committee/page"
import Sponsors from "../_components/sponsors"

const Map = dynamic(() => import("~/components/map"), { ssr: false })

export default function About() {
  return (
    <>
      <div className="container my-6 md:grid md:grid-cols-2 md:space-x-6">
        <div id="_what_we_do" className="space-y-2">
          <h2 className="font-mono text-3xl font-black">We build software for charities</h2>
          <p>
            Coders for Causes is a not for profit organisation that empowers charities and other not for profit
            organisations by connecting them with university students to develop technical solutions. We are a
            student-run club based in Perth, Western Australia with a wide range of clients.
          </p>
        </div>
        <div id="_map" className="h-64 w-full">
          <Map />
        </div>
      </div>

      <div id="_meet_the_team" className="bg-alt-light py-12 text-primary dark:bg-alt-dark dark:text-white md:py-24">
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
        </div>
      </div>
    </>
  )
}
