import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

const ProjectProcessModal = () => {
  return (
    <Dialog>
      <p>
        If you&apos;re a charity or non-profit looking to potentially work with us, click on the button to see our
        process.
      </p>
      <DialogTrigger className="my-4 w-full border border-primary bg-transparent px-4 py-2 font-mono font-black text-black hover:bg-black hover:text-white focus:bg-black focus:text-white focus:outline-none dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black dark:focus:bg-white dark:focus:text-black">
        Project Development
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>CFC Project Development Breakdown</DialogTitle>
          <DialogDescription>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-mono text-xl">Initial Meeting</h3>
                <p>
                  The primary focus of this stage is to develop a basic understanding on our side about your project.
                  Through this initial discussion we are able to construct a basic idea of the technical requirements.
                  Depending on how thoroughly planned your project is at this stage, we are also able to point you in
                  the right direction in regards to user experience walkthroughs, and where more detail is needed.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-xl">Subsequent Pre-development Planning</h3>
                <p>
                  The focus here is refining the project specifications &ndash; what is being developed at each stage of
                  the project, down to the specific features. The purpose here is to get to the core functionality of
                  the product which we build in the ‘first leg’ of the project, followed by the other features - which
                  make your application robust - in additional stages if necessary. This stage can occur in person, via
                  email threads or both.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-xl">Development Phase</h3>
                <p>
                  We work using an agile development process. This means that we work in two week sprints, and require
                  the client’s feedback at the end of the two weeks as it helps us refine our work and ensure that the
                  client’s requirements are being met in all areas of the project.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-xl">Handover</h3>
                <p>
                  We provide the client with an APK (Application Program Key) which allows the application to be
                  downloaded or run by the client along with documentation for the source code and the user guide.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-xl">Post-Handover Care</h3>
                <p>
                  For some projects, we may need to provide maintenance and other support services for servers, routes
                  and other technical tools.
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectProcessModal
