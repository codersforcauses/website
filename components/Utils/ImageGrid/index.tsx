/** @jsxImportSource @emotion/react */
import Image from 'next/image'
import { memo, useEffect, useState } from 'react'
import { ImageProps } from 'helpers/global'
import { styles } from './styles'

const randomise = () => {
  const options = [-1, 0, 1]
  return options[Math.floor(Math.random() * (2 - 0 + 1)) + 0]
}

const ImageGrid = ({ images }: ImageGridProps) => {
  const [imageList, setImageList] = useState<Array<ImageProps>>([])

  useEffect(() => {
    setImageList(images.sort(randomise).slice(0, images.length))
  }, [])

  return (
    <div css={styles(images.length)}>
      {imageList.map(image => (
        <Image
          key={image.alt}
          {...image}
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
