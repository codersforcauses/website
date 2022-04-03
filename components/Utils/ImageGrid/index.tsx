import Image from 'next/image'
import { memo, useEffect, useState } from 'react'
import { ImageProps } from '@lib/types'

const randomise = () => {
  const options = [-1, 0, 1]
  return options[Math.floor(Math.random() * (2 - 0 + 1)) + 0]
}

const ImageGrid = ({ images }: ImageGridProps) => {
  const [imageList, setImageList] = useState<Array<ImageProps>>([])

  useEffect(() => {
    setImageList(images.sort(randomise).slice(0, images.length))
  }, [images])

  return (
    <div className='flex flex-wrap gap-3 md:gap-12'>
      {imageList.map(image => (
        <div
          key={image.alt}
          className='relative flex-grow w-full h-24 basis-1/4'
        >
          <Image
            src={image.src}
            alt={image.alt}
            priority
            layout='fill'
            objectFit='contain'
            objectPosition='center'
            className='transition duration-300 grayscale contrast-[0.2] brightness-110 hover:filter-none'
          />
        </div>
      ))}
    </div>
  )
}

interface ImageGridProps {
  images: Array<ImageProps>
}

export default memo(ImageGrid)
