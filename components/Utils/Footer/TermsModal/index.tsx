import React from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'

const TermsModal = ({
  isOpen,
  closeModal
}: {
  isOpen: Boolean
  closeModal: Function
}) => {
  const closeBtn = (
    <Button color='link' className='p-0' onClick={closeModal}>
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
        Terms and Conditions
      </ModalHeader>
      <ModalBody className='legal-content'>
        <p>Welcome to Coders for Causes! We're glad you're here.</p>
        <p>
          This website, www.codersforcauses.org (the "<strong>site</strong>"),
          is owned and operated by Coders for Causes or cfc in short, and our
          affiliates ("<strong>Coders for Causes</strong>", "
          <strong>cfc</strong>", "<strong>we</strong>" or “<strong>us</strong>
          ”). By using the site or services provided on the site, you agree to
          be bound by the following Terms of Service, as updated from time to
          time (collectively, the "<strong>Terms</strong>"). Please read them
          carefully. If you don’t agree to these Terms, you may not sign up or
          use our services.
        </p>
        <div className='pl-4 ml-1'>
          <h5 className='list-heading'>Signing up</h5>
          <ol className='pl-4'>
            <li>
              n order to use most Services, you must register for or
              authenticate into a Mapbox account. When you use our application
              program interfaces (APIs), each request to an API must include one
              of your account's unique API keys.
            </li>
          </ol>
        </div>
      </ModalBody>
    </Modal>
  )
}
export default TermsModal
