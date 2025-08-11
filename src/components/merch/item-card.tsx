"use client"

import Image from "next/image"
import { useState } from "react"

type MerchItemProps = {
  image: string
  name: string
  price: number
  sizes: string[]
  isWishlisted?: boolean
  onToggleWishlist?: () => void
}

export function MerchItem({ image, name, price, sizes, isWishlisted, onToggleWishlist }: MerchItemProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  return (
    <div className=" border p-4 shadow-sm hover:shadow-md bg-neutral-50 transition flex flex-col items-center">
      <div className="relative">
        <Image src={image} alt={name} width={300} height={300} className="rounded-xl object-cover" />
        {isWishlisted && (
          <button
            onClick={onToggleWishlist}
            className="absolute top-2 right-2 p-2 rounded-full bg-neutral-50 shadow hover:scale-105 transition"
          >
            <span className={`material-symbols-sharp ${isWishlisted ? " text-red-500" : "text-gray-400"}`}>
              favorite
            </span>
          </button>
        )}
      </div>

      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>

      <div className="mt-2 flex flex-wrap gap-2 ">
        {sizes.map((size) => (
          <div key={size} className="px-3 py-1 bg-slate-50 text-black rounded-full border text-sm transition ">
            {size}
          </div>
        ))}
      </div>
    </div>
  )
}
