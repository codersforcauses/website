"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { type ImageProps } from "~/lib/types"

interface ImageGridProps {
  images: ImageProps[]
}

const ImageGrid = (props: ImageGridProps) => {
  const { theme } = useTheme()

  return (
    <div className="flex h-24 gap-3 md:gap-12">
      {props.images.map((image) => (
        <div key={image.alt} className="relative w-full basis-1/2">
          <Image
            src={theme === "dark" && image.srcDark ? image.srcDark : image.src}
            alt={image.alt}
            priority
            fill
            className="object-contain object-center brightness-110 contrast-[0.2] grayscale transition duration-300 hover:filter-none"
          />
        </div>
      ))}
    </div>
  )
}

export default ImageGrid
