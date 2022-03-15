import { memo } from 'react'

const CreateButton = ({ name, description, ...props }: CreateButtonProps) => {
  return (
    <button
      type='button'
      className='flex p-3 text-left bg-alt-light dark:bg-primary hover:bg-primary hover:text-secondary hover:dark:bg-secondary hover:dark:text-primary focus:outline-none'
      onClick={props.handleClick}
    >
      <div className='flex flex-col flex-grow'>
        <span className='font-mono font-bold'>{name}</span>
        <span className='text-sm opacity-75'>{description}</span>
      </div>
      <span className='ml-4 text-sm material-icons-sharp'>north_east</span>
    </button>
  )
}

interface CreateButtonProps {
  name: string
  description: string
  handleClick: () => void
}

export default memo(CreateButton)
