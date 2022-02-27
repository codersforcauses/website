import { memo } from 'react'
import Modal from '@elements/Modal'
import { ModalProps } from '@helpers/types'

const SecurityModal = (props: ModalProps) => (
  <Modal heading='Security' open={props.isOpen} onClose={props.closeModal}>
    <p>We are very secure.</p>
  </Modal>
)
export default memo(SecurityModal)
