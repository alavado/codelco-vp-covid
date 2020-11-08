import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { indicadores, obtenerPropiedadSemaforo } from '../../helpers/indicadores'
import './Panel.css'
import SelectorSemana from './SelectorSemana'
import { useSelector } from 'react-redux'
import TarjetaIndicador from './TarjetaIndicador'

const Panel = () => {

  const [mostrandoTooltip, setMostrandoTooltip] = useState(indicadores.map(() => false))
  const history = useHistory()

  useEffect(() => {
    document.getElementsByClassName('App')[0].scrollTo(0, 0)
  }, [])

  const indicadoresIzquierda = indicadores.filter(i => obtenerPropiedadSemaforo(i).startsWith('SE'))
  const indicadoresDerecha = indicadores.filter(i => obtenerPropiedadSemaforo(i).startsWith('SO'))

  return (
    <div className="Panel">
      <div className="Panel__superior">
        <h1 className="Panel__titulo">Panel de indicadores</h1>
        <SelectorSemana />
      </div>
      <div className="Panel__contenedor_paneles">
        <div className="Panel__panel">
          <div className="Panel__encabezados">
            <div className="Panel__encabezao_dimension">Dimensión</div>
            <div className="Panel__encabezado_resultados">Resultados</div>
          </div>
          {indicadoresIzquierda.map((indicador, i) => (
            <TarjetaIndicador
              key={`panel-${indicador.nombre}`}
              indicador={indicador}
              setMostrandoTooltip={setMostrandoTooltip}
              mostrandoTooltip={mostrandoTooltip}
              i={i}
            />
          ))}
        </div>
        <div className="Panel__panel">
          <div className="Panel__encabezados">
            <div className="Panel__encabezao_dimension">Dimensión</div>
            <div className="Panel__encabezado_resultados">Resultados</div>
          </div>
          {indicadoresDerecha.map((indicador, i) => (
            <TarjetaIndicador
              key={`panel-${indicador.nombre}`}
              indicador={indicador}
              setMostrandoTooltip={setMostrandoTooltip}
              mostrandoTooltip={mostrandoTooltip}
              i={i + indicadoresIzquierda.length}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Panel
