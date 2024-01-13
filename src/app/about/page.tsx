import Committee from "../_components/committee"
import TitleText from "../_components/title-text"

export default async function About() {
  return (
    <main className="main">
      <TitleText typed>./about</TitleText>
      <div>
        <div className="container">
          <div id="_what_we_do" className="my-4 space-y-2">
            <h2 className="font-mono text-3xl font-black">
              We build software for charities
            </h2>
            <p className="">
              Coders for Causes is a not for profit organisation that empowers
              charities and other not for profit organisations by connecting
              them with university students to develop technical solutions. We
              are a student-run club based in Perth, Western Australia with a
              wide range of clients. Whether you are looking for technical
              advice or a long term project, get in touch with us for more
              information.
            </p>
          </div>
        </div>
        <div
          id="_meet_the_team"
          className="bg-alt-light py-12 text-primary dark:bg-primary dark:text-secondary md:py-24"
        >
          <div className="container mx-auto">
            <h3 className="mb-4 font-mono text-2xl font-black">
              2024/25 Committee
            </h3>
            <Committee />
          </div>
        </div>

        <div className="bg-secondary py-12 text-primary dark:bg-alt-dark dark:text-secondary md:py-24 ">
          <div className="container mx-auto space-y-12">
            <h3 className="font-mono text-2xl font-black">Past Clients</h3>
            {/* <Clients /> */}
            <h3 className="font-mono text-2xl font-black">
              Proudly Sponsored By
            </h3>
            {/* <Sponsors /> */}
            {/* <h3 className='font-mono text-2xl font-black'>Our Partnered Clubs</h3>
        <Partners /> */}
            {/* <h3 className='font-mono text-2xl font-black'>Special Thanks</h3>
        <SpecialThanks /> */}
          </div>
        </div>
      </div>
    </main>
  )
}
