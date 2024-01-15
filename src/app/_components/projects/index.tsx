import TitleText from "../title-text"
import projectData from "data/projects.json"
import ProjectCard from "./ProjectCard"

const ProjectsPage = () => {
  return (
    <main className="main dark:bg-alt-dark">
      <TitleText typed>./projects</TitleText>
      <div className="container">
        <div className="flex flex-col md:flex-row md:gap-16">
          <div className="flex-grow">
            <div className="grid gap-16 py-6 md:grid-cols-3">
              {projectData.map((project) => (
                <ProjectCard project={project} />
              ))}
            </div>
          </div>
          <div className="mt-6 text-primary dark:text-white md:w-1/4">
            <p>
              If you&apos;re a charity or non-profit looking to potentially work
              with us, click on the button to see our process.
            </p>
            <button
              className="my-4 w-full border border-primary bg-transparent px-4 py-2 font-mono font-black text-black hover:bg-black hover:text-white focus:bg-black focus:text-white focus:outline-none dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black dark:focus:bg-white dark:focus:text-black"
              // onClick={toggleModal}
            >
              Project Development
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectsPage
