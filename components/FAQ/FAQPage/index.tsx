import { memo } from 'react'
import Title from '@components/Utils/Title'
import QuestionCard from '../QuestionCard'

const FAQList = [
  {
    description: 'Who can sign up to be a CFC member?',
    answer:
      'Our membership is not limited to UWA students. Everyone with an interest in software development is welcome to join.'
  },
  {
    description: 'How much does it cost to become a member?',
    answer:
      'Contact our friendly committee. You can do so on our Discord server. The fee for the year is $5. This is needed to participate in our projects and provides discounts for our paid events.'
  },
  {
    description: 'What do you offer during semester?',
    answer:
      'We run technical workshops, social events and industry nights during semester.'
  },
  {
    description: 'Do projects run during semester as well?',
    answer:
      'Generally NO. But our projects are open source, so feel free to contribute whenever. If you need help getting started on a project, please reach out to our committee, we are happy to help.'
  },
  {
    description: 'What stack do you normally use for your projects?',
    answer:
      "In the past, we've worked with Javascript, Typescript and Node.js. If a framework is used, it will likely be either Vue/Nuxt.js or React/Next.js and an Express backend. In future projects, the software used can change depending on requirements."
  },
  {
    description:
      'Can I get credit from the university for the volunteer hours I contributed towards the project?',
    answer:
      'You certainly can, but only if you are a UWA student. During the project we will show you how to submit your hours to us for accreditation via Guild Volunteering.'
  },
  {
    description:
      "Should I apply if I don't have any experience with HTML/CSS/JS?",
    answer:
      "It's strongly recommended but not necessary. The reason for that is we work with technologies that build on top of those basic fundamentals. Without knowing the basics, it might be hard to grasp more difficult concepts. If you would like some guidance on where to start, head to the <b class='px-1 font-mono text-sm bg-primary text-secondary dark:bg-secondary dark:text-primary'>#coding-resources</b> section on our Discord server!"
  },
  {
    description:
      'How many hours do I have to contribute per week towards the project?',
    answer:
      "This is completely up to you. We understand that people might be busy sometimes during the holidays and this is volunteer work, so we won't force people to commit to certain hours. However we will ask your availability during our applicant interview to get a rough idea, which helps us to plan and schedule our project resources and timeline."
  },
  {
    description:
      'What exactly will be expected from me to participate in the projects?',
    answer:
      "The project group will meet at campus 2 times per week, depending on each group's availability. During this time, you can get help from your mentors, learn about technical details or work on the project with other members. We will also invite industry partners to give short talks/workshops to get you familiarised with industry software practice."
  }
]

const FAQPage = () => (
  <>
    <Title typed>./frequently asked questions</Title>
    <div className='py-12 md:py-24 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
      <div className='container grid grid-cols-1 gap-6 px-3 mx-auto lg:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {FAQList.map((FAQ, idx) => (
          <QuestionCard {...FAQ} key={idx} />
        ))}
        <p className='mt-6 text-xl sm:col-span-2 lg:col-span-3'>
          Don&apos;t find what you are looking for? Find us on the{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href='https://discord.com/invite/zW3hjwY'
            className='hover:underline focus:outline-none focus:ring focus:ring-accent'
          >
            CFC Discord
          </a>
        </p>
      </div>
    </div>
  </>
)

export default memo(FAQPage)
