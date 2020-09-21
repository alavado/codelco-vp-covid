import React from 'react'
import { Marker } from 'react-map-gl'
import { useDispatch } from 'react-redux'
import divisiones from '../../../data/csv/divisiones.json'
import { obtenerColorDivision } from '../../../helpers/colores'
import { muestraDivision } from '../../../redux/ducks/division'
import './MarkersDivisiones.css'

const MarkersDivisiones = () => {

  const dispatch = useDispatch()

  return divisiones.map(division => (
    <Marker
      latitude={division.lat || -20}
      longitude={division.lng || -60}
      key={`marker-division-${division.codigo}`}
    >
      <div
        className="MarkersDivisiones__marcador"
        style={{ backgroundColor: obtenerColorDivision(division.codigo) }}
        codigo={division.codigo}
        onClick={() => dispatch(muestraDivision(division.codigo))}
      >
        
      </div>
    </Marker>
  ))
}

export default MarkersDivisiones
