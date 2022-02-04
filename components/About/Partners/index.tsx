import { memo } from 'react'
import ImageGrid from '@components/Utils/ImageGrid'
import partners from 'data/partners.json'

const Partners = () => {
  const imageList = partners.map(partner => ({
    src: partner.logo,
    alt: partner.name
  }))

  return <ImageGrid images={imageList} />
}

export default memo(Partners)
