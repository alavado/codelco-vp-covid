import React from 'react'
import { Marker } from 'react-map-gl'
import './MarkerRegion.css'
import { useSelector } from 'react-redux'

const MarkerRegion = ({ latitude, longitude }) => {

  const { titulo, casosContratistas, casosPropios, visible } = useSelector(state => state.marcador)

  if (!visible || casosPropios === 0) {
    return null
  }

  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      captureDrag={false}
    >
      <div className="MarkerRegion">
        <div className="MarkerRegion__nombre_region">
          {titulo}
        </div>
        <div>{casosContratistas + casosPropios} casos</div>
        <div>{casosContratistas} contratistas</div>
        <div>{casosPropios} propios</div>
      </div>
    </Marker>
  )
}

export default MarkerRegion
