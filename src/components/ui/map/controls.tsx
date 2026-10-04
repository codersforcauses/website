"use client"

import * as React from "react"

import { cn } from "~/lib/utils"
import { Loader } from "~/ui/loader"
import { useMap } from "./hooks"
import { Button } from "~/ui/button"

type MapControlPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"

type MapControlsProps = {
  children: React.ReactNode
  position?: MapControlPosition
  className?: string
}

type ControlButtonProps = {
  onClick: () => void
  label: string
  children: React.ReactNode
  disabled?: boolean
}

type MapGeolocateProps = {
  onLocate?: (coords: GeolocationCoordinates) => void
}

type GeolocationCoordinates = {
  longitude: number
  latitude: number
}

const DEFAULT_POSITION: MapControlPosition = "bottom-right"
const ZOOM_STEP = 1
const ZOOM_DURATION = 300
const GEOLOCATE_ZOOM = 14
const GEOLOCATE_DURATION = 1500

const POSITION_CLASSES: Record<MapControlPosition, string> = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-10 left-2",
  "bottom-right": "bottom-2 right-2",
}
const DEFAULT_DISABLED = false
const DEFAULT_GEOLOCATE_PROPS: MapGeolocateProps = {}

const ControlGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col overflow-hidden border border-border bg-background [&>button:not(:last-child)]:border-b [&>button:not(:last-child)]:border-border">
      {children}
    </div>
  )
}

const ControlButton = ({ label, disabled = DEFAULT_DISABLED, ...props }: ControlButtonProps) => {
  return (
    <Button
      variant="ghost"
      type="button"
      aria-label={label}
      disabled={disabled}
      className={cn("size-10 border-0 md:size-8", disabled && "cursor-not-allowed")}
      {...props}
    />
  )
}

export const MapControls = ({ children, position = DEFAULT_POSITION, className }: MapControlsProps) => {
  const { isLoaded } = useMap()

  if (!isLoaded) {
    return null
  }

  return (
    <div className={cn("absolute z-10 flex flex-col gap-1.5", POSITION_CLASSES[position], className)}>{children}</div>
  )
}

export const MapZoom = () => {
  const { map } = useMap()

  const handleZoomIn = () => {
    map?.zoomTo(map.getZoom() + ZOOM_STEP, { duration: ZOOM_DURATION })
  }

  const handleZoomOut = () => {
    map?.zoomTo(map.getZoom() - ZOOM_STEP, { duration: ZOOM_DURATION })
  }

  return (
    <ControlGroup>
      <ControlButton onClick={handleZoomIn} label="Zoom in">
        <span className="material-symbols-sharp text-base! leading-none!">add</span>
      </ControlButton>
      <ControlButton onClick={handleZoomOut} label="Zoom out">
        <span className="material-symbols-sharp text-base! leading-none!">remove</span>
      </ControlButton>
    </ControlGroup>
  )
}

export const MapOrientation = () => {
  const { map, isLoaded } = useMap()
  const compassRef = React.useRef<SVGSVGElement>(null)

  React.useEffect(() => {
    if (!isLoaded || !map || !compassRef.current) {
      return
    }

    const compass = compassRef.current

    const updateRotation = () => {
      const bearing = map.getBearing()
      const pitch = map.getPitch()
      compass.style.transform = `rotateX(${pitch}deg) rotateZ(${-bearing}deg)`
    }

    map.on("rotate", updateRotation)
    map.on("pitch", updateRotation)
    updateRotation()

    return () => {
      map.off("rotate", updateRotation)
      map.off("pitch", updateRotation)
    }
  }, [isLoaded, map])

  const handleResetBearing = () => {
    map?.resetNorthPitch({ duration: ZOOM_DURATION })
  }

  return (
    <ControlGroup>
      <ControlButton onClick={handleResetBearing} label="Reset bearing to north">
        <svg
          ref={compassRef}
          viewBox="0 0 24 24"
          className="size-5 transition-transform duration-200"
          style={{ transformStyle: "preserve-3d" }}
        >
          <path d="M12 2L16 12H12V2Z" className="fill-red-500" />
          <path d="M12 2L8 12H12V2Z" className="fill-red-300" />
          <path d="M12 22L16 12H12V22Z" className="fill-muted-foreground/60" />
          <path d="M12 22L8 12H12V22Z" className="fill-muted-foreground/30" />
        </svg>
      </ControlButton>
    </ControlGroup>
  )
}

export const MapGeolocate = ({ onLocate }: MapGeolocateProps = DEFAULT_GEOLOCATE_PROPS) => {
  const { map } = useMap()
  const [isLocating, setIsLocating] = React.useState(false)

  const handleLocate = () => {
    setIsLocating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: GeolocationCoordinates = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          }
          map?.flyTo({
            center: [coords.longitude, coords.latitude],
            zoom: GEOLOCATE_ZOOM,
            duration: GEOLOCATE_DURATION,
          })
          onLocate?.(coords)
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
        },
      )
    }
  }

  return (
    <ControlGroup>
      <ControlButton onClick={handleLocate} label="Find my location" disabled={isLocating}>
        {isLocating ? (
          <Loader />
        ) : (
          <span className="material-symbols-sharp text-base! leading-none!">location_searching</span>
        )}
      </ControlButton>
    </ControlGroup>
  )
}

export const MapFullscreen = () => {
  const { map } = useMap()

  const handleFullscreen = () => {
    const container = map?.getContainer()
    if (!container) {
      return
    }
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void container.requestFullscreen()
    }
  }

  return (
    <ControlGroup>
      <ControlButton onClick={handleFullscreen} label="Toggle fullscreen">
        <span className="material-symbols-sharp text-base! leading-none!">fullscreen</span>
      </ControlButton>
    </ControlGroup>
  )
}
