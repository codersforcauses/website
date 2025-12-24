import Committee from "./committee"
import Clients from "./clients"
import Sponsors from "./sponsors"

export default function AboutPage() {
  return (
    <>
      <section className="container mx-auto grid gap-4 px-4 py-12 md:py-16 lg:grid-cols-2">
        <div id="what_we_do">
          <h2 className="mb-4 scroll-m-20 font-mono text-3xl font-semibold tracking-tight">
            We build software for charities
          </h2>
          <p className="text-lg leading-normal">
            Coders for Causes is a not for profit organization that empowers charities and other not for profit
            organizations by connecting them with university students to develop technical solutions. We are a
            student-run club based in Perth, Western Australia with a wide range of clients.
          </p>
        </div>
        <div id="map" className="h-64 w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          {/* <Map /> */}
        </div>
      </section>
      <section id="committee" className="bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h3 className="mb-4 scroll-m-20 font-mono text-2xl font-semibold tracking-normal">Committee</h3>
          <Committee />
        </div>
      </section>
      <section className="container mx-auto flex flex-col gap-y-12 px-4 py-12 md:py-16">
        <h3 className="scroll-m-20 font-mono text-2xl font-semibold tracking-normal">Past clients</h3>
        <Clients />
        <h3 className="scroll-m-20 font-mono text-2xl font-semibold tracking-normal">Proudly supported by</h3>
        <Sponsors />
      </section>
    </>
  )
}
