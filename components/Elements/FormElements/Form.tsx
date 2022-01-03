import { PropsWithChildren, useMemo } from 'react'
import {
  FormProvider as HookFormProvider,
  SubmitHandler,
  useForm,
  UseFormProps
} from 'react-hook-form'
import { FormProps, FormProvider } from 'lib/context/form'

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
  const { register, formState, setFocus } = methods
  const value: FormProps = useMemo(
    () => ({
      dark,
      disabled,
      register,
      formState,
      setFocus
    }),
    [dark, disabled, formState, register, setFocus]
  )
  return (
    <HookFormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
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

export default Form

interface HookFormProps<T> extends UseFormProps {
  dark?: boolean
  disabled?: boolean
  className?: string
  onSubmit: SubmitHandler<T>
  showNote?: boolean
}
