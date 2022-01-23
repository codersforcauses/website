export interface ImageProps {
  src: string
  alt: string
}

export interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}
