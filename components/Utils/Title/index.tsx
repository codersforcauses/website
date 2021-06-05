import TypedText from '../TypedText'

const Title = ({
  children,
  typed = false
}: {
  children: string
  typed?: boolean
}) => (
  <div className='flex items-center py-24 font-mono text-secondary bg-primary'>
    <div className='container px-3 mx-auto'>
      <h1 className='text-3xl'>
        {typed ? <TypedText text={[children]} /> : children}
      </h1>
    </div>
  </div>
)

export default Title
