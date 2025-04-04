import clients from "data/clients.json"

import { type ImageProps } from "~/lib/types"

import ImageGrid from "./image-grid"

interface Client {
  name: string
  logo: string
  dark_logo: string
}

const Clients = () => {
  const typedClients = clients as Client[]

  const imageList: ImageProps[] = typedClients.map(
    (client): ImageProps => ({
      src: client.logo,
      srcDark: client.dark_logo,
      alt: client.name,
    }),
  )

  return <ImageGrid images={imageList} />
}

export default Clients
