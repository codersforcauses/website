import dynamic from 'next/dynamic'
import Title from '@components/Utils/Title'
import Committee from '../Committee'
import Clients from '../Clients'
import Partners from '../Partners'
// import SpecialThanks from '../SpecialThanks'
import Sponsors from '../Sponsors'

const Map = dynamic(() => import('../Map'), { ssr: false })

const AboutPage = () => (
  <>
    <Title typed>./about</Title>
    <div className='relative bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
      <div className='container grid gap-4 px-3 py-12 mx-auto lg:grid-cols-2 md:py-24'>
        <div id='_what_we_do'>
          <h2 className='mb-4 font-mono text-3xl font-black'>
            We build software for charities
          </h2>
          <p className='text-lg'>
            Coders for Causes is a not for profit organisation that empowers
            charities and other not for profit organisations by connecting them
            with university students to develop technical solutions. We are a
            student-run club based in Perth, Western Australia with a wide range
            of clients. Whether you are looking for technical advice or a long
            term project, get in touch with us for more information.
          </p>
        </div>
        <div className='w-full h-64 lg:inset-y-0 lg:right-0 lg:absolute lg:h-full lg:w-1/2'>
          <Map />
        </div>
      </div>
    </div>

    <div
      id='_meet_the_team'
      className='py-12 md:py-24 bg-alt-light text-primary dark:bg-primary dark:text-secondary'
    >
      <div className='container px-3 mx-auto'>
        <h3 className='mb-4 font-mono text-2xl font-black'>Meet the Team</h3>
        <Committee />
      </div>
    </div>

    <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary md:py-24 '>
      <div className='container px-3 mx-auto space-y-12'>
        <h3 className='font-mono text-2xl font-black'>Our Clients</h3>
        <Clients />
        <h3 className='font-mono text-2xl font-black'>Our Sponsors</h3>
        <Sponsors />
        {/* <h3 className='font-mono text-2xl font-black'>Our Partnered Clubs</h3>
        <Partners /> */}
        {/* <h3 className='font-mono text-2xl font-black'>Special Thanks</h3>
        <SpecialThanks /> */}
      </div>
    </div>
  </>
)

export default AboutPage
