"use client"

import { QRCodeSVG } from "qrcode.react"

export default function QRCode() {
  return (
    <div className="relative min-w-3xs">
      <QRCodeSVG
        value="https://reactjs.org/"
        bgColor="var(--background)"
        fgColor="var(--foreground)"
        imageSettings={{
          src: null,
          width: 32,
          height: 32,
          excavate: true,
        }}
        className="size-full"
      />
      <div className="absolute top-1/2 left-1/2 grid -translate-1/2 place-items-center font-mono text-xl font-semibold">
        cfc
      </div>
    </div>
  )
}
