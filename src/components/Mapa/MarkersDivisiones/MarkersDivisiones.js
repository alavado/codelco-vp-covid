import React from 'react'
import { Marker } from 'react-map-gl'
import { useDispatch, useSelector } from 'react-redux'
import vicepresidencias from '../../../data/csv/vicepresidencias.json'
import { obtenerColorDivision } from '../../../helpers/colores'
import { muestraDivision } from '../../../redux/ducks/division'
import './MarkersDivisiones.css'

const MarkersDivisiones = () => {

  const { codigo } = useSelector(state => state.division)
  const dispatch = useDispatch()

  return vicepresidencias.map(division => (
    <Marker
      latitude={division.lat || -20}
      longitude={division.lng || -60}
      key={`marker-division-${division.codigo}`}
    >
      {codigo === division.codigo &&
        <div className="MarkersDivisiones__sismo" />
      }
      <div
        className={`MarkersDivisiones__marcador`}
        style={{ backgroundColor: obtenerColorDivision(division.codigo) }}
        codigo={division.codigo}
        onClick={() => dispatch(muestraDivision(division.codigo))}
      />
    </Marker>
  ))
}

export default MarkersDivisiones
