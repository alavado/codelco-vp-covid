import Icon from '@iconify/react'
import React from 'react'
import TooltipPanel from '../TooltipPanel'
import helpRhombus from '@iconify/icons-mdi/help-circle'
import vicepresidencias from '../../../data/csv/vicepresidencias.json'
import { obtenerColorIndicadorPanel } from '../../../helpers/colores'
import { obtenerSemaforoIndicador, obtenerTextoPopupIndicador } from '../../../helpers/indicadores'
import './TarjetaIndicador.css'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TarjetaIndicador = ({ indicador, indice, setMostrandoTooltip, mostrandoTooltip }) => {

  const history = useHistory()
  const { retroceso } = useSelector(state => state.indicadores)
  // const valorSemaforo = obtenerSemaforoIndicador('GLOBAL', indicador, retroceso)

  return (
    <div className="TarjetaIndicador">
      <div className="TarjetaIndicador__nombre_indicador">
        <div>
          {indicador.nombre}
            <TooltipPanel indicador={indicador} visible={mostrandoTooltip[indice]} />
          <div
            className="TarjetaIndicador__icono_indicador" 
            onMouseEnter={() => setMostrandoTooltip(prev => {
              const x = [...prev]
              x[indice] = true
              return x
            })}
            onMouseLeave={() => setMostrandoTooltip(prev => {
              const x = [...prev]
              x[indice] = false
              return x
            })}
          >
            <Icon
              className="TarjetaIndicador__icono_indicador"
              icon={helpRhombus}
            />
          </div>
        </div>
      </div>
      {/* <div className="TarjetaIndicador__indicador_global">
        <div
          className="TarjetaIndicador__hexagono"
          onClick={() => indice === 0 && history.push('/graficos')}
          style={{ backgroundColor: obtenerColorIndicadorPanel(indicador, valorSemaforo) }}
        >
          Global
        </div>
        <div className="TarjetaIndicador__popup_hexagono">
          CODELCO: {obtenerTextoPopupIndicador('GLOBAL', indicador, retroceso)}
        </div>
      </div> */}
      <div className="TarjetaIndicador__indicadores_divisiones">
        <div className="TarjetaIndicador__indicadores_contenedor_hexagonos">
          {vicepresidencias.filter(d => d.codigo !== 'GLOBAL').map((d, j) => {
            const valorSemaforo = obtenerSemaforoIndicador(d.codigo, indicador, retroceso)
            return (
              <React.Fragment key={`hexagono-${indicador}-${j}`}>
                <div className="TarjetaIndicador__contenedor_hexagono">
                  <div
                    className="TarjetaIndicador__hexagono_pequeño"
                    onClick={() => indice === 0 && history.push(`/graficos/${d.codigo}`)}
                    style={{ backgroundColor: obtenerColorIndicadorPanel(indicador, valorSemaforo) }}
                  >
                    {d.codigoCorto}
                  </div>
                  <div className="TarjetaIndicador__popup_hexagono">
                    {d.nombre}: {obtenerTextoPopupIndicador(d.codigo, indicador, retroceso)}
                  </div>
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
