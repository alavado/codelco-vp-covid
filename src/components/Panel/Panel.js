import React from 'react'
import dataCodelco from '../../data/csv/data_codelco.json'
import divisiones from '../../data/csv/divisiones.json'
import { obtenerColorIndicadorPanel } from '../../helpers/colores'
import { indicadores } from '../../helpers/indicadores'
import './Panel.css'

const hexagonosFalsos = [0, 3, 7]

const Panel = () => {
  return (
    <div className="Panel">
      <div className="Panel__encabezados">
        <div>Dimensión</div>
        <div className="Panel__encabezado_resultados">Resultados</div>
      </div>
      {indicadores.map(indicador => (
        <div className="Panel__contenedor_indicador">
          <div className="Panel__nombre_indicador">
            {indicador}
          </div>
          <div className="Panel__indicador_global">
            <div className="Panel__hexagono">
              Global
            </div>
          </div>
          <div className="Panel__indicadores_divisiones">
            <div className="Panel__indicadores_contenedor_hexagonos">
              {divisiones.filter(d => d.codigo !== 'Codelco').map((d, i) => {
                const { contratistasPor1000, propiosPor10000 } = dataCodelco.series.find(s => s.codigo === d.codigo)
                const totalPor10000 = contratistasPor1000.slice(-1)[0] + propiosPor10000.slice(-1)[0]
                return (
                  <>
                    {hexagonosFalsos.includes(i) &&
                      <div className="Panel__hexagono_pequeño Panel__hexagono_pequeño--relleno" />
                    }
                    <div
                      className="Panel__hexagono_pequeño"
                      title={`División ${d.nombre}, ${totalPor10000} casos por 10.000 trabajadores`}
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
