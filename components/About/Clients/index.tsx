import { memo } from 'react'
import ImageGrid from '@components/Utils/ImageGrid'
import clients from 'data/clients.json'
import { useTheme } from 'next-themes'

const Clients = () => {
  const { theme, setTheme } = useTheme()

  const imageList = clients.map(client => ({
    src:
      'dark' === theme
        ? client.logo
        : client.dark_logo === ''
        ? client.logo
        : client.dark_logo,
    alt: client.name
  }))

  return <ImageGrid images={imageList} />
}

export default memo(Clients)
