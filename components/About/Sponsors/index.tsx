import { memo } from 'react'
import ImageGrid from '@components/Utils/ImageGrid'
import sponsors from 'data/sponsors.json'
import { useTheme } from 'next-themes'

const Sponsors = () => {
  const { resolvedTheme: theme, setTheme } = useTheme()
  const imageList = sponsors.map(sponsor => ({
    src:
      'dark' === theme
        ? sponsor.logo
        : sponsor.dark_logo === ''
        ? sponsor.logo
        : sponsor.dark_logo,
    alt: sponsor.name
  }))

  return <ImageGrid images={imageList} />
}

export default memo(Sponsors)
