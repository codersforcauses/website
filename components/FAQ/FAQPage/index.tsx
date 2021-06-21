import Title from '@components/Utils/Title'
import questionList from '@data/faq.json'
import QuestionCard from '../QuestionCard'

const FAQPage = () => (
  <>
    <Title typed>./Frequently Asked Questions</Title>
    <div className='py-12 md:py-24 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
      <div className='container grid grid-cols-1 gap-6 px-3 mx-auto lg:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {questionList.map(({ id, ...question }) => (
          <QuestionCard {...question} key={id} />
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

export default FAQPage
