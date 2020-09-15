import React from 'react'
import { Marker } from 'react-map-gl'
import './MarkerRegion.css'

const MarkerRegion = ({ latitude, longitude, visible, codigoRegion }) => {

  if (!visible) {
    return null
  }

  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      captureDrag={false}
    >
      <div className="MarkerRegion">
        {codigoRegion}
      </div>
    </Marker>
  )
}

export default MarkerRegion
