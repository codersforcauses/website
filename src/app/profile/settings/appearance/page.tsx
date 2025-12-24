import { Separator } from "~/ui/separator"
import AppearanceForm from "./form"

export default function AppearancePage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-mono text-lg font-medium">Appearance</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>
      <Separator className="md:max-w-2xl" />
      <AppearanceForm />
    </div>
  )
}
