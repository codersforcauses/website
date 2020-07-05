/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { styles } from './styles'

const property3D: mapboxgl.Layer = {
  id: '3d-buildings',
  source: 'composite',
  'source-layer': 'building',
  filter: ['==', 'extrude', 'true'],
  type: 'fill-extrusion',
  minzoom: 17.5,
  paint: {
    'fill-extrusion-color': '#333',
    // use an 'interpolate' expression to add a smooth transition effect to the
    // buildings as the user zooms in
    'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height']
    ],
    'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.6
  }
}

const Map = (props: { theme: Object }) => {
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_API

    const UWA_COORDS: [number, number] = [115.816986, -31.98097] // [lng, lat]

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: UWA_COORDS,
        minZoom: 9,
        zoom: 9,
        maxZoom: 18.5,
        pitch: 30,
        antialias: true
      })

      map.on('load', () => {
        setMap(map)
        map.resize()

        // 3-d buildings
        let labelLayerId
        const layers = map.getStyle().layers
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id
            break
          }
        }
        map.addLayer(property3D, labelLayerId)

        // add marker for clubroom location
        new mapboxgl.Marker({ color: '#000000' })
          .setLngLat(UWA_COORDS)
          .addTo(map)

        // button for full screen map
        map.addControl(new mapboxgl.FullscreenControl())

        // fly to animation
        setTimeout(() => {
          map.flyTo({
            zoom: 17,
            speed: 0.6, // make the flying slow

            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: t => t,

            // this animation is considered essential with respect to prefers-reduced-motion
            essential: true
          })
        }, 1000)
      })
    }

    if (!map) initializeMap({ setMap, mapContainer })
  }, [map, property3D])

  return (
    <div ref={el => (mapContainer.current = el)} css={styles(props.theme)} />
  )
}

export default withTheme(Map)
