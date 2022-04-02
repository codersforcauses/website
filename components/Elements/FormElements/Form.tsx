import { PropsWithChildren, useMemo } from 'react'
import {
  FormProvider as HookFormProvider,
  SubmitHandler,
  useForm,
  UseFormProps
} from 'react-hook-form'
import { FormProps, FormProvider } from './utils/form'

const Form = <T,>({
  dark,
  disabled,
  defaultValues,
  children,
  onSubmit,
  className,
  ...props
}: PropsWithChildren<HookFormProps<T>>) => {
  const methods = useForm({
    defaultValues,
    mode: 'onSubmit'
  })
  const { control, register, formState, setFocus } = methods
  const value: FormProps = useMemo(
    () => ({
      control,
      dark,
      disabled,
      register,
      formState,
      setFocus
    }),
    [control, dark, disabled, formState, register, setFocus]
  )
  return (
    <HookFormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          onSubmit as SubmitHandler<Record<string, any>>
        )}
        className={['flex flex-col space-y-4', className || 'mt-4'].join(' ')}
      >
        {props.showNote && (
          <p className='flex items-center font-mono text-primary/75 dark:text-secondary/75'>
            <span className='mr-2 select-none material-icons-sharp'>info</span>
            All fields with * are required
          </p>
        )}
        <FormProvider value={value}>{children}</FormProvider>
      </form>
    </HookFormProvider>
  )
}
interface HookFormProps<T> extends UseFormProps {
  dark?: boolean
  disabled?: boolean
  className?: string
  onSubmit: SubmitHandler<T>
  showNote?: boolean
}

export default Form
