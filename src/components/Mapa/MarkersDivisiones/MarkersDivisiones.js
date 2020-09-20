import React from 'react'
import { Marker } from 'react-map-gl'
import divisiones from '../../../data/csv/divisiones.json'
import { obtenerColorDivision } from '../../../helpers/colores'
import './MarkersDivisiones.css'

const MarkersDivisiones = () => {
  return divisiones.map(division => (
    <Marker
      latitude={division.lat || -20}
      longitude={division.lng || -60}
    >
      <div
        className="MarkersDivisiones__marcador"
        style={{ backgroundColor: obtenerColorDivision(division.codigo) }}
      >
        
      </div>
    </Marker>
  ))
}

export default MarkersDivisiones
