"use client"
import { GoogleGeminiEffect } from "../ui/gemini"

const Gemini = () => {
  return (
    <div className="flex h-full items-center border dark:border-none dark:bg-neutral-900">
      <GoogleGeminiEffect className="display-block w-full py-4" />
    </div>
  )
}

export default Gemini
