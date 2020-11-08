import Icon from '@iconify/react'
import React from 'react'
import TooltipPanel from '../TooltipPanel'
import helpRhombus from '@iconify/icons-mdi/help-circle'
import divisiones from '../../../data/csv/divisiones.json'
import { obtenerColorIndicadorPanel } from '../../../helpers/colores'
import { obtenerSemaforoIndicador, obtenerValorIndicador } from '../../../helpers/indicadores'
import './TarjetaIndicador.css'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const hexagonosFalsos = [0, 3, 7]
const indicadoresActivos = 3

const TarjetaIndicador = ({ indicador, i, setMostrandoTooltip, mostrandoTooltip }) => {

  const history = useHistory()
  const { retroceso } = useSelector(state => state.indicadores)

  return (
    <div className="TarjetaIndicador">
      <div className="TarjetaIndicador__nombre_indicador">
        <div>
          {indicador.nombre}
          <div
            className="TarjetaIndicador__icono_indicador" 
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
              className="TarjetaIndicador__icono_indicador"
              icon={helpRhombus}
            />
          </div>
        </div>
      </div>
      <div className="TarjetaIndicador__indicador_global">
        <div
          className="TarjetaIndicador__hexagono"
          onClick={() => history.push('/graficos')}
          style={{ backgroundColor: obtenerColorIndicadorPanel(indicador, obtenerSemaforoIndicador('GLOBAL', indicador, retroceso)) }}
        >
          Global
        </div>
        {i < indicadoresActivos && 
          <div className="TarjetaIndicador__popup_hexagono">
            CODELCO: {obtenerSemaforoIndicador('GLOBAL', indicador) < 0 ? 'N/A' : `${obtenerValorIndicador('GLOBAL', indicador, retroceso).toLocaleString('de-DE', { maximumFractionDigits: 1 })} ${indicador.sufijo}`}
          </div>
        }
      </div>
      <div className="TarjetaIndicador__indicadores_divisiones">
        <div className="TarjetaIndicador__indicadores_contenedor_hexagonos">
          {divisiones.filter(d => d.codigo !== 'GLOBAL').map((d, j) => {
            const valorSemaforo = obtenerSemaforoIndicador(d.codigo, indicador, retroceso)
            const valorIndicador = obtenerValorIndicador(d.codigo, indicador, retroceso)
            return (
              <React.Fragment key={`hexagono-${indicador}-${j}`}>
                {hexagonosFalsos.includes(j) &&
                  <div className="TarjetaIndicador__hexagono_pequeño TarjetaIndicador__hexagono_pequeño--relleno" />
                }
                <div className="TarjetaIndicador__contenedor_hexagono">
                  <div
                    className="TarjetaIndicador__hexagono_pequeño"
                    onClick={() => i === 0 && history.push(`/graficos/${d.codigo}`)}
                    style={{ backgroundColor: obtenerColorIndicadorPanel(indicador, valorSemaforo) }}
                  >
                    {d.codigoCorto}
                  </div>
                  {i < indicadoresActivos &&
                    <div className="TarjetaIndicador__popup_hexagono">
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
  )
}

export default TarjetaIndicador
