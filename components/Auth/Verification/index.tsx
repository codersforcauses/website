import { useEffect, useState } from 'react'
import { MagicLinkErrorCode, isMagicLinkError, useClerk } from '@clerk/nextjs'
import Title from '@components/Utils/Title'
import Alert, { AlertColor } from '@elements/Alert'

const status = (verificationStatus: string) => {
  switch (verificationStatus) {
    case 'loading':
      return 'Loading'
    case 'failed':
      return 'Magic link verification failed'
    case 'expired':
      return 'Magic link expired'
    default:
      return 'Successfully signed in. Return to the original tab to continue.'
  }
}

const Verification = () => {
  const [verification, setVerification] = useState<VerificationProps>({
    type: 'info',
    status: 'loading'
  })
  const { handleMagicLinkVerification } = useClerk()

  useEffect(() => {
    const verify = async () => {
      try {
        await handleMagicLinkVerification({
          redirectUrlComplete: '/dashboard'
        })

        // If we're not redirected at this point, it means that the flow has completed on another device.
        setVerification({
          type: 'success',
          status: 'verified'
        })
      } catch (err) {
        // Verification has failed.
        let status: VerificationProps = {
          type: 'danger',
          status: 'failed'
        }
        if (isMagicLinkError(err) && err.code === MagicLinkErrorCode.Expired) {
          status = {
            type: 'danger',
            status: 'expired'
          }
        }
        setVerification(status)
      }
    }
    verify()
  }, [])

  return (
    <>
      <Title typed>./verification</Title>
      <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container flex items-center h-full px-3 mx-auto md:text-2xl'>
          <Alert icon color={verification.type} className='flex-grow'>
            {status(verification.status)}
          </Alert>
        </div>
      </div>
    </>
  )
}

interface VerificationProps {
  type: AlertColor
  status: string
}

export default Verification
