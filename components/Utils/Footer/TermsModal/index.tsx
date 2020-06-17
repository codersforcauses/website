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
              In order to use most Services, you must register for or
              authenticate into a Coders for Causes account. When you use our application
              program interfaces (APIs), each request to an API must include one
              of your account's unique API keys.
            </li>
            <li>
              You must ensure that that user username and password is kept confidential.
              You will accept responsibility for all activities that occur under your username or password.
              We may disable your username and password if you breach any of the policies or terms governing your use of our website
              or any other contractual obligation you owe to us.
            </li>
          </ol>
        </div>
        <div className='pl-4 ml-1'>
          <h5 className='list-heading'>Copyright and Trademarks</h5>
          <ol className='pl-4'>
            <li>
              All documents on this site incorporate a link clarifying the copyright status of the document.
              This link appears at the foot of the page, along with the CFC contact details.
            </li>
            <li>
              CFC holds the copyright to all original material produced and displayed on this site.
              Users may not copy or reproduce the original material displayed on this site without the express written consent of CFC.
            </li>
          </ol>
        </div>
        <div className='pl-4 ml-1'>
          <h5 className='list-heading'>Acceptable Use</h5>
          <ol className='pl-4'>
            <li>
              You must use the website in a lawful manner, and must obey all laws,
              rules, and regulations (“Laws”) applicable to your use of the website.
              As applicable, this may include compliance with both domestic and international Laws.
            </li>
          </ol>
        </div>
        <div className='pl-4 ml-1'>
          <h5 className='list-heading'>APIs and Dashboard</h5>
          <ol className='pl-4'>
            <li>
              CFC has developed and provides access to the APIs that may be used to access various services.
              You may use the APIs solely as described in the Documentation.
            </li>
          </ol>
        </div>
      </ModalBody>
    </Modal>
  )
}
export default TermsModal
