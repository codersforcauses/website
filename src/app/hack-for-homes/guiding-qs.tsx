import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"

export default function GuidingQuestionsAccordion() {
  return (
    <div className="w-full flex items-center">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="guiding-questions">
          <AccordionTrigger className="pl-2">
            <h2 className="text-2xl font-semibold">Guiding Questions & Audiences</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pl-10">
              <div>
                <strong>Accessibility</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    How can tenants, especially those with limited English or digital literacy, easily find and
                    understand housing options and their rights?
                  </li>
                  <li>
                    What tools could help people compare housing options (private rentals, social housing, transitional
                    housing) in one place?
                  </li>
                  <li>
                    How might housing applications be simplified for people who face barriers like documentation
                    requirements or inconsistent internet access?
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <strong>Affordability</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    What shared or alternative ownership/renting models (e.g., co-housing, rent-to-own, community land
                    trusts) could be made more accessible through digital platforms?
                  </li>
                  <li>
                    How can technology support low-income renters in managing finances (e.g., rent tracking, budgeting,
                    rent assistance eligibility)?
                  </li>
                  <li>
                    What innovations could reduce hidden housing costs (utilities, maintenance, transport to
                    work/education hubs) for vulnerable groups?
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <strong>Quality of Living</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    How can renters report maintenance issues easily and ensure accountability from landlords or housing
                    providers?
                  </li>
                  <li>
                    What tools could empower tenants to make their housing more energy efficient, sustainable, and
                    cheaper to maintain?
                  </li>
                  <li>
                    How can housing be made safer for groups vulnerable to domestic violence, health risks, or unsafe
                    building standards?
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <strong>Crisis Response</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    How might emergency shelters or temporary accommodation providers connect more quickly with people
                    in need, in real time?
                  </li>
                  <li>
                    What systems could reduce the gap between applying for crisis housing and being placed into it?
                  </li>
                  <li>
                    How could technology help frontline workers (social workers, case managers, volunteers) coordinate
                    and share information across organisations?
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <strong>System Design</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    How can government, nonprofits, and private landlords share data more effectively while respecting
                    privacy?
                  </li>
                  <li>What digital platforms could make navigating housing support services less fragmented?</li>
                  <li>
                    How might mapping or predictive data tools help identify areas most at risk of homelessness or
                    housing stress?
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <span className="font-semibold">🎯 Pain Point Exploration Questions (market/user focus)</span>
                <ul className="list-disc pl-5 space-y-1">
                  <li>What are the most common frustrations renters face when searching for housing?</li>
                  <li>How do people currently find and apply for housing, and where do they get stuck?</li>
                  <li>Which groups are least served by current housing systems, and why?</li>
                  <li>What processes are still manual, paper-based, or fragmented that could be streamlined?</li>
                  <li>
                    Where is there mistrust or lack of transparency between landlords, tenants, and housing providers?
                  </li>
                  <li>
                    Which parts of the system have long waiting times, and how might those be reduced with technology?
                  </li>
                  <li>
                    What do vulnerable people sacrifice first (food, medicine, travel) when housing becomes
                    unaffordable?
                  </li>
                  <li>
                    What insights from housing providers and frontline workers could help us design more realistic
                    solutions?
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <strong>Possible Target Audiences</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Families facing rental stress</li>
                  <li>Students and young people seeking affordable housing</li>
                  <li>Older Australians at risk of homelessness</li>
                  <li>Migrants and refugees navigating complex housing systems</li>
                  <li>People with disabilities who require accessible housing</li>
                  <li>Regional and remote communities with limited supply</li>
                </ul>
              </div>
              <Separator />
              <div>
                <strong>Approach: Open-Ended, Prototype-Driven</strong>
                <p>
                  This hackathon is open-ended, you decide what “improving housing” means. Your solution could be an
                  app, a platform, a data tool, or even a community initiative.
                </p>
                <p>
                  We encourage prototypes (digital or physical) to showcase your vision. They don’t need to be perfect,
                  just enough to demonstrate your team’s ideas in action.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
