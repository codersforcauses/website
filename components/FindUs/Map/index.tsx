/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Head } from 'next/document'
import { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { styles } from './styles'

const Map = (props: { marker: string; theme: Object }) => {
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_API
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [115.816986, -31.98097], // [lng, lat]
        zoom: 15.5,
        pitch: 45,
        antialias: true
      })

      map.on('load', () => {
        setMap(map)
        map.resize()

        // 3-d buildings
        const layers = map.getStyle().layers
        let labelLayerId
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id
            break
          }
        }
        map.addLayer(
          {
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 16.5,
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
          },
          labelLayerId
        )
      })

      // add marker for clubroom location
      const el = document.createElement('div')
      el.className = 'marker'
      new mapboxgl.Marker(el).setLngLat([115.816986, -31.98097]).addTo(map)

      // button for full screen map
      map.addControl(new mapboxgl.FullscreenControl())
    }

    if (!map) initializeMap({ setMap, mapContainer })
  }, [map])

  return (
    <div
      ref={el => (mapContainer.current = el)}
      css={styles(props.theme, props.marker)}
    />
  )
}

export default withTheme(Map)
