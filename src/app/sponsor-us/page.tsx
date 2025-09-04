import Link from "next/link"

import { Button } from "~/components/ui/button"

import Sponsors from "../about/sponsors"

const numberList = [
  { label: "Events", value: "100+" },
  { label: "Projects", value: "14+" },
  { label: "Volunteers", value: "500+" },
]

export default function Sponsor() {
  return (
    <div>
      <div className="relative h-[500px] w-full ">
        <div className="bgImage absolute inset-0" aria-hidden="true">
          Industry night image
        </div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-8">
          <h2 className="mb-4 font-mono text-4xl font-black text-white">CALL FOR SPONSORS</h2>
          <p className="text-2xl text-white">
            Coders for Causes simply isn&apos;t possible without the support of our sponsors.
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-100 p-8 shadow-lg dark:bg-alt-dark lg:px-8">
        <p className="text-lg">
          Coders for Causes (CFC) is a pivotal student-run non-profit organization at the University of Western
          Australia. We are dedicated to bridging the gap between computing students and the tech industry, while
          providing digital solutions for non-profit organizations.
        </p>
        <p className="text-lg">
          We would be thrilled to have your support! Your generous sponsorship can help us make a bigger impact and
          achieve even more. Sponsors can expect significant exposure, direct access to top-tier talent, and the
          opportunity to make a genuine social impact.
        </p>
      </div>
      <div className="mt-12 mb-16">
        <div className="flex h-full w-full place-content-evenly items-center gap-4">
          {numberList.map((item) => (
            <div className="text-center w-[88px]" key={item.label}>
              <p className="text-2xl font-semibold">{item.value}</p>
              <p className="text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto space-y-12">
        <h3 className="font-mono text-2xl font-black text-primary">Proudly Supported By</h3>
        <Sponsors />
        <div className="flex justify-center pb-12">
          <Link href="/#_contact_us">
            <Button className="text-md" size="lg">
              Contact us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
