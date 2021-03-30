/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { memo, useContext, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API

const Map = () => {
  const theme = useTheme()
  const mapContainer = useRef()
  const isDark = useContext(DarkContext)

  useEffect(() => {
    const UWA_COORDS: [number, number] = [115.816986, -31.98097] // [lng, lat]

    const styledMap = `mapbox://styles/mapbox/${isDark ? 'dark' : 'light'}-v10`

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: styledMap,
      center: UWA_COORDS,
      minZoom: 9,
      zoom: 9,
      maxZoom: 18.5,
      pitch: 30,
      antialias: true
    })

    map.on('load', () => {
      map.resize()
      map.setStyle(styledMap)

      // 3d no longer work
      // // 3-d buildings
      // let labelLayerId
      // const layers = map.getStyle().layers as any
      // for (let i = 0; i < layers.length; i++) {
      //   if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
      //     labelLayerId = layers[i].id
      //     break
      //   }
      // }
      // map.addLayer(
      //   {
      //     id: '3d-buildings',
      //     source: 'composite',
      //     'source-layer': 'building',
      //     filter: ['==', 'extrude', 'true'],
      //     type: 'fill-extrusion',
      //     minzoom: 17.5,
      //     paint: {
      //       'fill-extrusion-color': '#333', // #bbb for dark mode
      //       // use an 'interpolate' expression to add a smooth transition effect to the
      //       // buildings as the user zooms in
      //       'fill-extrusion-height': [
      //         'interpolate',
      //         ['linear'],
      //         ['zoom'],
      //         15,
      //         0,
      //         15.05,
      //         ['get', 'height']
      //       ],
      //       'fill-extrusion-base': [
      //         'interpolate',
      //         ['linear'],
      //         ['zoom'],
      //         15,
      //         0,
      //         15.05,
      //         ['get', 'min_height']
      //       ],
      //       'fill-extrusion-opacity': 0.6
      //     }
      //   },
      //   labelLayerId
      // )

      // add marker for clubroom location
      new mapboxgl.Marker({ color: '#000000' }).setLngLat(UWA_COORDS).addTo(map)

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

    return () => map.remove()
  }, [isDark])

  return <div ref={mapContainer} css={styles(theme)} />
}

export default memo(Map)
