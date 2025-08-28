import { Button } from "~/components/ui/button"

export default function Itinerary() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-6 sm:p-20">
      <h1 className="text-3xl font-bold text-center sm:text-left text-white">
        Welcome to <span className="text-secondary text-4xl">Hack for Home</span> with Coders for Causes
      </h1>
      <div className="bg-card border border-primary rounded-2xl flex justify-center items-center p-4 flex-wrap w-full">
        <p className="text-md text-white">What is happenning now:</p>
      </div>
      <div className="bg-card rounded-2xl flex justify-center items-center p-4 flex-wrap w-full">
        <p className="text-md text-white">What is happenning next:</p>
      </div>
      <Button type="button" variant="default">
        View full agenda
      </Button>
    </div>
  )
}
