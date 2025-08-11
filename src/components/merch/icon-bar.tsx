import { Button } from "~/components/ui/button"

export function IconBar() {
  return (
    <div className="flex items-center space-x-4 fixed z-50 mt-2 right-5 md:right-12 bg-black py-1 px-3 rounded-full">
      <Button variant="link-dark" size="icon">
        <span className="material-symbols-sharp text-neutral-50 ">search</span>
      </Button>
      <Button variant="link-dark" size="icon">
        <span className="material-symbols-sharp text-neutral-50 ">shopping_cart</span>
      </Button>
      {/* <Button variant="link-dark" size="icon">
        <span className="material-symbols-sharp text-neutral-50">favorite</span>
      </Button> */}
    </div>
  )
}
