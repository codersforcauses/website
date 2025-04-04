"use client"

import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useTheme } from "next-themes"
import * as React from "react"

import { env } from "~/env"

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_API

const UWA_COORDS: [number, number] = [115.816986, -31.98097] // [lng, lat]

const Map = () => {
  const { resolvedTheme: theme } = useTheme()

  const mapContainer = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const styledMap = `mapbox://styles/mapbox/${theme === "dark" ? "dark" : "light"}-v11`

    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: styledMap,
      center: UWA_COORDS,
      minZoom: 9,
      zoom: 9,
      maxZoom: 18.5,
      pitch: 30,
      antialias: true,
      cooperativeGestures: true,
      attributionControl: false,
    })

    map.on("load", () => {
      map.resize()

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers
      let labelLayerId
      for (let i = 0; i < layers?.length; i++) {
        if (layers[i]?.type === "symbol" && (layers[i] as mapboxgl.SymbolLayer)?.layout?.["text-field"]) {
          labelLayerId = layers[i]?.id
          break
        }
      }

      // 3d buildings
      map.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 17.5,
          paint: {
            "fill-extrusion-color": theme === "dark" ? "#333" : "#bbb",

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "height"]],
            "fill-extrusion-base": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "min_height"]],
            "fill-extrusion-opacity": 0.6,
          },
        },

        labelLayerId,
      )

      // add marker for clubroom location
      new mapboxgl.Marker({ color: "#000000" }).setLngLat(UWA_COORDS).addTo(map)

      // button for full screen map
      map.addControl(new mapboxgl.FullscreenControl())

      // button to improve the map
      map.addControl(new mapboxgl.AttributionControl({ compact: true }))

      // fly to animation
      setTimeout(() => {
        map.flyTo({
          zoom: 13,
          speed: 0.6, // make the flying slow

          // This can be any easing function: it takes a number between
          // 0 and 1 and returns another number between 0 and 1.
          easing: (t) => t,

          // this animation is considered essential with respect to prefers-reduced-motion
          essential: true,
        })
      }, 1000)
    })

    return () => map.remove()
  }, [theme])

  return <div ref={mapContainer} className="h-full w-full" />
}

export default React.memo(Map)
