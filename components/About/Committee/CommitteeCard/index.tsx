import { Fragment } from 'react'
import Image from 'next/image'
import { ImageProps, Socials } from '@lib/types'
import BrandIcons from '@elements/BrandIcons'

const CommitteeCard = ({
  name,
  position,
  about,
  social,
  picture: { src, alt }
}: CardItemProps) => (
  <div className='relative flex group'>
    <div className='relative w-full h-96 md:h-64 lg:h-72'>
      <div className='w-full h-full animate-pulse bg-secondary dark:bg-alt-dark' />
      <Image
        priority
        src={src}
        alt={alt}
        layout='fill'
        objectFit='cover'
        objectPosition='top'
        className='w-full h-full'
      />
    </div>
    <div className='absolute inset-x-0 bottom-0 p-4 transition-opacity duration-300 opacity-0 text-secondary group-hover:bg-primary group-hover:opacity-100'>
      <p className='font-mono font-black'>{name}</p>
      <p className='mb-1 text-secondary/75'>{position}</p>
      <p className='text-sm'>{about}</p>
      <div className='flex items-center space-x-2'>
        {Object.keys(social).map(item => (
          <Fragment key={item}>
            {item === 'email' ? (
              <a
                // href={'mailto:' + social.email}
                className='flex self-center'
                // title={social.email}
              >
                <span className='material-icons-sharp'>email</span>
              </a>
            ) : (
              <a
                target='_blank'
                rel='noopener noreferrer'
                // href={social}
              >
                <BrandIcons
                  icon={item}
                  dimensions={20}
                  className='fill-current'
                />
              </a>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  </div>
)

type Social = Partial<Record<Socials, string>>

export interface CardItemProps {
  name: string
  position: string
  about: string
  social: Social
  picture: ImageProps
}

export default CommitteeCard
