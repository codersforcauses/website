import { memo } from 'react'
import ImageGrid from '@components/Utils/ImageGrid'
import specialThanks from 'data/specialThanks.json'

const SpecialThanks = () => {
  const imageList = specialThanks.map(thnx => ({
    src: thnx.logo,
    alt: thnx.name
  }))

  return <ImageGrid images={imageList} />
}

export default memo(SpecialThanks)
