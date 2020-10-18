import React from 'react'
import { escala } from '../../../helpers/colores'
import './CodigoColor.css'

const CodigoColor = () => {
  return (
    <div className="CodigoColor">
      <div className="CodigoColor__titulo">Casos acumulados</div>
      <div className="CodigoColor__escala">
        {escala.slice(0, -1).map(({ maximo, color: backgroundColor, leyenda }) => (
          <div className="CodigoColor__paso_escala" key={`codigo-color-max-${maximo}`}>
            <div className="CodigoColor__color_escala" style={{ backgroundColor }} />
            <div className="CodigoColor__valor_escala">{leyenda}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CodigoColor
