import React from 'react'
import { useHistory } from 'react-router-dom'
import divisiones from '../../data/csv/divisiones.json'
import { obtenerColorIndicadorPanel } from '../../helpers/colores'
import { indicadores, obtenerCasosPor10000 } from '../../helpers/indicadores'
import './Panel.css'

const hexagonosFalsos = [0, 3, 7]

const Panel = () => {

  const history = useHistory()

  return (
    <div className="Panel">
      <h1 className="Panel__titulo">Panel de indicadores</h1>
      <div className="Panel__encabezados">
        <div className="Panel__encabezao_dimension">Dimensión</div>
        <div className="Panel__encabezado_resultados">Resultados</div>
      </div>
      {indicadores.map(indicador => (
        <div className="Panel__contenedor_indicador">
          <div className="Panel__nombre_indicador">
            {indicador}
          </div>
          <div className="Panel__indicador_global">
            <div
              className="Panel__hexagono"
              onClick={() => history.push('/graficos')}
              title={`${obtenerCasosPor10000('GLOBAL').toLocaleString('de-DE', { maximumFractionDigits: 1 })} casos por 10.000 trabajadores`}
              style={{ backgroundColor: obtenerColorIndicadorPanel(indicador, obtenerCasosPor10000('GLOBAL')) }}
            >
              Global
            </div>
          </div>
          <div className="Panel__indicadores_divisiones">
            <div className="Panel__indicadores_contenedor_hexagonos">
              {divisiones.filter(d => d.codigo !== 'GLOBAL').map((d, i) => {
                const totalPor10000 = obtenerCasosPor10000(d.codigo)
                return (
                  <>
                    {hexagonosFalsos.includes(i) &&
                      <div className="Panel__hexagono_pequeño Panel__hexagono_pequeño--relleno" />
                    }
                    <div
                      className="Panel__hexagono_pequeño"
                      title={`División ${d.nombre}, ${totalPor10000.toLocaleString('de-DE', { maximumFractionDigits: 1 })} casos por 10.000 trabajadores`}
                      onClick={() => history.push(`/graficos/${d.codigo}`)}
                      style={{ backgroundColor: obtenerColorIndicadorPanel(indicador, totalPor10000) }}
                    >
                      {d.codigoCorto}
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Panel
