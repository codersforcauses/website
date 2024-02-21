import { Suspense } from "react"
import ProjectPageSkeleton from "~/app/_components/projects/ProjectPage/ProjectPageSkeleton"
import ProjectPage from "~/app/_components/projects/ProjectPage/page"

const Project = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <main className="main">
      <Suspense fallback={<ProjectPageSkeleton />}>
        <ProjectPage projectId={id} />
      </Suspense>
    </main>
  )
}

export default Project
