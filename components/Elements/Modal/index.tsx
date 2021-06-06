import { PropsWithChildren, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Modal = ({
  children,
  heading,
  ...props
}: PropsWithChildren<ModalProps>) => (
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
        <Dialog.Overlay className='fixed inset-0 z-40 bg-black bg-opacity-75' />
      </Transition.Child>
      <Transition.Child
        enter='transition-all ease-out duration-300 delay-100'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition-all ease-in duration-150'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
        className='fixed w-full h-full max-w-4xl overflow-y-auto origin-center transform -translate-x-1/2 -translate-y-1/2 z-45 md:w-3/4 md:h-5/6 inset-1/2'
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

export default Modal

interface ModalProps {
  open: boolean
  heading?: string
  onClose: () => void
}

// export default function MyModal() {
//   const [isOpen, setIsOpen] = useState(true)

//   function closeModal() {
//     setIsOpen(false)
//   }

//   function openModal() {
//     setIsOpen(true)
//   }

//   return (
//     <>
//       <div className='fixed inset-0 flex items-center justify-center'>
//         <button
//           type='button'
//           onClick={openModal}
//           className='px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
//         >
//           Open dialog
//         </button>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog
//           as='div'
//           className='fixed inset-0 z-10 overflow-y-auto'
//           onClose={closeModal}
//         >
//           <div className='min-h-screen px-4 text-center'>
//             <Transition.Child
//               as={Fragment}
//               enter='ease-out duration-300'
//               enterFrom='opacity-0'
//               enterTo='opacity-100'
//               leave='ease-in duration-200'
//               leaveFrom='opacity-100'
//               leaveTo='opacity-0'
//             >
//               <Dialog.Overlay className='fixed inset-0' />
//             </Transition.Child>

//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span
//               className='inline-block h-screen align-middle'
//               aria-hidden='true'
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter='ease-out duration-300'
//               enterFrom='opacity-0 scale-95'
//               enterTo='opacity-100 scale-100'
//               leave='ease-in duration-200'
//               leaveFrom='opacity-100 scale-100'
//               leaveTo='opacity-0 scale-95'
//             >
//               <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
//                 <Dialog.Title
//                   as='h3'
//                   className='text-lg font-medium leading-6 text-gray-900'
//                 >
//                   Payment successful
//                 </Dialog.Title>
//                 <div className='mt-2'>
//                   <p className='text-sm text-gray-500'>
//                     Your payment has been successfully submitted. We’ve sent
//                     your an email with all of the details of your order.
//                   </p>
//                 </div>

//                 <div className='mt-4'>
//                   <button
//                     type='button'
//                     className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
//                     onClick={closeModal}
//                   >
//                     Got it, thanks!
//                   </button>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   )
// }
