import { memo } from 'react'
import Modal from '@components/Elements/Modal'

const SecurityModal = (props: { isOpen: boolean; closeModal: () => void }) => (
  <Modal heading='Security' open={props.isOpen} onClose={props.closeModal}>
    <p>We are very secure.</p>
  </Modal>
)
export default memo(SecurityModal)
