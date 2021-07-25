import Image from 'next/image'
import { memo, useEffect, useState } from 'react'
import { ImageProps } from '@helpers/global'

const randomise = () => {
  const options = [-1, 0, 1]
  return options[Math.floor(Math.random() * (2 - 0 + 1)) + 0]
}

const ImageGrid = ({ images }: ImageGridProps) => {
  const [imageList, setImageList] = useState<Array<ImageProps>>([])

  useEffect(() => {
    setImageList(images.sort(randomise).slice(0, images.length))
  }, [images])

  const cols = images.length === 3 ? 'grid-cols-3' : 'grid-cols-2 '

  // TODO: fix cols for image length
  return (
    <div
      className={`grid gap-12 place-items-center md:grid-rows-1 image-grid ${cols}`}
      style={{ gridTemplateColumns: `repeat(${images.length}, 1fr)` }}
    >
      {imageList.map(image => (
        <Image
          key={image.alt}
          src={image.src}
          alt={image.alt}
          layout='responsive'
          width={110}
          height={90}
          className='logo'
        />
      ))}
    </div>
  )
}
export default memo(ImageGrid)

interface ImageGridProps {
  images: Array<ImageProps>
}
