import Image from "next/image"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"

export default function RubricAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="rubric">
        <AccordionTrigger className="px-4 border-2">
          <h2 className="text-xl font-semibold"> Rubric</h2>
        </AccordionTrigger>
        <AccordionContent>
          <Image src="/events/hack_for_homes_2025_rubric.png" alt="Rubric Image" height={500} width={800} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
