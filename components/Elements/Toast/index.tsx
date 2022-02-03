import { memo, PropsWithChildren } from 'react'
import { Transition } from '@headlessui/react'

const Toast = ({
  children,
  type = 'info',
  ...props
}: PropsWithChildren<ToastProps>) => {
  let bg: string
  switch (type) {
    case 'success':
      bg = 'bg-success'
      break
    case 'warning':
      bg = 'bg-warning'
      break
    case 'danger':
      bg = 'bg-danger'
      break
    default:
      bg = 'bg-primary'
  }
  return (
    <Transition
      show={props.open}
      enter='transform transition ease-in-out duration-150'
      enterFrom='opacity-0 translate-x-full'
      enterTo='opacity-100 translate-0'
      leave='transform transition ease-in-out duration-75'
      leaveFrom='opacity-100 translate-x-0'
      leaveTo='opacity-0 translate-x-full'
      className={[
        'fixed flex items-start text-secondary px-4 py-2 space-x-2 break-words z-[5] bottom-3 right-3 left-3 sm:left-auto sm:max-w-sm',
        bg
      ]
        .join(' ')
        .trim()}
    >
      <p>{children}</p>
      <button className='material-icons-sharp' onClick={props.onClose}>
        close
      </button>
    </Transition>
  )
}

export default memo(Toast)

interface ToastProps {
  open: boolean
  type?: 'success' | 'danger' | 'warning' | 'info'
  onClose: () => void
}
