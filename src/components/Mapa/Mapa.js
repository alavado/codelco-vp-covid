import React, { useState } from 'react'
import mapStyle from './mapStyle.json'
import { easeCubic } from 'd3-ease'
import './Mapa.css'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'
import CapaRegiones from './CapaRegiones'
import { useHistory } from 'react-router-dom'
import MarkerRegion from './MarkerRegion'
import CodigoColor from './CodigoColor'
import VisionGeneral from './VisionGeneral'
import MarkersDivisiones from './MarkersDivisiones'
import { useDispatch } from 'react-redux'
import { escondeMarcador, muestraDivisionEnMarcador, muestraRegionEnMarcador } from '../../redux/ducks/marcador'

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
    latitude: -28.63,
    longitude: -70.75
  })
  const dispatch = useDispatch()

  const cambioEnElViewport = vp => {
    setVp({
      ...vp,
      width: '100%',
      height: 'calc(100vh - 3rem)',
    })
  }

  const history = useHistory()

  const clickEnMapa = e => {
    const comunaClickeada = e.features.find(f => f.layer.id === 'layer-comunas-fill' || f.layer.id === 'layer-otras-comunas-fill')
    if (comunaClickeada) {
      history.push(`/comuna/${comunaClickeada.properties.COD_COMUNA}`)
    }
  }

  const moverMarker = e => {
    if (e.target?.classList.contains('MarkersDivisiones__marcador')) {
      setMarkerRegion({ latitude: e.lngLat[1], longitude: e.lngLat[0] })
      dispatch(muestraDivisionEnMarcador(e.target.getAttribute('codigo')))
    }
    else if (e.features?.some(f => f.layer.id === 'layer-regiones-fill')) {
      setMarkerRegion({ latitude: e.lngLat[1], longitude: e.lngLat[0] })
      const codigo = e.features.find(f => f.layer.id === 'layer-regiones-fill').properties.codregion
      dispatch(muestraRegionEnMarcador(codigo))
    }
    else {
      dispatch(escondeMarcador())
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
        onClick={clickEnMapa}
        onHover={moverMarker}
      >
        <MarkersDivisiones />
        <MarkerRegion {...markerRegion} />
        <CapaRegiones />
      </ReactMapGL>
    </div>
  )
}

export default Mapa
