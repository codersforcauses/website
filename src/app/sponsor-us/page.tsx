export default function Sponsor() {
  return (
    <>
      <div className="relative text-primary dark:bg-alt-dark dark:text-primary">
        <div className="container grid gap-8 py-12 md:py-16 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="mb-4 font-mono text-3xl font-black">Partnering with us</h2>
            <p className="text-lg">
              Coders for Causes (CFC) is a pivotal student-run organization at the University of Western Australia,
              dedicated to bridging the gap between computing students and the tech industry.
            </p>
            <p className="text-lg">
              We invite corporate partners to join us in shaping the next generation of tech leaders. Sponsors can
              expect significant exposure, direct access to top-tier talent, and the opportunity to make a genuine
              social impact.
            </p>
          </div>
          <div>
            <div className="align-center flex w-full flex-col place-content-evenly items-center gap-4 md:flex-row lg:h-full">
              <div className="text-center">
                <p className="text-2xl font-semibold">100+</p>
                <p className="text-lg">Events</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold">19</p>
                <p className="text-lg">Career-focused events</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold">500+</p>
                <p className="text-lg">Volunteers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
