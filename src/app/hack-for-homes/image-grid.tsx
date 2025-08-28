"use client"

import Image from "next/image"
import Link from "next/link"

import type { ImageProps } from "~/lib/types"
import { cn } from "~/lib/utils"

interface ImageGridProps {
  images: ImageProps[]
}

// render both light and dark versions of images if they exist and switch between them with media queries
// this is a hack to get around light mode images displaying instead of dark mode after refreshing the page
// i.e. leave the displaying up to the browser instead of ssr
const ImageGrid = (props: ImageGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-8">
      {props.images.map((image) => (
        <div key={image.alt} className="relative aspect-video h-24 w-full">
          {image.link ? (
            <Link href={image.link} passHref>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={cn(
                  !image.srcDark ? "block dark:block" : "block dark:hidden",
                  "object-contain object-center brightness-110 contrast-[0.2] grayscale transition duration-300 hover:filter-none",
                )}
              />
              {image.srcDark && (
                <Image
                  src={image.srcDark}
                  alt={image.alt}
                  fill
                  className="hidden object-contain object-center brightness-110 contrast-[0.2] grayscale transition duration-300 hover:filter-none dark:block"
                />
              )}
            </Link>
          ) : (
            <>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={cn(
                  !image.srcDark ? "block dark:block" : "block dark:hidden",
                  "object-contain object-center brightness-110 contrast-[0.2] grayscale transition duration-300 hover:filter-none",
                )}
              />
              {image.srcDark && (
                <Image
                  src={image.srcDark}
                  alt={image.alt}
                  fill
                  className="hidden object-contain object-center brightness-110 contrast-[0.2] grayscale transition duration-300 hover:filter-none dark:block"
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ImageGrid
