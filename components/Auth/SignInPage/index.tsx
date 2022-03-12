import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { useClerk, useSignIn } from '@clerk/nextjs'
import { EmailLinkFactor } from '@clerk/types'
import Title from '@components/Utils/Title'
import { Form, TextField } from '@elements/FormElements'
import { Button } from '@elements/Button'
import Alert from '@elements/Alert'
import validationSchema from './validation'

const defaultValues: FormValues = {
  email: ''
}

const SignInPage = ({ signUp }: SignInProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expired, setExpired] = useState(false)
  const [verified, setVerified] = useState(false)
  const router = useRouter()
  const { setSession } = useClerk()
  const { signIn } = useSignIn()

  const goToSignUpPage = useCallback(
    e => {
      e.preventDefault()
      signUp(true)
    },
    [signUp]
  )

  const handleSubmit = useCallback(
    async ({ email }: FormValues) => {
      setLoading(true)
      setVerified(false)
      setExpired(false)

      const url = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : 'http://localhost:3000'

      try {
        const { supportedFirstFactors, createMagicLinkFlow } =
          await signIn!.create({
            identifier: email
          })
        const { email_address_id } = supportedFirstFactors.find(
          ff => ff.strategy === 'email_link' && ff.safe_identifier === email
        ) as EmailLinkFactor

        const { startMagicLinkFlow, cancelMagicLinkFlow } =
          createMagicLinkFlow()

        try {
          const si = await startMagicLinkFlow({
            emailAddressId: email_address_id,
            redirectUrl: `${url}/verification`
          })

          const verification = si.firstFactorVerification
          if (verification.verifiedFromTheSameClient()) setVerified(true)
          else if (verification.status === 'expired') setExpired(true)

          if (si.status === 'complete') {
            setSession(si.createdSessionId, () => router.push('/dashboard'))
          }
        } catch (error) {
          cancelMagicLinkFlow()
          throw new Error('Error completing magic link flow')
        }

        if (expired) setError('Session has expired. Please sign in to continue')
        if (verified) return <div>Signed in on another tab</div>
      } catch (error: any) {
        console.log({ error })

        if (error?.errors) setError(error.errors?.[0].message)
        else if (error.message) setError(error.message)
        else
          setError(
            'Something went wrong signing you up. Please refresh and try again.'
          )
      } finally {
        setLoading(false)
      }
    },
    [expired, router, setSession, signIn, verified]
  )

  return (
    <>
      <Title typed>./sign-in</Title>
      <div className='py-12 bg-secondary text-primary md:py-24 dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto'>
          <p>
            Don&apos;t have an account?&nbsp;
            <button
              className='hover:underline focus:outline-none focus:ring-1 focus:ring-accent'
              onClick={goToSignUpPage}
            >
              Create one
            </button>
            .
          </p>
          <div className='md:max-w-lg md:w-1/2 membership'>
            {error ? (
              <Alert icon color='danger' className='mt-4'>
                {error}
              </Alert>
            ) : (
              loading && (
                <Alert color='accent' className='mt-4'>
                  We&apos;ve just sent you an email with a link to continue
                </Alert>
              )
            )}
            <Form<FormValues>
              showNote
              disabled={loading}
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
            >
              <TextField
                setFocused
                label='Email'
                name='email'
                inputMode='email'
                placeholder='hello@codersforcauses.org'
                autoComplete='email'
                description='We will send you an email with a magic link'
                rules={validationSchema.email}
              />
              <Button
                fill
                type='submit'
                loading={loading}
                className='px-8 max-w-max'
              >
                Sign-in
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

interface FormValues {
  email: string
}

interface SignInProps {
  signUp: Dispatch<SetStateAction<boolean>>
}

export default SignInPage
