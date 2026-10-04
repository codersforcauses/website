"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "~/lib/utils"
import { mapgl } from "./map-library"
import { useMap } from "./hooks"
import type { MapCoordinates, LngLatCoordinates } from "./types"
import { Button } from "~/ui/button"

type MarkerContextValue = {
  markerRef: React.RefObject<mapboxgl.Marker | null>
  markerElementRef: React.RefObject<HTMLDivElement | null>
  map: mapboxgl.Map | null
  // State triggers re-render when marker element is ready.
  // Refs don't cause re-renders, so children would see null without this.
  isMounted: boolean
}

type MapMarkerProps = {
  coordinates: MapCoordinates
  children: React.ReactNode
  onClick?: (e: MouseEvent) => void
  onMouseEnter?: (e: MouseEvent) => void
  onMouseLeave?: (e: MouseEvent) => void
  onDragStart?: (lngLat: LngLatCoordinates) => void
  onDrag?: (lngLat: LngLatCoordinates) => void
  onDragEnd?: (lngLat: LngLatCoordinates) => void
  draggable?: boolean
  offset?: [number, number]
  rotation?: number
  rotationAlignment?: "map" | "viewport" | "auto"
  pitchAlignment?: "map" | "viewport" | "auto"
}

type MarkerCallbacks = {
  onClick?: (e: MouseEvent) => void
  onMouseEnter?: (e: MouseEvent) => void
  onMouseLeave?: (e: MouseEvent) => void
  onDragStart?: (lngLat: LngLatCoordinates) => void
  onDrag?: (lngLat: LngLatCoordinates) => void
  onDragEnd?: (lngLat: LngLatCoordinates) => void
}

type MarkerContentProps = {
  children?: React.ReactNode
  className?: string
}

type MarkerPopupProps = {
  children: React.ReactNode
  className?: string
  closeButton?: boolean
  offset?: number | [number, number]
  maxWidth?: string
}

type MarkerTooltipProps = {
  children: React.ReactNode
  className?: string
  offset?: number | [number, number]
  maxWidth?: string
}

type MarkerLabelProps = {
  children: React.ReactNode
  className?: string
  position?: "top" | "bottom"
}

type MarkerLabelPosition = "top" | "bottom"

type MarkerStatusColor = "green" | "red" | "yellow" | "blue"

type MarkerAvatarProps = {
  src: string
  alt: string
  size?: number
  online?: boolean
  statusColor?: MarkerStatusColor
  className?: string
}

type MarkerAvatarPinProps = {
  src: string
  alt: string
  size?: number
  borderWidth?: number
  className?: string
}

const DEFAULT_DRAGGABLE = false
const DEFAULT_CLOSE_BUTTON = false
const DEFAULT_POPUP_OFFSET = 16
const DEFAULT_TOOLTIP_OFFSET = 16
const DEFAULT_LABEL_POSITION: MarkerLabelPosition = "top"
const DEFAULT_AVATAR_SIZE = 40
const DEFAULT_STATUS_COLOR: MarkerStatusColor = "green"
const DEFAULT_AVATAR_PIN_SIZE = 56
const DEFAULT_AVATAR_PIN_BORDER_WIDTH = 4

const LABEL_POSITION_CLASSES: Record<MarkerLabelPosition, string> = {
  top: "bottom-full mb-1",
  bottom: "top-full mt-1",
}

const STATUS_COLORS: Record<MarkerStatusColor, string> = {
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  blue: "bg-blue-500",
}

const MarkerContext = React.createContext<MarkerContextValue | null>(null)

const useMarkerContext = () => {
  const context = React.useContext(MarkerContext)
  if (!context) {
    throw new Error("Marker components must be used within MapMarker")
  }
  return context
}

export const MapMarker = ({
  coordinates,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onDragStart,
  onDrag,
  onDragEnd,
  draggable = DEFAULT_DRAGGABLE,
  offset,
  rotation,
  rotationAlignment,
  pitchAlignment,
}: MapMarkerProps) => {
  const { map, isLoaded } = useMap()
  const markerRef = React.useRef<mapboxgl.Marker | null>(null)
  const markerElementRef = React.useRef<HTMLDivElement | null>(null)
  const [isMounted, setIsMounted] = React.useState(false)

  const callbacksRef = React.useRef<MarkerCallbacks>({
    onClick,
    onMouseEnter,
    onMouseLeave,
    onDragStart,
    onDrag,
    onDragEnd,
  })

  React.useEffect(() => {
    callbacksRef.current = { onClick, onMouseEnter, onMouseLeave, onDragStart, onDrag, onDragEnd }
  }, [onClick, onMouseEnter, onMouseLeave, onDragStart, onDrag, onDragEnd])

  React.useEffect(() => {
    if (!map || !isLoaded || !map.getContainer?.() || !map.getCanvasContainer?.()) {
      return
    }

    const container = document.createElement("div")
    markerElementRef.current = container

    const marker = new mapgl.Marker({
      element: container,
      draggable,
      offset,
      rotation,
      rotationAlignment,
      pitchAlignment,
    })
      .setLngLat(coordinates)
      .addTo(map)

    markerRef.current = marker

    const handleClick = (e: MouseEvent) => {
      callbacksRef.current.onClick?.(e)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      callbacksRef.current.onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      callbacksRef.current.onMouseLeave?.(e)
    }

    const handleDragStart = () => {
      const lngLat = markerRef.current?.getLngLat()
      if (lngLat) {
        callbacksRef.current.onDragStart?.({ lng: lngLat.lng, lat: lngLat.lat })
      }
    }

    const handleDrag = () => {
      const lngLat = markerRef.current?.getLngLat()
      if (lngLat) {
        callbacksRef.current.onDrag?.({ lng: lngLat.lng, lat: lngLat.lat })
      }
    }

    const handleDragEnd = () => {
      const lngLat = markerRef.current?.getLngLat()
      if (lngLat) {
        callbacksRef.current.onDragEnd?.({ lng: lngLat.lng, lat: lngLat.lat })
      }
    }

    container.addEventListener("click", handleClick)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    marker.on("dragstart", handleDragStart)
    marker.on("drag", handleDrag)
    marker.on("dragend", handleDragEnd)

    setIsMounted(true)

    return () => {
      container.removeEventListener("click", handleClick)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)

      marker.off("dragstart", handleDragStart)
      marker.off("drag", handleDrag)
      marker.off("dragend", handleDragEnd)

      marker.remove()
      markerRef.current = null
      markerElementRef.current = null
      setIsMounted(false)
    }
  }, [map, isLoaded])

  React.useEffect(() => {
    if (!markerRef.current) {
      return
    }

    markerRef.current.setLngLat(coordinates)
  }, [coordinates])

  React.useEffect(() => {
    if (!markerRef.current) {
      return
    }

    markerRef.current.setDraggable(draggable)
  }, [draggable])

  React.useEffect(() => {
    if (!markerRef.current) {
      return
    }

    if (offset) {
      markerRef.current.setOffset(offset)
    }
  }, [offset])

  React.useEffect(() => {
    if (!markerRef.current) {
      return
    }

    if (rotation !== undefined) {
      markerRef.current.setRotation(rotation)
    }
  }, [rotation])

  React.useEffect(() => {
    if (!markerRef.current) {
      return
    }

    if (rotationAlignment) {
      markerRef.current.setRotationAlignment(rotationAlignment)
    }
  }, [rotationAlignment])

  React.useEffect(() => {
    if (!markerRef.current) {
      return
    }

    if (pitchAlignment) {
      markerRef.current.setPitchAlignment(pitchAlignment)
    }
  }, [pitchAlignment])

  return (
    <MarkerContext.Provider value={{ markerRef, markerElementRef, map, isMounted }}>{children}</MarkerContext.Provider>
  )
}

const DefaultMarkerIcon = () => {
  return <div className="shadow-lg relative h-4 w-4 rounded-full border-2 border-white bg-blue-500" />
}

export const MarkerContent = ({ children, className }: MarkerContentProps) => {
  const { markerElementRef, isMounted } = useMarkerContext()

  if (!isMounted || !markerElementRef.current) {
    return null
  }

  return createPortal(
    <div className={cn("relative cursor-pointer", className)}>{children || <DefaultMarkerIcon />}</div>,
    markerElementRef.current,
  )
}

export const MarkerPopup = ({
  children,
  className,
  closeButton = DEFAULT_CLOSE_BUTTON,
  offset = DEFAULT_POPUP_OFFSET,
  maxWidth,
}: MarkerPopupProps) => {
  const { markerRef, isMounted } = useMarkerContext()
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const popupRef = React.useRef<mapboxgl.Popup | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (!isMounted || !markerRef.current) {
      return
    }

    const container = document.createElement("div")
    containerRef.current = container

    const popup = new mapgl.Popup({
      offset,
      closeButton: false,
      className: "custom-map-popup",
    })
      .setMaxWidth(maxWidth || "none")
      .setDOMContent(container)

    popupRef.current = popup
    markerRef.current.setPopup(popup)
    setMounted(true)

    return () => {
      popup.remove()
      popupRef.current = null
      containerRef.current = null
      setMounted(false)
    }
  }, [isMounted, offset, maxWidth])

  const handleClose = () => {
    popupRef.current?.remove()
  }

  if (!mounted || !containerRef.current) {
    return null
  }

  return createPortal(
    <div className={cn("relative animate-in border bg-background p-3 text-foreground fade-in-0 zoom-in-95", className)}>
      {closeButton && (
        <Button
          type="button"
          size="icon-xs"
          variant="ghost"
          aria-label="Close popup"
          className="absolute top-1 right-1 z-10 opacity-70 hover:opacity-100"
          onClick={handleClose}
        >
          <span aria-hidden className="material-symbols-sharp animate-spin text-base! leading-none!">
            close
          </span>
        </Button>
      )}
      {children}
    </div>,
    containerRef.current,
  )
}

export const MarkerTooltip = ({
  children,
  className,
  offset = DEFAULT_TOOLTIP_OFFSET,
  maxWidth,
}: MarkerTooltipProps) => {
  const { markerRef, markerElementRef, map, isMounted } = useMarkerContext()
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const popupRef = React.useRef<mapboxgl.Popup | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (!isMounted || !markerRef.current || !markerElementRef.current || !map) {
      return
    }

    const container = document.createElement("div")
    containerRef.current = container

    const popup = new mapgl.Popup({
      offset,
      closeOnClick: true,
      closeButton: false,
      className: "custom-map-popup",
    })
      .setMaxWidth(maxWidth || "none")
      .setDOMContent(container)

    popupRef.current = popup

    const markerElement = markerElementRef.current
    const marker = markerRef.current

    const handleMouseEnter = () => {
      popup.setLngLat(marker.getLngLat()).addTo(map)
    }

    const handleMouseLeave = () => {
      popup.remove()
    }

    markerElement.addEventListener("mouseenter", handleMouseEnter)
    markerElement.addEventListener("mouseleave", handleMouseLeave)
    setMounted(true)

    return () => {
      markerElement.removeEventListener("mouseenter", handleMouseEnter)
      markerElement.removeEventListener("mouseleave", handleMouseLeave)
      popup.remove()
      popupRef.current = null
      containerRef.current = null
      setMounted(false)
    }
  }, [isMounted, map, offset, maxWidth])

  if (!mounted || !containerRef.current) {
    return null
  }

  return createPortal(
    <div className={cn("animate-in bg-foreground px-2 py-1 text-xs text-background fade-in-0 zoom-in-95", className)}>
      {children}
    </div>,
    containerRef.current,
  )
}

export const MarkerLabel = ({ children, className, position = DEFAULT_LABEL_POSITION }: MarkerLabelProps) => {
  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
        "text-[10px] font-medium text-foreground",
        LABEL_POSITION_CLASSES[position],
        className,
      )}
    >
      {children}
    </div>
  )
}

export const MarkerAvatar = ({
  src,
  alt,
  size = DEFAULT_AVATAR_SIZE,
  online,
  statusColor = DEFAULT_STATUS_COLOR,
  className,
}: MarkerAvatarProps) => {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute animate-pulse rounded-full bg-primary/10"
        style={{
          width: size * 1.4,
          height: size * 1.4,
        }}
      />

      <div
        className={cn("shadow-lg relative overflow-hidden rounded-full border-2 border-background", className)}
        style={{ width: size, height: size }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>

      {online !== undefined && (
        <div
          className={cn(
            "absolute right-0 bottom-0 rounded-full border-2 border-background",
            STATUS_COLORS[statusColor],
            online && "animate-pulse",
          )}
          style={{
            width: size * 0.25,
            height: size * 0.25,
          }}
        />
      )}
    </div>
  )
}

export const MarkerAvatarPin = ({
  src,
  alt,
  size = DEFAULT_AVATAR_PIN_SIZE,
  borderWidth = DEFAULT_AVATAR_PIN_BORDER_WIDTH,
  className,
}: MarkerAvatarPinProps) => {
  const pinSize = size * 0.32
  const pinOffset = pinSize * 0.35

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div
        className="shadow-lg overflow-hidden rounded-full border-background bg-background"
        style={{
          width: size,
          height: size,
          borderWidth,
          borderStyle: "solid",
        }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
      <div
        className="absolute rotate-45 rounded-sm bg-background"
        style={{
          width: pinSize,
          height: pinSize,
          bottom: -pinOffset,
        }}
      />
    </div>
  )
}
