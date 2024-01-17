import { Suspense } from "react"
import ProjectPage from "~/app/_components/projects/ProjectPage/page"

const Loading = () => {
  return <div>loading</div>
}

const Project = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <main className="main">
      <Suspense fallback={<Loading />}>
        <ProjectPage projectId={id} />
      </Suspense>
    </main>
  )
}

export default Project
