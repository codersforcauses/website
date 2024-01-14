import Clients from "../_components/clients"
import Committee from "../_components/committee"
import Sponsors from "../_components/sponsors"
import TitleText from "../_components/title-text"

export default async function About() {
  return (
    <main className="main">
      <TitleText typed>./about</TitleText>
      <div className="container my-6 md:grid md:grid-cols-2 md:space-x-6">
        <div id="_what_we_do" className="space-y-2">
          <h2 className="font-mono text-3xl font-black">
            We build software for charities
          </h2>
          <p>
            Coders for Causes is a not for profit organisation that empowers
            charities and other not for profit organisations by connecting them
            with university students to develop technical solutions. We are a
            student-run club based in Perth, Western Australia with a wide range
            of clients.
          </p>
          <p>
            At Coders for Causes, we redefine volunteering through our
            tech-driven approach. In an era where technical skills are
            increasingly vital, we fill a crucial gap for charities and
            non-profits that often operate with limited budgets, unable to
            afford professional development services.
          </p>
          <p>
            We organize two major web development projects each year, aligned
            with the winter and summer breaks. These projects are more than just
            coding sessions; they are collaborative, intensive efforts to
            develop real-world software solutions. Our commitment is to provide
            these services completely free of charge, ensuring that our client
            organizations, exclusively from the non-profit and charity sectors,
            receive the support they need without financial burden.
          </p>
        </div>
        <div id="_our_mission" className="space-y-2">
          <h2 className="font-mono text-3xl font-black">Our mission</h2>
          <h3 className="font-black">Empowerment of Organizations</h3>
          <p>
            Through technical consulting and custom web application development,
            we provide not-for-profits and charities with the digital tools
            necessary for their success and increased impact.
          </p>
          <h3 className="font-black">Student Development</h3>
          We are deeply committed to the professional growth of our students. By
          immersing them in technologies such as React, Vue, and other
          industry-relevant tools, we ensure that they are not only contributing
          to a noble cause but also enhancing their own skills. Our project
          structure simulates a real-world work environment, complete with
          stand-up meetings, code reviews, and adherence to best practices in
          software development.
        </div>
      </div>
      <div
        id="_meet_the_team"
        className="bg-alt-light py-12 text-primary dark:bg-alt-dark dark:text-white md:py-24"
      >
        <div className="container mx-auto">
          <h3 className="mb-4 font-mono text-2xl font-bold">Committee</h3>
          <Committee />
        </div>
      </div>

      <div className="bg-secondary bg-white py-6 text-primary dark:bg-alt-dark dark:text-secondary md:py-12 ">
        <div className="container mx-auto space-y-12">
          <h3 className="font-mono text-2xl font-black">Past Clients</h3>
          <Clients />
          <h3 className="font-mono text-2xl font-black">
            Proudly Supported By
          </h3>
          <Sponsors />
        </div>
      </div>
    </main>
  )
}
