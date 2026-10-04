import { UWA_COORDS } from "~/lib/constants"
import { Map } from "~/ui/map"
import { MapControls, MapZoom } from "~/ui/map/controls"
import { MapMarker, MarkerContent, MarkerPopup, MarkerTooltip } from "~/ui/map/marker"
import Committee from "./committee"
import Clients from "./clients"
import Sponsors from "./sponsors"

export default function AboutPage() {
  return (
    <>
      <section className="container mx-auto grid gap-4 px-4 py-12 md:py-16 lg:grid-cols-3">
        <div id="what_we_do">
          <h2 className="mb-4 scroll-m-20 font-mono text-3xl font-semibold tracking-tight">
            We build software for charities
          </h2>
          <p className="text-lg leading-normal">
            Coders for Causes is a not for profit organization that empowers charities and other not for profit
            organizations by connecting them with university students to develop technical solutions. We are a
            student-run club based in Perth, Western Australia with a wide range of clients.
          </p>
        </div>
        <div id="map" className="relative lg:col-span-2">
          <Map center={UWA_COORDS} minZoom={9} zoom={13} maxZoom={18.5}>
            <MapMarker coordinates={UWA_COORDS}>
              <MarkerContent>
                <span className="material-symbols-sharp text-3xl! leading-none! text-primary [font-variation-settings:'FILL'_1]!">
                  location_on
                </span>
              </MarkerContent>
              <MarkerTooltip>CFC clubroom</MarkerTooltip>
              <MarkerPopup>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">CFC clubroom</p>
                  <p className="text-xs text-muted-foreground">
                    Located in the UWA guild village on the first floor with UWA Venture.
                  </p>
                </div>
              </MarkerPopup>
            </MapMarker>
            <MapControls position="bottom-right">
              <MapZoom />
            </MapControls>
          </Map>
        </div>
      </section>
      <section id="committee" className="bg-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h3 className="mb-4 scroll-m-20 font-mono text-2xl font-semibold tracking-normal">Committee</h3>
          <Committee />
        </div>
      </section>
      <section className="container mx-auto flex flex-col gap-y-12 px-4 py-12 md:py-16">
        <h3 className="scroll-m-20 font-mono text-2xl font-semibold tracking-normal">Past clients</h3>
        <Clients />
        <h3 className="scroll-m-20 font-mono text-2xl font-semibold tracking-normal">Proudly supported by</h3>
        <Sponsors />
      </section>
    </>
  )
}
