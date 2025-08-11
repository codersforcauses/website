import Merch from "data/merch.json"
import Image from "next/image"

import { MerchItem } from "~/components/merch/item-card"

export default function MerchPage({ src }: { src: string }) {
  return (
    <>
      <div className=" h-100 w-full ">
        <Image
          src={"/events/2024_agm.png"}
          alt="committee group photo wearing merch"
          width={2000}
          height={500}
          className="object-cover max-h-[500px] w-full"
        ></Image>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,320px))] gap-4 p-4 md:p-8 justify-center ">
        {/* Merch items will be added here */}
        {Merch.map((item, index) => (
          <MerchItem key={index} image={item.image} name={item.name} price={item.price} sizes={item.sizes} />
        ))}
      </div>
    </>
  )
}
