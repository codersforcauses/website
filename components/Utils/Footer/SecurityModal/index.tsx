import React, { useContext } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button
} from 'reactstrap'
import { DarkContext } from 'helpers/user'

const SecurityModal = ({ isOpen, closeModal }: { isOpen: Boolean; closeModal: Function }) => {
  const isDark = useContext(DarkContext)

  const closeBtn = (
    <Button color='link' className='p-0' onClick={closeModal}>
      <i className={`material-icons-sharp ${isDark ? 'text-white' : 'text-black'}`}>close</i>
    </Button>
  )
  return (
    <Modal centered scrollable size='lg' isOpen={isOpen} toggle={closeModal}>
      <ModalHeader
        toggle={closeModal}
        close={closeBtn}
        className='bg-transparent border-0 font-weight-bold pb-0'
      >
        Security
      </ModalHeader>
      <ModalBody>
        <p>We are very secure.</p>
      </ModalBody>
    </Modal>
  )
}
export default SecurityModal
