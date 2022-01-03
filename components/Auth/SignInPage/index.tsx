import {
  useState,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react'
import Router from 'next/router'
import { useClerk, useMagicLink, useSignIn } from '@clerk/nextjs'
import { UserContext } from '@helpers/user'
import Title from '@components/Utils/Title'
import { Form, TextField } from '@components/Elements/FormElements'
import { Button } from '@components/Elements/Button'
import Alert from '@components/Elements/Alert'
import validationSchema from './validation'

const defaultValues: FormValues = {
  email: ''
}

const SignInPage = (props: SignInProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { setUser } = useContext(UserContext)

  const { setSession } = useClerk()
  const signIn = useSignIn()
  const { startMagicLinkFlow } = useMagicLink(signIn)

  const goToSignUpPage = useCallback(
    e => {
      e.preventDefault()
      props.signUp(true)
    },
    [props]
  )

  const handleSubmit = useCallback(
    async ({ email }: FormValues) => {
      setLoading(true)

      const si = await signIn.create({ identifier: email })
      const { email_address_id } = si.supportedFirstFactors.find(
        ff => ff.strategy === 'email_link' && ff.safe_identifier === email
      )
      const res = await startMagicLinkFlow({
        emailAddressId: email_address_id,
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
      })

      console.log(email)

      try {
        // query backend

        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}users?awsSub=${cognitoResponse.attributes.sub}`
        // )
        // const {
        //   data: [user]
        // } = await response.json()

        // setUser({
        //   ...user,
        //   jwt_token: cognitoResponse.signInUserSession.idToken.jwtToken
        // })

        Router.replace(props.route ? props.route : '/dashboard')
      } catch ({ code, message }) {
        setError(
          // message ||
          'An unexpected error occurred. Please refresh the page and try again.'
        )
      } finally {
        setLoading(false)
      }
    },
    [props.route, setUser]
  )

  return (
    <>
      <Title typed>./sign-in</Title>
      <div className='py-12 bg-secondary text-primary md:py-24 dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto'>
          <p>
            Don&apos;t have an account?&nbsp;
            <button className='hover:underline' onClick={goToSignUpPage}>
              Create one
            </button>
            .
          </p>
          <div className='md:max-w-lg md:w-1/2 membership'>
            {error && (
              <Alert icon color='danger' className='mt-4'>
                {error}
              </Alert>
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
                type='email'
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
  route?: string
  signUp: Dispatch<SetStateAction<boolean>>
}

export default SignInPage
