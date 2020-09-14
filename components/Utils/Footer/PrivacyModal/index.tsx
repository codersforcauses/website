import React, { useMemo } from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'

const PrivacyModal = ({
  isOpen,
  closeModal
}: {
  isOpen: Boolean
  closeModal: Function
}) => {
  const closeBtn = useMemo(
    () => (
      <Button color='link' className='p-0' onClick={closeModal}>
        <i className='material-icons-sharp'>close</i>
      </Button>
    ),
    [closeModal]
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
      <ModalBody />
    </Modal>
  )
}
export default PrivacyModal
