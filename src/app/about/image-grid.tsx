import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"

import type { ImageProps } from "~/lib/types"

interface ImageGridProps {
  images: ImageProps[]
}

const ImageGrid = (props: ImageGridProps) => {
  const { theme } = useTheme()

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-8">
      {props.images.map((image) => (
        <div key={image.alt} className="relative aspect-video h-24 w-full">
          {image.link ? (
            <Link href={image.link} passHref>
              <Image
                src={theme === "dark" && image.srcDark ? image.srcDark : image.src}
                alt={image.alt}
                fill
                className="object-contain object-center brightness-110 contrast-[0.2] grayscale transition duration-300 hover:filter-none"
              />
            </Link>
          ) : (
            <Image
              src={theme === "dark" && image.srcDark ? image.srcDark : image.src}
              alt={image.alt}
              fill
              className="object-contain object-center brightness-110 contrast-[0.2] grayscale transition duration-300 hover:filter-none"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ImageGrid
