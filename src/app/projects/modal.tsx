import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { ScrollArea } from "~/components/ui/scroll-area"

const ProjectProcessModal = () => {
  return (
    <Dialog>
      <p className="mb-1">
        If you&apos;re a charity or non-profit looking to potentially work with us, here are the steps we follow:
      </p>
      <ol className="list-inside list-decimal">
        <li>Initial meeting</li>
        <li>Subsequent pre-development planning</li>
        <li>Development phase</li>
        <li>Handover</li>
        <li>Post-handover care</li>
      </ol>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 w-full font-mono">
          Learn more
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-2xl overflow-hidden sm:max-h-[calc(95vh)]">
        <DialogHeader>
          <DialogTitle>CFC project development breakdown</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full w-full font-sans text-sm">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-mono text-base font-bold leading-7">Initial meeting</h3>
              <p>
                The primary focus of this stage is to develop a basic understanding on our side about your project.
                Through this initial discussion we are able to construct a basic idea of the technical requirements.
                Depending on how thoroughly planned your project is at this stage, we are also able to point you in the
                right direction in regards to user experience walkthroughs, and where more detail is needed.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-mono text-base font-bold leading-7">Subsequent pre-development planning</h3>
              <p>
                The focus here is refining the project specifications &ndash; what is being developed at each stage of
                the project, down to the specific features. The purpose here is to get to the core functionality of the
                product which we build in the &apos;first leg&apos; of the project, followed by the other features -
                which make your application robust - in additional stages if necessary. This stage can occur in person,
                via email threads or both.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-mono text-base font-bold leading-7">Development phase</h3>
              <p>
                We work using an agile development process. This means that we work in two week sprints, and require the
                client&apos;s feedback at the end of the two weeks as it helps us refine our work and ensure that the
                client&apos;s requirements are being met in all areas of the project.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-mono text-base font-bold leading-7">Handover</h3>
              <p>
                We provide the client with an APK (Application Program Key) which allows the application to be
                downloaded or run by the client along with documentation for the source code and the user guide.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-mono text-base font-bold leading-7">Post-handover care</h3>
              <p>
                For some projects, we may need to provide maintenance and other support services for servers, routes and
                other technical tools.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectProcessModal
