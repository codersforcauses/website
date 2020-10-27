import * as React from 'react'
import { useContext, useMemo } from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import { DarkContext } from 'helpers/user'

const PrivacyModal = ({
  isOpen,
  closeModal
}: {
  isOpen: Boolean
  closeModal: Function
}) => {
  const isDark = useContext(DarkContext)

  const closeBtn = useMemo(
    () => (
      <Button
        color='link'
        className='p-0 d-flex align-items-center text-decoration-none'
        onClick={closeModal}
      >
        <i
          className={`material-icons-sharp text-${isDark ? 'white' : 'black'}`}
        >
          close
        </i>
      </Button>
    ),
    [closeModal, isDark]
  )
  return (
    <Modal centered scrollable size='lg' isOpen={isOpen} toggle={closeModal}>
      <ModalHeader
        toggle={closeModal}
        close={closeBtn}
        className='bg-transparent border-0 font-weight-bold pb-0'
      >
        Privacy Policy
      </ModalHeader>
      <ModalBody>
        <p>We will keep your data safe.</p>
      </ModalBody>
    </Modal>
  )
}
export default PrivacyModal
