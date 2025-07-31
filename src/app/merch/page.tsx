import Image from "next/image"

export default function MerchPage({ src }: { src: string }) {
  return (
    <>
      <div className="flex h-100 w-full ">
        <Image
          src={"/events/2024_agm.png"}
          alt="committee group photo wearing merch"
          width={2000}
          height={500}
          className="object-cover max-h-[500px] w-full"
        ></Image>
      </div>
      <div className="grid grid-cols-5 gap-4">{/* Merch items will be added here */}</div>
    </>
  )
}
