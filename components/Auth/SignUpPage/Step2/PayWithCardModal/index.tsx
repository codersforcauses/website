import { useMemo } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import CreditCardForm from 'components/Payments/CreditCardForm'

const PayWithCardModal = ({ isOpen, closeModal }: Props) => {
  const closeBtn = useMemo(
    () => (
      <Button color='link' className='p-0' onClick={closeModal}>
        <i className='material-icons-sharp'>close</i>
      </Button>
    ),
    [closeModal]
  )

  return (
    <Modal centered isOpen={isOpen} toggle={closeModal}>
      <ModalHeader
        toggle={closeModal}
        close={closeBtn}
        className='bg-transparent border-0 font-weight-bold pb-0'
      >
        Pay With Card
      </ModalHeader>
      <ModalBody>
        <p>
          We use stripe to validate online payments throughout our website. Any
          charges that stripe has are included in the membership payment.
        </p>
        <CreditCardForm />
      </ModalBody>
    </Modal>
  )
}

export default PayWithCardModal

interface Props {
  isOpen: boolean
  closeModal: () => void
}
