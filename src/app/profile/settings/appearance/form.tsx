"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { useTheme } from "next-themes"

import { cn } from "~/lib/utils"
import { Label } from "~/ui/label"

function LightMode({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div {...props} className={cn("size-full space-y-2 bg-white px-4 py-2", className)}>
      <div className="space-y-1">
        <div className="h-1.5 w-4/12 bg-neutral-700" />
        <div className="h-1.5 w-10/12 bg-neutral-700" />
      </div>
      <div className="grid grid-cols-12 gap-1 bg-neutral-100 px-2 py-px">
        <div className="col-span-4 h-2 w-full p-0.5">
          <div className="h-1 w-9/12 bg-neutral-700" />
        </div>
        <div className="col-span-4 h-2 w-full bg-white p-0.5">
          <div className="h-1 w-9/12 bg-neutral-700" />
        </div>
        <div className="col-span-4 h-2 w-full p-0.5">
          <div className="h-1 w-9/12 bg-neutral-700" />
        </div>
      </div>
      <div className="grid h-full grid-cols-12 gap-1 border border-black/25 p-1">
        <div className="col-span-8 space-y-1">
          <div className="h-1.5 w-3/12 bg-neutral-700" />
          <div className="h-1.5 w-10/12 bg-neutral-700" />
          <div className="h-1.5 w-4/12 bg-neutral-700" />
          <div className="flex flex-wrap gap-1 py-2">
            <div className="h-1.5 w-3/12 bg-neutral-700" />
            <div className="h-1.5 w-6/12 bg-neutral-700" />
            <div className="h-1.5 w-10/12 bg-neutral-700" />
          </div>
          <div className="flex flex-wrap gap-1 py-2">
            <div className="h-1.5 w-3/12 bg-neutral-700" />
            <div className="h-1.5 w-10/12 bg-neutral-700" />
            <div className="h-1.5 w-6/12 bg-neutral-700" />
          </div>
          <div className="flex flex-wrap gap-1 py-2">
            <div className="h-1.5 w-3/12 bg-neutral-700" />
            <div className="h-1.5 w-5/12 bg-neutral-700" />
            <div className="h-1.5 w-10/12 bg-neutral-700" />
            <div className="h-1.5 w-3/12 bg-neutral-700" />
          </div>
        </div>
        <div className="col-span-4 bg-neutral-600" />
      </div>
    </div>
  )
}

function DarkMode({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div {...props} className={cn("size-full space-y-2 bg-neutral-950 px-4 py-2", className)}>
      <div className="space-y-1">
        <div className="h-1.5 w-4/12 bg-neutral-100" />
        <div className="h-1.5 w-10/12 bg-neutral-100" />
      </div>
      <div className="grid grid-cols-12 gap-1 bg-neutral-800 px-2 py-px">
        <div className="col-span-4 h-2 w-full p-0.5">
          <div className="h-1 w-9/12 bg-neutral-100" />
        </div>
        <div className="col-span-4 h-2 w-full bg-neutral-950 p-0.5">
          <div className="h-1 w-9/12 bg-neutral-100" />
        </div>
        <div className="col-span-4 h-2 w-full p-0.5">
          <div className="h-1 w-9/12 bg-neutral-100" />
        </div>
      </div>
      <div className="grid h-full grid-cols-12 gap-1 border border-white/25 p-1">
        <div className="col-span-8 space-y-1">
          <div className="h-1.5 w-3/12 bg-neutral-100" />
          <div className="h-1.5 w-10/12 bg-neutral-100" />
          <div className="h-1.5 w-4/12 bg-neutral-100" />
          <div className="flex flex-wrap gap-1 py-2">
            <div className="h-1.5 w-3/12 bg-neutral-100" />
            <div className="h-1.5 w-6/12 bg-neutral-100" />
            <div className="h-1.5 w-10/12 bg-neutral-100" />
          </div>
          <div className="flex flex-wrap gap-1 py-2">
            <div className="h-1.5 w-3/12 bg-neutral-100" />
            <div className="h-1.5 w-10/12 bg-neutral-100" />
            <div className="h-1.5 w-6/12 bg-neutral-100" />
          </div>
          <div className="flex flex-wrap gap-1 py-2">
            <div className="h-1.5 w-3/12 bg-neutral-100" />
            <div className="h-1.5 w-5/12 bg-neutral-100" />
            <div className="h-1.5 w-10/12 bg-neutral-100" />
            <div className="h-1.5 w-3/12 bg-neutral-100" />
          </div>
        </div>
        <div className="col-span-4 bg-neutral-400" />
      </div>
    </div>
  )
}

export default function AppearanceForm() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-1">
      <Label htmlFor="theme" className="sr-only">
        Theme
      </Label>
      <RadioGroupPrimitive.Root
        id="theme"
        defaultValue="system"
        value={theme}
        onValueChange={setTheme}
        className="grid max-w-2xl gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        <div className="flex flex-col space-y-2">
          <RadioGroupPrimitive.Item asChild value="light" id="light">
            <div className="relative aspect-video w-full p-1 hover:opacity-90 focus:outline-none md:h-32">
              <LightMode className="overflow-hidden border" />
              <RadioGroupPrimitive.Indicator className="absolute inset-0 border-2 border-accent" />
            </div>
          </RadioGroupPrimitive.Item>
          <Label htmlFor="light" className="self-center">
            Light
          </Label>
        </div>
        <div className="flex flex-col space-y-2">
          <RadioGroupPrimitive.Item asChild value="dark" id="dark">
            <div className="relative aspect-video w-full p-1 hover:opacity-90 focus:outline-none md:h-32">
              <DarkMode className="overflow-hidden border" />
              <RadioGroupPrimitive.Indicator className="absolute inset-0 border-2 border-accent" />
            </div>
          </RadioGroupPrimitive.Item>
          <Label htmlFor="dark" className="self-center">
            Dark
          </Label>
        </div>
        <div className="flex flex-col space-y-2">
          <RadioGroupPrimitive.Item asChild value="system" id="system">
            <div className="relative aspect-video p-1 hover:opacity-90 focus:outline-none md:h-32">
              <div className="relative size-full overflow-hidden border">
                <LightMode
                  className="absolute z-[1]"
                  style={{
                    clipPath: "inset(0px 50% 0px 0px)",
                  }}
                />
                <DarkMode className="absolute" />
              </div>
              <RadioGroupPrimitive.Indicator className="absolute inset-0 border-2 border-accent" />
            </div>
          </RadioGroupPrimitive.Item>
          <Label htmlFor="system" className="self-center">
            System
          </Label>
        </div>
      </RadioGroupPrimitive.Root>
    </div>
  )
}
