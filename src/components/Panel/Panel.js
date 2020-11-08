import React, { useEffect, useState } from 'react'
import { indicadores, obtenerPropiedadSemaforo } from '../../helpers/indicadores'
import SelectorSemana from './SelectorSemana'
import TarjetaIndicador from './TarjetaIndicador'
import './Panel.css'

const Panel = () => {

  const [mostrandoTooltip, setMostrandoTooltip] = useState(indicadores.map(() => false))

  useEffect(() => {
    document.getElementsByClassName('App')[0].scrollTo(0, 0)
  }, [])

  const indicadoresIzquierda = indicadores.filter(i => obtenerPropiedadSemaforo(i).startsWith('SE'))
  const indicadoresDerecha = indicadores.filter(i => obtenerPropiedadSemaforo(i).startsWith('SO'))

  return (
    <div className="Panel">
      <div className="Panel__contenedor">
        <div className="Panel__superior">
          <h1 className="Panel__titulo">Panel de indicadores</h1>
          <SelectorSemana />
        </div>
        <div className="Panel__contenedor_paneles">
          <div className="Panel__panel">
            <div className="Panel__encabezados">
              <div className="Panel__encabezado_dimension">KPI epidemiológicos</div>
            </div>
            {indicadoresIzquierda.map((indicador, i) => (
              <TarjetaIndicador
                key={`panel-${indicador.nombre}`}
                indicador={indicador}
                setMostrandoTooltip={setMostrandoTooltip}
                mostrandoTooltip={mostrandoTooltip}
                indice={i}
              />
            ))}
          </div>
          <div className="Panel__panel">
            <div className="Panel__encabezados">
              <div className="Panel__encabezado_dimension">Indicadores operacionales</div>
            </div>
            {indicadoresDerecha.map((indicador, i) => (
              <TarjetaIndicador
                key={`panel-${indicador.nombre}`}
                indicador={indicador}
                setMostrandoTooltip={setMostrandoTooltip}
                mostrandoTooltip={mostrandoTooltip}
                indice={i + indicadoresIzquierda.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel
