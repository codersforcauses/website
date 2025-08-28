"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"

export default function ResourcesAccordion() {
  return (
    <div className="w-full flex items-center ">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="resources">
          <AccordionTrigger className="pl-2">
            <h2 className="text-xl font-semibold">Resources For Inspiration</h2>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc space-y-2 pl-10">
              <li>
                <a
                  href="https://www.wa.gov.au/government/document-collections/wa-housing-strategy-2020-2030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  WA Government Housing Strategy 2023–2030
                </a>
              </li>
              <li>
                <a
                  href="https://www.shelterwa.org.au/policy-and-advocacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  Shelter WA – Policy and Advocacy
                </a>
              </li>
              <li>
                <a
                  href="https://www.ahuri.edu.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  AHURI – Australian Housing and Urban Research Institute
                </a>
              </li>
              <li>
                <a
                  href="https://www.anglicare.asn.au/publications/rental-affordability-snapshot/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  Anglicare Rental Affordability Snapshot
                </a>
              </li>
              <li>
                <a
                  href="https://www.missionaustralia.com.au/what-we-do/housing-and-homelessness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  Mission Australia – Housing & Homelessness Programs
                </a>
              </li>
              <li>
                <a
                  href="https://www.nhfic.gov.au/research/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  National Housing Finance and Investment Corporation – Research & Insights
                </a>
              </li>
              <li>
                <a
                  href="https://www.abc.net.au/news/topic/housing-crisis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  ABC News – Housing Crisis Coverage
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
