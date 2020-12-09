import React from 'react'
import classNames from 'classnames'
import './TooltipPanel.css'

const TooltipPanel = ({ indicador, visible }) => {

  return (
    <div
      className={classNames({
        TooltipPanel: true,
        'TooltipPanel--visible': visible
      })}
    >
      <div className="TooltipPanel__contenido">
        {/* <div className="TooltipPanel__titulo">
          {indicador.nombre}
        </div> */}
        <div className="TooltipPanel__descripcion">
          {indicador.descripcion}
        </div>
        {indicador.niveles && indicador.niveles.map((nivel, i) => (
          <div
            className="TooltipPanel__nivel"
            key={`indicador-${indicador.nombre}}-nivel-${i}`}
          >
            <div className="TooltipPanel__hex_nivel" style={{ backgroundColor: nivel.color }} />
            <div className="TooltipPanel__nombre_nivel">
              {nivel.nombre}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TooltipPanel
