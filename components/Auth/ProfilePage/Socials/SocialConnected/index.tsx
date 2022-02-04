import { memo, useCallback, useState } from 'react'
import BrandIcons from '@elements/BrandIcons'
import { Socials } from '@helpers/global'

const SocialsConnected = ({
  dimensions = 24,
  socialLink,
  ...props
}: SocialsConnectedProps & { isEditing: boolean }) => {
  const [username, setUsername] = useState('')
  const [addSocial, setAddSocial] = useState(false)
  const toggle = useCallback(() => setAddSocial(prev => !prev), [])

  if (socialLink) {
    return (
      //     <div
      //       className={`rounded-0 py-2 px-4 relative flex items-center justify-center ${props.icon}`}
      //     >
      //       <BrandIcons
      //         dimensions={dimensions}
      //         icon={props.icon}
      //         className='absolute fill-current left-6'
      //       />
      //       <span>{socialLink}</span>
      //       {props.isEditing && (
      //         <button className='absolute inset-y-0 right-0 flex items-center justify-center px-2 border-0 rounded-none bg-danger text-primary'>
      //           <i className='material-icons-sharp'>delete_outline</i>
      //         </button>
      //       )}
      //     </div>
      //   )
      // } else if (props.isEditing) {
      //   return addSocial ? (
      <div
        className={`rounded-none border py-2 h-11 px-4 relative flex items-center justify-center ${props.icon}`}
      >
        <BrandIcons
          dimensions={dimensions}
          icon={props.icon}
          className='absolute fill-current left-6'
        />
        <input
          autoFocus
          name={`${props.name}-username`}
          className='absolute bg-transparent border-0 left-16'
        />
        <button
          className='absolute inset-y-0 flex px-2 border-0 right-11 text-primary bg-danger place-items-center'
          onClick={toggle}
        >
          <i className='material-icons-sharp'>close</i>
        </button>
        <button
          className='absolute inset-y-0 right-0 flex px-2 border-0 text-primary bg-secondary place-items-center'
          onClick={toggle}
        >
          <i className='material-icons-sharp'>check</i>
        </button>
      </div>
      // ) : (
      //   <button
      //     className={`relative flex px-4 m-0 place-items-center ${props.icon}`}
      //     onClick={toggle}
      //   >
      //     <BrandIcons
      //       dimensions={dimensions}
      //       icon={props.icon}
      //       className='absolute fill-current left-6'
      //     />
      //     {props.name}
      //   </button>
    )
  } else return null
}

export default memo(SocialsConnected)

export interface SocialsConnectedProps {
  name: string
  icon: Socials
  dimensions?: number
  socialLink?: string
}
