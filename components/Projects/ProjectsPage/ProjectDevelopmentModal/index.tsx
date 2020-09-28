import { DarkContext } from 'helpers/user'
import React, { useContext } from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'

const ProjectDevelopmentModal = ({
  isOpen,
  closeModal
}: {
  isOpen: Boolean
  closeModal: Function
}) => {
  const isDark = useContext(DarkContext)

  const closeBtn = (
    <Button color='link' className={`p-0 text-${isDark ? 'secondary' : 'primary'}`} onClick={closeModal}>
      <i className='material-icons-sharp'>close</i>
    </Button>
  )
  return (
    <Modal centered scrollable size='lg' isOpen={isOpen} toggle={closeModal}>
      <ModalHeader
        toggle={closeModal}
        close={closeBtn}
        className='bg-transparent border-0 font-weight-bold pb-0'
      >
        CFC Project Development Breakdown
      </ModalHeader>
      <ModalBody>
        <h4>Initial Meeting</h4>
        <p>
          The primary focus of this stage is to develop a basic understanding on
          our side about your project. Through this initial discussion we are
          able to construct a basic idea of the technical requirements.
          Depending on how thoroughly planned your project is at this stage, we
          are also able to point you in the right direction in regards to user
          experience walkthroughs, and where more detail is needed.
        </p>
        <h4>Subsequent Pre-development Planning</h4>
        <p>
          The focus here is refining the project specifications &ndash; what is
          being developed at each stage of the project, down to the specific
          features. The purpose here is to get to the core functionality of the
          product which we build in the ‘first leg’ of the project, followed by
          the other features - which make your application robust - in
          additional stages if necessary. This stage can occur in person, via
          email threads or both.
        </p>
        <h4>Development Phase</h4>
        <p>
          We work using an agile development process. This means that we work in
          two week sprints, and require the client’s feedback at the end of the
          two weeks as it helps us refine our work and ensure that the client’s
          requirements are being met in all areas of the project.
        </p>
        <h4>Handover</h4>
        <p>
          We provide the client with an APK (Application Program Key) which
          allows the application to be downloaded or run by the client along
          with documentation for the source code and the user guide.
        </p>
        <h4>Post-Handover Care</h4>
        <p className='mb-0'>
          For some projects, we may need to provide maintenance and other
          support services for servers, routes and other technical tools.
        </p>
      </ModalBody>
    </Modal>
  )
}
export default ProjectDevelopmentModal
