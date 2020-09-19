import React from 'react'
import { Marker } from 'react-map-gl'
import divisiones from '../../../data/csv/divisiones.json'
import './MarkersDivisiones.css'

const MarkersDivisiones = () => {
  return divisiones.map(division => (
      <Marker
        latitude={division.lat || -20}
        longitude={division.lng || -60}
      >
        O
      </Marker>
    ))
}

export default MarkersDivisiones
