"use client"

import Image from "next/image"
import { useState } from "react"

import { Heart } from "./icon"

type MerchItemProps = {
  image: string
  name: string
  price: number
  sizes: string[]
  isWishlisted: boolean
  onToggleWishlist: () => void
}

export function MerchItem({ image, name, price, sizes, isWishlisted, onToggleWishlist }: MerchItemProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  return (
    <div className=" border p-4 shadow-sm hover:shadow-md transition">
      <div className="relative">
        <Image src={image} alt={name} width={300} height={300} className="rounded-xl object-cover" />
        <button
          onClick={onToggleWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:scale-105 transition"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
      </div>

      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              selectedSize === size ? "bg-black text-white border-black" : "bg-white text-gray-700 hover:border-black"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
