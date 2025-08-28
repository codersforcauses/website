import sponsors from "data/hackathon2025/sponsors.json"

import { type ImageProps } from "~/lib/types"

import ImageGrid from "./image-grid"

interface Sponsor {
  name: string
  logo: string
  dark_logo?: string
  link?: string
}

const Sponsors = () => {
  const typedSponsor = sponsors as Sponsor[]

  const imageList: ImageProps[] = typedSponsor.map(
    (sponsor): ImageProps => ({
      src: sponsor.logo,
      srcDark: sponsor.dark_logo,
      alt: sponsor.name,
      link: sponsor.link,
    }),
  )

  return <ImageGrid images={imageList} />
}

export default Sponsors
