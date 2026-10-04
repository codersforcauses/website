"use client"

import * as React from "react"
import { m, LazyMotion, domMax } from "motion/react"
import Image from "next/image"

import { cn } from "~/lib/utils"

interface Feature {
  step?: string
  title: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  autoPlayInterval?: number
  imageClassName?: string
}

export default function FeatureSteps({
  features,
  className,
  autoPlayInterval = 3000,
  imageClassName = "h-[400px]",
}: FeatureStepsProps) {
  const [state, setState] = React.useState({ feature: 0, tick: 0 })

  React.useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => ({
        feature: (prev.feature + 1) % features.length,
        tick: prev.tick + 1,
      }))
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [autoPlayInterval, state.feature, features.length])

  const currentFeature = state.feature
  const progressKey = state.tick

  return (
    <LazyMotion features={domMax}>
      <div className={cn("mx-auto flex w-full max-w-360 flex-col md:flex-row md:items-stretch", className)}>
        {/* Left Column: Feature List */}
        <div className="flex w-full flex-col divide-y divide-black/10 border border-black/10 md:w-1/2 dark:divide-white/10 dark:border-white/10">
          {features.map((feature, index) => (
            <m.div
              key={feature.title}
              layoutId={feature.title}
              onClick={() => {
                setState((prev) => ({ feature: index, tick: prev.tick + 1 }))
              }}
              className="relative cursor-pointer p-4 md:p-10"
            >
              <h3 className="text-base leading-none text-black md:text-lg dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-neutral-500">{feature.content}</p>
              {index === currentFeature && (
                <m.div
                  key={progressKey}
                  className="absolute bottom-0 left-0 h-px bg-black dark:bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: autoPlayInterval / 1000,
                    ease: "easeIn",
                  }}
                />
              )}
            </m.div>
          ))}
        </div>

        {/* Right Column: Image Display */}
        <div
          className={cn(
            "relative w-full overflow-hidden border border-t-0 border-black/10 p-4 md:w-1/2 md:border-t md:border-l-0 md:p-5 dark:border-white/10",
            imageClassName,
          )}
        >
          <m.div
            key={currentFeature}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-4 md:inset-5"
          >
            <Image
              src={features[currentFeature].image}
              alt={features[currentFeature].title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded object-cover"
            />
          </m.div>
        </div>
      </div>
    </LazyMotion>
  )
}
