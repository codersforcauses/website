import { AnimatePresence, motion } from "motion/react"

import { cn } from "~/lib/utils"
import { Button } from "~/ui/button"
import { Loader } from "~/ui/loader"

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  loading: boolean
  children: string
}

export default function SubmitButton({ children, className, loading, type = "submit", ...props }: SubmitButtonProps) {
  return (
    <Button type={type} {...props} className={cn("relative w-full", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={children}
          transition={{ type: "spring", duration: 0.2, bounce: 0 }}
          initial={{ opacity: 0, y: -36 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 36 }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
      {loading && <Loader opacityBase={0} opacityMid={0.75} opacityPeak={1} className="absolute right-4" />}
    </Button>
  )
}
