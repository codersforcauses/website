import { useCallback, useContext, useState } from 'react'
import Spinner from 'components/Elements/Spinner'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  studentNumber: '',
  password: '',
  isGuildMember: false
})

const UWAStudent = (props: Props & FormikProps<FormValues>) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const setPassVisible = useCallback(
    () => setPasswordVisible(prev => !prev),
    []
  )

  return (
    <Form>
      <UncontrolledAlert color='success' className='rounded-0'>
        If you are a UWA student, you can sign up using your pheme login
        credentials. If not or you wish to join using another email, please
        register using &apos;Email Sign-up&apos;.
      </UncontrolledAlert>
      <UncontrolledAlert
        isOpen={!!props.error}
        toggle={props.closeError}
        color='danger'
        className='rounded-0'
      >
        {props.error}
      </UncontrolledAlert>
      <FormGroup>
        <Label for='studentNumber' className='text-monospace'>
          UWA Student Number
        </Label>
        <Input
          type='text'
          bsSize='lg'
          tag={Field}
          autoComplete='username'
          disabled={props.loading}
          placeholder='211234567'
          id='studentNumber'
          name='studentNumber'
          value={props.values.studentNumber}
          invalid={props.errors.studentNumber && props.touched.studentNumber}
          className='rounded-0 text-primary border-primary'
        />
        <FormFeedback>{props.errors.studentNumber}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for='password' className='text-monospace'>
          Password
        </Label>
        <InputGroup>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            bsSize='lg'
            tag={Field}
            disabled={props.loading}
            placeholder='********'
            id='password'
            name='password'
            value={props.values.password}
            invalid={props.errors.password && props.touched.password}
            className='rounded-0 text-primary border-primary border-right-0'
          />
          <InputGroupAddon addonType='append'>
            <Button
              outline
              color='primary'
              disabled={props.loading}
              className='rounded-0 border-left-0 text-primary bg-secondary d-flex align-items-center justify-content-center'
              onClick={setPassVisible}
            >
              <i className='material-icons-sharp'>
                {passwordVisible ? 'visibility' : 'visibility_off'}
              </i>
            </Button>
          </InputGroupAddon>
          <FormFeedback>{props.errors.password}</FormFeedback>
        </InputGroup>
      </FormGroup>
      <FormGroup check className='mb-3'>
        <Label check>
          <Input
            type='checkbox'
            tag={Field}
            disabled={props.loading}
            id='isGuildMember'
            name='isGuildMember'
            checked={props.values.isGuildMember}
          />
          I am a{' '}
          <a
            href='https://www.uwastudentguild.com/the-guild/join-us'
            target='_blank'
            rel='noopener noreferrer'
            className={`text-${isDark ? 'secondary' : 'primary'}`}
          >
            UWA Guild Member
          </a>
        </Label>
      </FormGroup>
      <Button
        type='submit'
        size='lg'
        outline={isDark}
        color={isDark ? 'secondary' : 'primary'}
        disabled={props.loading}
        className='px-4 rounded-0 d-flex align-items-center text-monospace'
      >
        Sign Up
        {props.loading && (
          <Spinner color='secondary' size='sm' className='ml-2' />
        )}
      </Button>
    </Form>
  )
}

export default withFormik<Props, FormValues>({
  handleSubmit: (values, bag) => bag.props.handleSubmit(values, bag),
  mapPropsToValues,
  validationSchema
})(UWAStudent)

interface FormValues {
  studentNumber: string
  password: string
  isGuildMember: boolean
}
interface Props {
  handleSubmit: (values, bag) => void
  closeError: () => void
  error: string
  loading: boolean
}
