import {
  Dispatch,
  Fragment,
  memo,
  SetStateAction,
  useCallback,
  useState
} from 'react'
import { useRouter } from 'next/router'
import { useClerk, useSignUp } from '@clerk/nextjs'
import { Tab } from '@headlessui/react'
import Alert from '@elements/Alert'
import UWAStudent from './UWAStudent'
import OtherMember from './OtherMember'

const SignUpPage = ({ signIn }: SignUpProps) => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [auth, setAuth] = useState('')
  const router = useRouter()
  const { setSession } = useClerk()
  const { signUp } = useSignUp()

  const goToSignInPage = useCallback(
    e => {
      e.preventDefault()
      signIn(false)
    },
    [signIn]
  )

  const handleSubmit = useCallback(
    async values => {
      setLoading(true)
      let { email, firstName, lastName } = values

      setAuth('')

      const url = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : 'http://localhost:3000'

      try {
        if (values.hasOwnProperty('studentNumber')) {
          try {
            const response = await fetch('/api/pheme', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user: values.studentNumber,
                pass: values.password
              })
            }).then(resp => resp.json())
            email = response.email
            firstName = response.firstName
            lastName = response.lastName
          } catch ({ message }) {
            throw new Error(message as string)
          }
        }

        const { createMagicLinkFlow } = await signUp!.create({
          emailAddress: email,
          firstName,
          lastName
        })

        setAuth('email_sent')

        const { startMagicLinkFlow, cancelMagicLinkFlow } =
          createMagicLinkFlow()

        try {
          const su = await startMagicLinkFlow({
            redirectUrl: `${url}/verification`
          })
          const verification = su.verifications.emailAddress

          if (verification.verifiedFromTheSameClient()) setAuth('verified')
          else if (verification.status === 'expired') setAuth('expired')

          if (su.status === 'complete') {
            await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email,
                firstName,
                lastName,
                gender: values.gender || 'other',
                isGuildMember: !!values.isGuildMember
              })
            })

            setSession(su.createdSessionId, () => router.push('/dashboard'))
          }
        } catch (error) {
          cancelMagicLinkFlow()
          throw new Error('Error completing magic link flow')
        }
      } catch (error: any) {
        console.log({ error })

        if (error?.errors) setErrors(error.errors?.[0].message)
        else if (error.message) setErrors(error.message)
        else
          setErrors(
            'Something went wrong signing you up. Please refresh and try again.'
          )
      } finally {
        setLoading(false)
      }

      if (auth === 'expired')
        setErrors('Session has expired. Please sign in to continue')
      if (auth === 'verified') return <div>Signed in on another tab</div>
    },
    [auth, router, setSession, signUp]
  )

  return (
    <div className='py-12 bg-secondary text-primary md:py-24 dark:bg-alt-dark dark:text-secondary'>
      <div className='container px-3 mx-auto'>
        <p className='mb-4'>
          Already have an account?&nbsp;
          <button
            className='hover:underline focus:outline-none focus:ring-1 focus:ring-accent'
            onClick={goToSignInPage}
          >
            Sign in
          </button>
          .
        </p>
        <Tab.Group as='div' className='md:max-w-lg md:w-1/2 membership'>
          <Tab.List className='border max-w-max'>
            {['UWA Student', 'Email Sign-up'].map(text => (
              <Tab
                key={text}
                disabled={loading}
                className={({ selected }) =>
                  `font-mono font-black px-3 sm:px-4 py-2 focus:outline-none focus:ring focus:ring-accent ${
                    selected &&
                    'bg-primary text-secondary dark:bg-secondary dark:text-primary'
                  }`
                }
              >
                {text}
              </Tab>
            ))}
          </Tab.List>
          {auth === 'email_sent' && (
            <Alert icon color='success' className='mt-4'>
              We&apos;ve just sent you an email. Please click the button to
              complete creating your account
            </Alert>
          )}
          <Tab.Panels as={Fragment}>
            <Tab.Panel className='focus:outline-none'>
              <UWAStudent
                error={errors}
                loading={loading}
                handleSubmit={handleSubmit}
              />
            </Tab.Panel>
            <Tab.Panel>
              <OtherMember
                error={errors}
                loading={loading}
                handleSubmit={handleSubmit}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

interface SignUpProps {
  signIn: Dispatch<SetStateAction<boolean>>
}

export default memo(SignUpPage)
