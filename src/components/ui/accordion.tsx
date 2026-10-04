"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "~/lib/utils"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("flex w-full flex-col", className)} {...props} />
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cn("not-last:border-b", className)} {...props} />
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:after:border-ring group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-3 focus-visible:ring-muted-foreground/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          // "flex flex-1 items-start justify-between gap-4 py-4 text-left text-sm font-medium outline-none hover:underline focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
          className,
        )}
        {...props}
      >
        {children}
        <span
          data-slot="accordion-trigger-icon"
          className="material-symbols-sharp pointer-events-none size-4 shrink-0 translate-y-0.5 text-base! leading-none! transition-transform duration-100 group-data-panel-open:rotate-180"
        >
          keyboard_arrow_down
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
// function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
//   return (
//     <AccordionPrimitive.Header className="flex">
//       <AccordionPrimitive.Trigger
//         data-slot="accordion-trigger"
//         className={cn(
//           "focus-visible:ring-muted-foreground/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground py-2.5 text-left text-sm font-medium hover:underline focus-visible:ring-3 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50",
//           className,
//         )}
//         {...props}
//       >
//         {children}
//         <ChevronDownIcon
//           data-slot="accordion-trigger-icon"
//           className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
//         />
//         <ChevronUpIcon
//           data-slot="accordion-trigger-icon"
//           className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
//         />
//       </AccordionPrimitive.Trigger>
//     </AccordionPrimitive.Header>
//   )
// }

// function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
//   return (
//     <AccordionPrimitive.Panel
//       data-slot="accordion-content"
//       className="overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down"
//       {...props}
//     >
//       <div
//         className={cn(
//           "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0",
//           className,
//         )}
//       >
//         {children}
//       </div>
//     </AccordionPrimitive.Panel>
//   )
// }
function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
