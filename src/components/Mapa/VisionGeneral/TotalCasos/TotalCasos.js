import React from 'react'
import { useSelector } from 'react-redux'
import { colorTrabajadoresContratistas, colorTrabajadoresPropios } from '../../../../helpers/colores'
import './TotalCasos.css'

const TotalCasos = ({ codigo }) => {

  const { datos } = useSelector(state => state.datos)
  const datosDivision = datos.series.find(d => d.codigoDivision === codigo)
  const casosPropios = datosDivision.propiosAcum.slice(-1)[0]
  const casosExternos = datosDivision.externosAcum.slice(-1)[0]

  return (
    <div className="TotalCasos">
      <div
        className="TotalCasos__contenedor"
        style={{ backgroundColor: colorTrabajadoresPropios }}
      >
        <div className="TotalCasos__numero">{casosPropios.toLocaleString('de-DE')}</div>
        <div className="TotalCasos__etiqueta">casos propios</div>
      </div>
      <div
        className="TotalCasos__contenedor"
        style={{ backgroundColor: colorTrabajadoresContratistas }}
      >
        <div className="TotalCasos__numero">{casosExternos.toLocaleString('de-DE')}</div>
        <div className="TotalCasos__etiqueta">casos externos</div>
      </div>
    </div>
  )
}

export default TotalCasos
