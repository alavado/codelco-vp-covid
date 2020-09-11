import React, { useState } from 'react'
import mapStyle from './mapStyle.json'
import { easeCubic } from 'd3-ease'
import './Mapa.css'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'
import CapaRegiones from './CapaRegiones'
import { useHistory } from 'react-router-dom'

const Mapa = () => {

  const [vp, setVp] = useState({
    width: '100%',
    height: 'calc(100vh - 3rem)',
    bearing: 98.49519730510106,
    pitch: 0,
    altitude: 1.5,
    zoom: 5,
    latitude: -28.63,
    longitude: -70.75,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic,
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

  return (
    <div className="Mapa">
      <ReactMapGL
        {...vp}
        mapStyle={mapStyle}
        onViewportChange={cambioEnElViewport}
        doubleClickZoom={(() => 'ontouchstart' in window)()}
        getCursor={() => 'pointer'}
        onClick={clickEnMapa}
      >
        <CapaRegiones />
      </ReactMapGL>
    </div>
  )
}

export default Mapa
