import React, { useState } from 'react'
import mapStyle from './mapStyle.json'
import { easeCubic } from 'd3-ease'
import './Mapa.css'
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl'
import CapaRegiones from './CapaRegiones'
import { useHistory } from 'react-router-dom'
import MarkerRegion from './MarkerRegion'
import CodigoColor from './CodigoColor'
import VisionGeneral from './VisionGeneral'

const Mapa = () => {

  const [vp, setVp] = useState({
    width: '100%',
    height: 'calc(100vh - 3rem)',
    bearing: 98.49519730510106,
    pitch: 0,
    altitude: 1.5,
    zoom: 5,
    latitude: -24.63,
    longitude: -69.75,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic,
    minZoom: 4,
  })
  const [markerRegion, setMarkerRegion] = useState({
    visible: false,
    latitude: -28.63,
    longitude: -70.75
  })

  const cambioEnElViewport = vp => {
    setVp({
      ...vp,
      width: '100%',
      height: 'calc(100vh - 3rem)',
    })
  }

  const history = useHistory()

  // useEffect(() => {
  //   const featureComuna = geoJSONRegiones.features.find(f => f.properties.COD_COMUNA === codigoComunaSeleccionada)
  //   if (featureComuna) {
  //     const { latitude, longitude } = calcularPoloDeInaccesibilidad(featureComuna)
  //     setVp(v => ({
  //       ...v,
  //       longitude,
  //       latitude,
  //       transitionDuration: 3000,
  //       transitionInterpolator: new FlyToInterpolator(),
  //       transitionEasing: easeCubic
  //     }))
  //   }
  // }, [codigoComunaSeleccionada])

  const clickEnMapa = e => {
    const comunaClickeada = e.features.find(f => f.layer.id === 'layer-comunas-fill' || f.layer.id === 'layer-otras-comunas-fill')
    if (comunaClickeada) {
      history.push(`/comuna/${comunaClickeada.properties.COD_COMUNA}`)
    }
  }

  const moverMarker = e => {
    if (e.features?.some(f => f.layer.id === 'layer-regiones-fill')) {
      setMarkerRegion({
        latitude: e.lngLat[1],
        longitude: e.lngLat[0],
        visible: true,
        codigoRegion: e.features[0].properties.codregion
      })
    }
    else {
      setMarkerRegion({ ...markerRegion, visible: false })
    }
  }

  return (
    <div className="Mapa">
      <CodigoColor />
      <VisionGeneral />
      <ReactMapGL
        {...vp}
        mapStyle={mapStyle}
        onViewportChange={cambioEnElViewport}
        doubleClickZoom={(() => 'ontouchstart' in window)()}
        getCursor={() => 'pointer'}
        onClick={clickEnMapa}
        onHover={moverMarker}
      >
        <MarkerRegion {...markerRegion} />
        <CapaRegiones />
      </ReactMapGL>
    </div>
  )
}

export default Mapa
