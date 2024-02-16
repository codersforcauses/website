import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import Link from "next/link"

const GeneralFAQ = [
  {
    description: "Who can sign up to be a CFC member?",
    answer:
      "Our membership is not limited to UWA students. Everyone with an interest in software development is welcome to join.",
  },
  {
    description: "How much does it cost to become a member?",
    answer:
      "Contact our friendly committee. You can do so on our Discord server. The fee for the year is $5. This is needed to participate in our projects and provides discounts for our paid events.",
  },
  {
    description: "What do you offer during semester?",
    answer: "We run technical workshops, social events and industry nights during semester.",
  },
]

const ProjectsFAQ = [
  {
    description: "Do projects run during semester as well?",
    answer:
      "Generally NO. But our projects are open source, so feel free to contribute whenever. If you need help getting started on a project, please reach out to our committee, we are happy to help.",
  },
  {
    description: "What stack do you normally use for your projects?",
    answer:
      "In the past, we've worked with Javascript, Typescript and Node.js. If a framework is used, it will likely be either Vue/Nuxt.js or React/Next.js and an Express backend. In future projects, the software used can change depending on requirements.",
  },
  {
    description: "Can I get credit from the university for the volunteer hours I contributed towards the project?",
    answer:
      "You certainly can, but only if you are a UWA student. During the project we will show you how to submit your hours to us for accreditation via Guild Volunteering.",
  },
  {
    description: "Should I apply if I don't have any experience with HTML/CSS/JS?",
    answer:
      "It's strongly recommended but not necessary. The reason for that is we work with technologies that build on top of those basic fundamentals. Without knowing the basics, it might be hard to grasp more difficult concepts. If you would like some guidance on where to start, head to the #coding-resources section on our Discord server!",
  },
  {
    description: "How many hours do I have to contribute per week towards the project?",
    answer:
      "This is completely up to you. We understand that people might be busy sometimes during the holidays and this is volunteer work, so we won't force people to commit to certain hours. However we will ask your availability during our applicant interview to get a rough idea, which helps us to plan and schedule our project resources and timeline.",
  },
  {
    description: "What exactly will be expected from me to participate in the projects?",
    answer:
      "The project group will meet at campus 2 times per week, depending on each group's availability. During this time, you can get help from your mentors, learn about technical details or work on the project with other members. We will also invite industry partners to give short talks/workshops to get you familiarised with industry software practice.",
  },
]

const QuickLinks = [
  {
    title: "Join our Discord Community",
    description: "Engage, learn, and share in our active Discord server.",
    href: "https://discord.codersforcauses.org/",
  },
  {
    title: "View our Past Projects",
    description: "Take a look at our completed projects.",
    href: "/projects",
  },
  {
    title: "Have a Question? Email Us!",
    description: "Need more help? Feel free to reach us with any questions you have.",
    href: "mailto:hello@codersforcauses.org",
  },
]

const FaqPage = () => {
  return (
    <div className="container flex flex-col py-12 md:flex-row md:space-x-12">
      <div className="space-y-6 md:w-2/3">
        <div>
          <h1 className="px-2 font-mono text-lg font-bold">General</h1>
          {GeneralFAQ.map((faq, idx) => (
            <Accordion type="multiple" key={idx} className="w-full">
              <AccordionItem value={`item-${idx}`}>
                <AccordionTrigger className="px-2 text-left transition-colors duration-300 hover:bg-slate-200 dark:hover:bg-neutral-800">
                  {faq.description}
                </AccordionTrigger>
                <AccordionContent className="px-2">{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        <div>
          <h1 className="px-2 px-2 font-mono text-lg font-bold">Projects</h1>
          {ProjectsFAQ.map((faq, idx) => (
            <Accordion type="multiple" key={idx} className="w-full">
              <AccordionItem value={`item-${idx}`}>
                <AccordionTrigger className="px-2 text-left transition-colors duration-300 hover:bg-slate-200 dark:hover:bg-neutral-800">
                  {faq.description}
                </AccordionTrigger>
                <AccordionContent className="px-2">{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
      <div className="space-y-4 pt-3 md:pt-0">
        <h1 className="font-mono text-lg font-bold">Quick Links</h1>
        <div className="flex flex-col space-y-2">
          {QuickLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="bg-gray-200 p-2 transition-colors duration-300 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-800/80"
            >
              <h3 className="font-semibold">{link.title}</h3>
              <p>{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FaqPage
