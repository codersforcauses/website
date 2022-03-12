import { Button } from '@components/Elements/Button'

const MembershipLoading = () => (
  <div className='py-12 md:py-24 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
    <div className='container px-3 mx-auto space-y-4'>
      <p>Don&apos;t have an account? Create one.</p>
      <div className='space-y-1 md:max-w-lg md:w-1/2 membership'>
        <p className='font-mono font-black'>
          Email
          <span className='opacity-50 select-none'>*</span>
        </p>
        <div className='w-full h-10 bg-alt-light dark:bg-primary animate-pulse' />
        <p className='text-sm text-opacity-75 text-primary dark:text-secondary'>
          We will send you an email with a magic link
        </p>
      </div>
      <Button fill type='button' className='px-8 max-w-max'>
        Sign-in
      </Button>
    </div>
  </div>
)

export default MembershipLoading
