import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import divisiones from '../../data/csv/divisiones.json'
import { obtenerColorIndicadorPanel } from '../../helpers/colores'
import { indicadores, obtenerSemaforoIndicador, obtenerValorIndicador } from '../../helpers/indicadores'
import { Icon } from '@iconify/react'
import helpRhombus from '@iconify/icons-mdi/help-circle'
import TooltipPanel from './TooltipPanel'
import './Panel.css'
import SelectorSemana from './SelectorSemana'

const hexagonosFalsos = [0, 3, 7]

const Panel = () => {

  const [mostrandoTooltip, setMostrandoTooltip] = useState(indicadores.map(() => false))
  const history = useHistory()
  const indicadoresActivos = 3

  useEffect(() => {
    document.getElementsByClassName('App')[0].scrollTo(0, 0)
  }, [])

  return (
    <div className="Panel">
      <div className="Panel__superior">
        <h1 className="Panel__titulo">Panel de indicadores</h1>
        <SelectorSemana />
      </div>
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
              style={{ backgroundColor: obtenerColorIndicadorPanel(indicador, obtenerSemaforoIndicador('GLOBAL', indicador)) }}
            >
              Global
            </div>
            {i < indicadoresActivos && 
              <div className="Panel__popup_hexagono">
                CODELCO: {obtenerSemaforoIndicador('GLOBAL', indicador) < 0 ? 'N/A' : `${obtenerValorIndicador('GLOBAL', indicador).toLocaleString('de-DE', { maximumFractionDigits: 1 })} ${indicador.sufijo}`}
              </div>
            }
          </div>
          <div className="Panel__indicadores_divisiones">
            <div className="Panel__indicadores_contenedor_hexagonos">
              {divisiones.filter(d => d.codigo !== 'GLOBAL').map((d, j) => {
                const valorSemaforo = obtenerSemaforoIndicador(d.codigo, indicador)
                const valorIndicador = obtenerValorIndicador(d.codigo, indicador)
                return (
                  <React.Fragment key={`hexagono-${indicador}-${j}`}>
                    {hexagonosFalsos.includes(j) &&
                      <div className="Panel__hexagono_pequeño Panel__hexagono_pequeño--relleno" />
                    }
                    <div className="Panel__contenedor_hexagono">
                      <div
                        className="Panel__hexagono_pequeño"
                        onClick={() => i === 0 && history.push(`/graficos/${d.codigo}`)}
                        style={{ backgroundColor: obtenerColorIndicadorPanel(indicador, valorSemaforo) }}
                      >
                        {d.codigoCorto}
                      </div>
                      {i < indicadoresActivos &&
                        <div className="Panel__popup_hexagono">
                          {d.nombre}: {valorSemaforo < 0 ? 'N/A' : `${valorIndicador.toLocaleString('de-DE', { maximumFractionDigits: 1 })} ${indicador.sufijo}`}
                        </div>
                      }
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
