import Image from 'next/image'
import { memo, useEffect, useState } from 'react'
import { ImageProps } from '@lib/types'
import { useTheme } from 'next-themes'

const randomise = () => {
  const options = [-1, 0, 1]
  return options[Math.floor(Math.random() * (2 - 0 + 1)) + 0]
}

const ImageGrid = ({ images }: ImageGridProps) => {
  const { resolvedTheme: theme, setTheme } = useTheme()
  const [imageList, setImageList] = useState<Array<ImageProps>>([])

  useEffect(() => {
    setImageList(images)
  }, [images])

  useEffect(() => {
    setImageList(images.sort(randomise).slice(0, images.length))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex h-24 gap-3 md:gap-12'>
      {imageList.map(image => (
        <div key={image.alt} className='relative w-full basis-1/2'>
          <a href={image.link}>
            <Image
              src={
                'dark' === theme
                  ? image.src
                  : image.srcDark === undefined || image.srcDark === ''
                    ? image.src
                    : image.srcDark
              }
              alt={image.alt}
              priority
              layout='fill'
              objectFit='contain'
              objectPosition='center'
              className='transition duration-300 grayscale contrast-[0.2] brightness-110 hover:filter-none'
            />
          </a>
        </div>
      ))}
    </div>
  )
}

interface ImageGridProps {
  images: Array<ImageProps>
}

export default memo(ImageGrid)
