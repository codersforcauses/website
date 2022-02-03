import { PropsWithChildren, Fragment, MutableRefObject } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Modal = ({
  children,
  heading,
  size = 'lg',
  ...props
}: PropsWithChildren<ModalProps>) => {
  let widthClass

  switch (size) {
    case 'xs':
      widthClass = 'max-w-lg'
      break
    case 'sm':
      widthClass = 'max-w-xl'
      break
    case 'md':
      widthClass = 'max-w-2xl'
      break
    case 'lg':
      widthClass = 'max-w-3xl'
      break
    default:
      widthClass = 'max-w-4xl'
  }

  return (
    <Transition show={props.open} as={Fragment}>
      <Dialog
        {...props}
        className='fixed inset-0 z-40 text-primary dark:text-secondary'
      >
        <Transition.Child
          as={Fragment}
          enter='transition-all ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-all ease-in duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 z-40 bg-primary/75' />
        </Transition.Child>
        <Transition.Child
          enter='transition-all ease-out duration-300 delay-100'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition-all ease-in duration-150'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
          className={`fixed w-full max-h-full overflow-y-auto origin-center transform -translate-x-1/2 -translate-y-1/2 h-max z-[45] inset-1/2 md:max-h-[86vh] md:w-3/4 ${widthClass}`}
        >
          <div className='relative bg-secondary dark:bg-alt-dark'>
            <div className='sticky inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-2 space-x-4 bg-secondary dark:bg-alt-dark'>
              <Dialog.Title className='font-mono text-xl font-black'>
                {heading}
              </Dialog.Title>
              <button
                className='grid p-1 place-items-center hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'
                onClick={props.onClose}
              >
                <span className='material-icons-sharp'>close</span>
              </button>
            </div>
            <Dialog.Description as='div' className='z-40 px-4 pt-2 pb-4'>
              {children}
            </Dialog.Description>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Modal

interface ModalProps {
  open: boolean
  heading?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  initialFocus?: MutableRefObject<HTMLElement | null>
  onClose: () => void
}
