import { memo } from 'react'
import Modal from '@components/Elements/Modal'

const PrivacyModal = (props: { isOpen: boolean; closeModal: () => void }) => (
  <Modal
    heading='Privacy Policy'
    open={props.isOpen}
    onClose={props.closeModal}
  >
    <p>We will keep your data safe.</p>
  </Modal>
)
export default memo(PrivacyModal)
