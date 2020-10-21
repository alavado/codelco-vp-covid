import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import divisiones from '../../data/csv/divisiones.json'
import { obtenerColorIndicadorPanel } from '../../helpers/colores'
import { indicadores, obtenerSemaforoIndicador, obtenerValorIndicador } from '../../helpers/indicadores'
import { Icon } from '@iconify/react'
import helpRhombus from '@iconify/icons-mdi/help-circle'
import './Panel.css'
import TooltipPanel from './TooltipPanel'

const hexagonosFalsos = [0, 3, 7]

const Panel = () => {

  const [mostrandoTooltip, setMostrandoTooltip] = useState(indicadores.map(() => false))
  const history = useHistory()

  useEffect(() => {
    document.getElementsByClassName('App')[0].scrollTo(0, 0)
  }, [])

  return (
    <div className="Panel">
      <h1 className="Panel__titulo">Panel de indicadores</h1>
      <div className="Panel__encabezados">
        <div className="Panel__encabezao_dimension">Dimensión</div>
        <div className="Panel__encabezado_resultados">Resultados</div>
      </div>
      {indicadores.map((indicador, i) => (
        <div key={`panel-${indicador.nombre}`} className="Panel__contenedor_indicador">
          <div className="Panel__nombre_indicador">
            <div>
              {indicador.nombre}
              <div
                className="Panel__icono_indicador" 
                onMouseEnter={() => setMostrandoTooltip(prev => {
                  const x = [...prev]
                  x[i] = true
                  return x
                })}
                onMouseLeave={() => setMostrandoTooltip(prev => {
                  const x = [...prev]
                  x[i] = false
                  return x
                })}
              >
                <TooltipPanel indicador={indicador} visible={mostrandoTooltip[i]} />
                <Icon
                  className="Panel__icono_indicador"
                  icon={helpRhombus}
                />
              </div>
            </div>
          </div>
          <div className="Panel__indicador_global">
            <div
              className="Panel__hexagono"
              onClick={() => history.push('/graficos')}
              title={`${obtenerValorIndicador('GLOBAL', indicador).toLocaleString('de-DE', { maximumFractionDigits: 1 })} casos por cada 1.000 trabajadores`}
              style={{ backgroundColor: obtenerColorIndicadorPanel(indicador, obtenerSemaforoIndicador('GLOBAL', indicador)) }}
            >
              Global
            </div>
          </div>
          <div className="Panel__indicadores_divisiones">
            <div className="Panel__indicadores_contenedor_hexagonos">
              {divisiones.filter(d => d.codigo !== 'GLOBAL').map((d, i) => {
                const valorSemaforo = obtenerSemaforoIndicador(d.codigo, indicador)
                const valorIndicador = obtenerValorIndicador(d.codigo, indicador)
                return (
                  <React.Fragment key={`hexagono-${indicador}-${i}`}>
                    {hexagonosFalsos.includes(i) &&
                      <div className="Panel__hexagono_pequeño Panel__hexagono_pequeño--relleno" />
                    }
                    <div
                      className="Panel__hexagono_pequeño"
                      title={`División ${d.nombre}, ${valorIndicador.toLocaleString('de-DE', { maximumFractionDigits: 1 })} caso${valorIndicador !== 1 ? 's' : ''} por cada 1.000 trabajadores`}
                      onClick={() => history.push(`/graficos/${d.codigo}`)}
                      style={{ backgroundColor: obtenerColorIndicadorPanel(indicador, valorSemaforo) }}
                    >
                      {d.codigoCorto}
                    </div>
                  </React.Fragment>
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
