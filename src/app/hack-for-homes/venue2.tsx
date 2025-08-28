import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Separator } from "~/components/ui/separator"

export default function VenueAccordion() {
  return (
    <div className="w-full flex-row items-center">
      <h2 className="text-2xl font-semibold pb-4"> Venue Information</h2>
      <div className="space-y-4 pl-10">
        <Alert>
          <AlertTitle>Visitor Info Package</AlertTitle>
          <AlertDescription>
            For directions, parking, and venue details, please see the full Visitor Info Package.
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
              Outside these times, someone inside must press the green button to let you back in. Please coordinate with
              your team or a CFC organiser if you plan to leave and return after these windows.
            </li>
          </ul>
        </div>
        <Separator />
        <div>
          <strong>Bloom Ideas Hub</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Available until 9–10pm each night.</li>
            <li>
              Please be mindful of noise levels in the evenings as is it a shared workspace with active bloom employees!
            </li>
          </ul>
        </div>
        <Separator />
        <div>
          <strong>Support</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              The Residential Assistant on Duty is available via Reception (Stirling Highway entrance). They are trained
              to assist with any facility issues and we encourage you to go here if you need anything related to the
              venue.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
