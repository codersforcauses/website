"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { useTheme } from "next-themes"

import { Label } from "~/components/ui/label"
import { Separator } from "~/components/ui/separator"

export default function Appearance() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-mono text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>
      <Separator className="md:max-w-2xl" />
      <div className="space-y-1">
        <Label htmlFor="theme">Theme</Label>
        <RadioGroupPrimitive.Root
          id="theme"
          defaultValue="system"
          value={theme}
          onValueChange={(t) => setTheme(t)}
          className="grid max-w-2xl gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          <div className="flex flex-col space-y-2">
            <RadioGroupPrimitive.Item asChild value="light" id="light">
              <div className="relative aspect-video w-full p-1 focus:outline-none md:h-32">
                <div className="size-full space-y-2 overflow-hidden border bg-white px-4 py-2 hover:border-4">
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
                <RadioGroupPrimitive.Indicator className="absolute inset-0 border-2 border-muted-foreground" />
              </div>
            </RadioGroupPrimitive.Item>
            <Label htmlFor="light" className="self-center">
              Light
            </Label>
          </div>
          <div className="flex flex-col space-y-2">
            <RadioGroupPrimitive.Item asChild value="dark" id="dark">
              <div className="relative aspect-video w-full p-1 focus:outline-none md:h-32">
                <div className="size-full space-y-2 overflow-hidden border bg-neutral-950 px-4 py-2 hover:border-4">
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
                <RadioGroupPrimitive.Indicator className="absolute inset-0 border-2 border-muted-foreground" />
              </div>
            </RadioGroupPrimitive.Item>
            <Label htmlFor="dark" className="self-center">
              Dark
            </Label>
          </div>
          <div className="flex flex-col space-y-2">
            <RadioGroupPrimitive.Item asChild value="system" id="system">
              <div className="relative grid aspect-video w-full grid-cols-2 border p-1 hover:border-4 focus:outline-none md:h-32">
                <div className="size-full space-y-2 overflow-hidden bg-white py-2 pl-4">
                  <div className="space-y-1">
                    <div className="h-1.5 w-8/12 bg-neutral-700" />
                    <div className="h-1.5 w-full bg-neutral-700" />
                  </div>
                  <div className="grid grid-cols-6 gap-1 bg-neutral-100 py-px pl-2">
                    <div className="col-span-4 h-2 w-full  p-0.5">
                      <div className="h-1 w-9/12 bg-neutral-700" />
                    </div>
                    <div className="col-span-2 h-2 w-full bg-white py-0.5 pl-0.5">
                      <div className="h-1 w-full bg-neutral-700" />
                    </div>
                  </div>
                  <div className="grid h-full grid-cols-6 gap-1 border border-r-0 border-black/25 p-1 pr-0">
                    <div className="col-span-6 space-y-1">
                      <div className="h-1.5 w-4/12 bg-neutral-700" />
                      <div className="h-1.5 w-full bg-neutral-700" />
                      <div className="h-1.5 w-5/12 bg-neutral-700" />
                      <div className="flex flex-wrap gap-1 py-2">
                        <div className="h-1.5 w-4/12 bg-neutral-700" />
                        <div className="h-1.5 w-7/12 bg-neutral-700" />
                        <div className="h-1.5 w-full bg-neutral-700" />
                      </div>
                      <div className="flex flex-wrap gap-1 py-2">
                        <div className="h-1.5 w-4/12 bg-neutral-700" />
                        <div className="h-1.5 w-full bg-neutral-700" />
                        <div className="h-1.5 w-8/12 bg-neutral-700" />
                      </div>
                      <div className="flex flex-wrap gap-1 py-2">
                        <div className="h-1.5 w-4/12 bg-neutral-700" />
                        <div className="h-1.5 w-6/12 bg-neutral-700" />
                        <div className="h-1.5 w-full bg-neutral-700" />
                        <div className="h-1.5 w-4/12 bg-neutral-700" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="size-full space-y-2 overflow-hidden bg-neutral-950 py-2 pr-4">
                  <div className="space-y-1">
                    <div className="h-1.5 w-0 bg-neutral-100" />
                    <div className="h-1.5 w-8/12 bg-neutral-100" />
                  </div>
                  <div className="grid grid-cols-6 gap-1 bg-neutral-800 py-px pr-2">
                    <div className="col-span-2 h-2 w-full bg-neutral-950 py-0.5 pr-0.5">
                      <div className="h-1 w-5/12 bg-neutral-100" />
                    </div>
                    <div className="col-span-4 h-2 w-full p-0.5">
                      <div className="h-1 w-9/12 bg-neutral-100" />
                    </div>
                  </div>
                  <div className="grid h-full grid-cols-6 gap-1 border border-l-0 border-white/25 p-1 pl-0">
                    <div className="col-span-2 space-y-1">
                      <div className="h-1.5 w-3/12 bg-neutral-950" />
                      <div className="h-1.5 w-2/12 bg-neutral-100" />
                      <div className="h-1.5 w-3/12 bg-neutral-950" />
                      <div className="flex flex-wrap gap-1 py-2">
                        <div className="h-1.5 w-3/12 bg-neutral-950" />
                        <div className="h-1.5 w-6/12 bg-neutral-950" />
                        <div className="h-1.5 w-2/12 bg-neutral-100" />
                      </div>
                      <div className="flex flex-wrap gap-1 py-2">
                        <div className="h-1.5 w-11/12 bg-neutral-950" />
                        <div className="h-1.5 w-2/12 bg-neutral-100" />
                        <div className="h-1.5 w-6/12 bg-neutral-950" />
                      </div>
                      <div className="flex flex-wrap gap-1 py-2">
                        <div className="h-1.5 w-5/12 bg-neutral-950" />
                        <div className="h-1.5 w-11/12 bg-neutral-950" />
                        <div className="h-1.5 w-2/12 bg-neutral-100" />
                        <div className="h-1.5 w-6/12 bg-neutral-950" />
                      </div>
                    </div>
                    <div className="col-span-4 bg-neutral-600" />
                  </div>
                </div>
                <RadioGroupPrimitive.Indicator className="absolute inset-0 border-2 border-muted-foreground" />
              </div>
            </RadioGroupPrimitive.Item>
            <Label htmlFor="system" className="self-center">
              System
            </Label>
          </div>
        </RadioGroupPrimitive.Root>
      </div>
    </div>
  )
}
