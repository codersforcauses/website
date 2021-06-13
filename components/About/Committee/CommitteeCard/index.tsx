import { Fragment } from 'react'
import { ImageProps } from '@helpers/global'
import BrandIcons from '@components/Elements/BrandIcons'

const replaceImage = (src: string, nameList: Array<string>, prob: number) => {
  if (
    nameList.some((name: string) => src.includes(name)) &&
    Math.random() < prob
  ) {
    return src.split('.')[0].concat('-1').concat('.jpg')
  }
  return src
}

const CommitteeCard = ({
  name,
  position,
  about,
  social,
  picture: { src, alt }
}: CardItemProps) => (
  <div className='relative flex'>
    <img
      width='100%'
      src={replaceImage(src, ['jerry'], 0.05)}
      alt={alt}
      className='flex-grow'
    />
    <div className='absolute inset-0 p-4 transition-opacity duration-300 bg-opacity-0 opacity-0 text-secondary bg-primary hover:bg-opacity-80 hover:opacity-100'>
      <p className='font-mono font-black'>{name}</p>
      <p className='mb-1'>{position}</p>
      <p className='text-sm'>{about}</p>
      <div className='flex items-center space-x-2'>
        {Object.keys(social).map(item => (
          <Fragment key={item}>
            {item === 'email' ? (
              <a
                href={'mailto:' + social.email}
                className='flex self-center'
                title={social.email}
              >
                <span className='material-icons-sharp'>email</span>
              </a>
            ) : (
              <a
                key={item}
                target='_blank'
                rel='noopener noreferrer'
                href={social[item]}
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

type SocialType =
  | 'email'
  | 'discord'
  | 'github'
  | 'gitlab'
  | 'bitbucket'
  | 'linkedin'
  | 'facebook'
  | 'twitter'

type Social = Partial<Record<SocialType, string>>

export interface CardItemProps {
  name: string
  position: string
  about: string
  social: Social
  picture: ImageProps
}

export default CommitteeCard
