import Image from 'next/image'
import { getInitials } from '@helpers/user'

const Avatar = ({
  round = false,
  size = 'sm',
  name,
  ...props
}: AvatarProps) => {
  let dimension

  switch (size) {
    case 'md':
      dimension = 'w-16 h-16 text-3xl'
      break
    case 'lg':
      dimension = 'w-32 h-32 text-7xl'
      break
    default:
      dimension = 'w-8 h-8'
  }

  return (
    <div
      className={[
        'flex items-center justify-center text-mono bg-secondary dark:bg-primary border',
        round ? 'rounded-full' : '',
        dimension,
        props.className
      ]
        .join(' ')
        .trim()}
    >
      {props?.image ? (
        <Image src={props.image} alt={`${name}'s avatar`} />
      ) : (
        <p className='select-none'>{getInitials(name)}</p>
      )}
    </div>
  )
}
interface AvatarProps {
  round?: boolean
  name: string
  image?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default Avatar
