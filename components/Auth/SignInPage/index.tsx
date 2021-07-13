import {
  useState,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react'
import { Switch } from '@headlessui/react'
import { Auth } from 'aws-amplify'
import { SubmitHandler } from 'react-hook-form'
import Router from 'next/router'
import { useKeenSlider } from 'keen-slider/react'
import { phemeLogin } from '@helpers/phemeLogin'
import { UserContext } from '@helpers/user'
import Title from '@components/Utils/Title'
import UWAStudent from './UWAStudent'
import OtherMember from './OtherMember'
import 'keen-slider/keen-slider.min.css'

const SignInPage = (props: SignInProps) => {
  const [isUWAStudent, setIsUWAStudent] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    rubberband: false,
    controls: false,
    duration: 200,
    slideChanged(s) {
      setIsUWAStudent(!!!s.details().relativeSlide)
    }
  })

  useEffect(() => {
    !isUWAStudent ? slider?.next() : slider?.prev()
  }, [isUWAStudent, slider])

  const { setUser } = useContext(UserContext)

  const closeError = useCallback(() => setErrors(''), [])
  const goToSignUpPage = useCallback(
    e => {
      e.preventDefault()
      props.signUp(true)
    },
    [props]
  )

  const handleSubmit = useCallback(
    async values => {
      setLoading(true)

      const data = {
        username: values.email,
        password: values.password
      }
      try {
        if (isUWAStudent) {
          const phemeResponse = await phemeLogin(
            values.studentNumber,
            values.password,
            `${process.env.NEXT_PUBLIC_PHEME_URL}api/login`,
            process.env.NEXT_PUBLIC_PHEME_TOKEN!
          )

          if (!phemeResponse.success) throw new Error(phemeResponse.message)

          // reassign data to use values fetched from pheme login
          data.username = `${values.studentNumber}@student.uwa.edu.au`
          data.password = `${values.studentNumber}${process.env.NEXT_PUBLIC_PHEME_SALT}`
        }
        const cognitoResponse = await Auth.signIn(data.username, data.password)

        // query backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}users?awsSub=${cognitoResponse.attributes.sub}`
        )
        const {
          data: [user]
        } = await response.json()

        setUser({
          ...user,
          jwt_token: cognitoResponse.signInUserSession.idToken.jwtToken
        })

        Router.replace(props.route ? props.route : '/dashboard')
      } catch ({ code, message }) {
        if (code === 'UserNotConfirmedException') {
          setErrors(
            'To login into Coders for Causes, please click on the verification link sent to your email and try again.'
          )
        }
        setErrors(
          message ||
            'An unexpected error occurred. Please refresh the page and try again.'
        )
      } finally {
        setLoading(false)
      }
    },
    [isUWAStudent, props.route, setUser]
  )

  return (
    <>
      <Title typed>./sign-in</Title>
      <div className='py-12 bg-secondary text-primary md:py-24 dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto'>
          <p className='mb-4'>
            Don&apos;t have an account?&nbsp;
            <button className='hover:underline' onClick={goToSignUpPage}>
              Create one
            </button>
            .
          </p>
          <div className='md:max-w-lg md:w-1/2 membership'>
            <Switch
              checked={isUWAStudent}
              onChange={setIsUWAStudent}
              className='relative inline-flex flex-shrink-0 w-full h-10 max-w-sm transition-colors duration-200 ease-in-out bg-transparent border cursor-pointer border-primary focus:outline-none focus:ring focus:ring-accent focus:ring-inset dark:border-secondary'
            >
              <span className='sr-only'>Event timeline switcher</span>
              <span className='absolute flex items-center w-full h-full font-mono text-lg font-black z-5'>
                <span
                  className={`${
                    isUWAStudent ? 'text-secondary dark:text-primary' : ''
                  } w-1/2`}
                >
                  UWA Student
                </span>
                <span
                  className={`${
                    !isUWAStudent ? 'text-secondary dark:text-primary' : ''
                  } w-1/2`}
                >
                  Email Sign-in
                </span>
              </span>
              <span
                aria-hidden
                className={`${
                  isUWAStudent ? 'translate-x-0' : 'translate-x-full'
                } inline-block w-1/2 h-full transition duration-200 ease-in-out transform pointer-events-none bg-primary ring-0 dark:bg-secondary`}
              />
            </Switch>
            <div ref={sliderRef} className='keen-slider'>
              <div className='keen-slider__slide'>
                <UWAStudent
                  loading={loading}
                  error={errors}
                  disabled={!isUWAStudent}
                  handleSubmit={handleSubmit}
                />
              </div>
              <div className='keen-slider__slide'>
                <OtherMember
                  loading={loading}
                  error={errors}
                  disabled={isUWAStudent}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
          {/* <Col
            md={{ size: 5, offset: 1 }}
            className='d-none d-md-flex align-items-center'
          >
            <img
              src='/illustrations/sign_in.svg'
              alt='Coder Coding'
              className='img-fluid'
            />
          </Col> */}
        </div>
      </div>
    </>
  )
}

interface SignInProps {
  route?: string
  signUp: Dispatch<SetStateAction<boolean>>
}
interface SignIn<FormValues> {
  handleSubmit: SubmitHandler<FormValues>
  disabled: boolean
  error: string
  loading: boolean
}

export default SignInPage
export type { SignIn }
