"use client"

import { link } from "fs"
import Link from "next/link"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"

export default function VenueAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="venue">
      <AccordionItem value="venue">
        <AccordionTrigger className="px-4 border-2">
          <h2 className="text-xl font-semibold"> Venue Information</h2>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pl-10">
            <Alert>
              <AlertTitle>Visitor Info Package</AlertTitle>
              <AlertDescription>
                For directions, parking, and venue details, please see the full{" "}
                <Button type="button" variant="link" className="h-auto p-0 text-current underline" asChild>
                  <Link
                    href="https://www.canva.com/design/DAFIJy6uVPo/a0zO1yY6Vp9xOHvCoiq2fA/view?utm_content=DAFIJy6uVPo&utm_campaign=designshare&utm_medium=link2&utm_source=chatgpt.com&utlId=h3d9962a557"
                    target="_blank"
                  >
                    Visitor Info Package
                  </Link>
                </Button>
              </AlertDescription>
            </Alert>
            <Separator />
            <div>
              <strong>Access & Entrance</strong>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  As St Catherine’s is a residential college, the doors require swipe card access outside office hours.
                </li>
                <li>
                  Extended access windows have been arranged:
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Friday: 8am – 5pm</li>
                    <li>Saturday–Sunday: 8am – 12pm</li>
                  </ul>
                </li>
                <li>
                  Outside these times, someone inside must press the green button to let you back in. Please coordinate
                  with your team or a CFC organiser if you plan to leave and return after these windows.
                </li>
              </ul>
            </div>
            <Separator />
            <div>
              <strong>Bloom Ideas Hub</strong>
              <ul className="list-disc pl-5 space-y-1">
                <li>Available until 9–10pm each night.</li>
                <li>
                  Please be mindful of noise levels in the evenings as is it a shared workspace with active bloom
                  employees!
                </li>
              </ul>
            </div>
            <Separator />
            <div>
              <strong>Support</strong>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  The Residential Assistant on Duty is available via Reception (Stirling Highway entrance). They are
                  trained to assist with any facility issues and we encourage you to go here if you need anything
                  related to the venue.
                </li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
