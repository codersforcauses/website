import { memo } from 'react'
import Modal from '@elements/Modal'
import { ModalProps } from '@lib/types'

const PrivacyModal = (props: ModalProps) => (
  <Modal
    heading='Privacy Policy'
    open={props.isOpen}
    onClose={props.closeModal}
  >
    <p>We will keep your data safe.</p>
  </Modal>
)
export default memo(PrivacyModal)
