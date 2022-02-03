import { memo } from 'react'
import ImageGrid from 'components/Utils/ImageGrid'
import clients from 'data/clients.json'

const Clients = () => {
  const imageList = clients.map(client => ({
    src: client.logo,
    alt: client.name
  }))

  return <ImageGrid images={imageList} />
}

export default memo(Clients)
