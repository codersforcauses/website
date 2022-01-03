import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useState
} from 'react'
import { useRouter } from 'next/router'
import { useClerk, useMagicLink, useSignUp } from '@clerk/nextjs'
import { Tab } from '@headlessui/react'
import Title from 'components/Utils/Title'
import UWAStudent from './UWAStudent'
import OtherMember from './OtherMember'

const SignUpPage = (props: SignUpProps) => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [expired, setExpired] = useState(false)
  const [verified, setVerified] = useState(false)
  const router = useRouter()
  const { setSession } = useClerk()
  const signUp = useSignUp()
  const { startMagicLinkFlow, cancelMagicLinkFlow } = useMagicLink(signUp)

  const goToSignInPage = useCallback(
    e => {
      e.preventDefault()
      props.signIn(false)
    },
    [props.signIn]
  )

  const handleSubmit = useCallback(async values => {
    setLoading(true)
    let { email } = values

    setVerified(false)
    setExpired(false)

    const url = process.env.VERCEL_URL || 'http://localhost:3000'

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
        } catch ({ message }) {
          throw new Error(message as string)
        }
      }
      await signUp.create({ emailAddress: email })

      const su = await startMagicLinkFlow({
        redirectUrl: `${url}/verification`
      })
      const verification = su.verifications.emailAddress

      if (verification.verifiedFromTheSameClient()) {
        setVerified(true)
        return
      } else if (verification.status === 'expired') setExpired(true)

      if (su.status === 'complete') {
        setSession(su.createdSessionId, () => router.push('/dashboard'))
        return
      }
    } catch (error) {
      setErrors(
        'Something went wrong signing you up. Please refresh and try again.'
      )
      cancelMagicLinkFlow()
    } finally {
      setLoading(false)
    }

    if (expired) setErrors('Session has expired. Please sign in to continue')
    if (verified) return <div>Signed in on another tab</div>
  }, [])

  return (
    <>
      <Title typed>./sign-up</Title>
      <div className='py-12 bg-secondary text-primary md:py-24 dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto'>
          <p className='mb-4'>
            Already have an account?&nbsp;
            <button className='hover:underline' onClick={goToSignInPage}>
              Sign in
            </button>
            .
          </p>
          <Tab.Group as='div' className='md:max-w-lg md:w-1/2 membership'>
            <Tab.List className='border max-w-max'>
              {['UWA Student', 'Email Sign-up'].map(text => (
                <Tab
                  key={text}
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
            <Tab.Panels as={Fragment}>
              <Tab.Panel>
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
    </>
  )
}

interface SignUpProps {
  route?: string
  signIn: Dispatch<SetStateAction<boolean>>
}

export default SignUpPage
