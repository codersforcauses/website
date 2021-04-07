import { memo } from 'react'
import ImageGrid from 'components/Utils/ImageGrid'
import sponsors from 'data/sponsors.json'

const Sponsors = () => {
  const imageList = sponsors.map(sponsor => ({
    src: sponsor.logo,
    alt: sponsor.name
  }))

  return <ImageGrid images={imageList} />
}

export default memo(Sponsors)
