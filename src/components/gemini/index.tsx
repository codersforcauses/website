"use client"
import { GoogleGeminiEffect } from "../ui/gemini"

const Gemini = () => {
  return (
    <div className="flex h-full items-center border dark:border-white/[0.2] dark:bg-black">
      <GoogleGeminiEffect className="display-block w-full py-4" />
    </div>
  )
}

export default Gemini
