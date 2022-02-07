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
import classNames from 'classnames'

const TarjetaIndicador = ({ indicador, indice, setMostrandoTooltip, mostrandoTooltip }) => {

  const history = useHistory()
  const { ultimaSemana } = useSelector(state => state.datos)
  const { retroceso } = useSelector(state => state.indicadores)

  const semanaMostrada = ultimaSemana + retroceso
  const primeraSemana2022 = 106
  const juntarProyectosAndina = semanaMostrada >= primeraSemana2022

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
      <div className="TarjetaIndicador__indicadores_divisiones">
        <div className="TarjetaIndicador__indicadores_contenedor_hexagonos">
          {vicepresidencias.filter(d => d.codigo !== 'GLOBAL').map((d, j) => {
            const valorSemaforo = obtenerSemaforoIndicador(d.codigo, indicador, retroceso)
            return (
              <React.Fragment key={`hexagono-${indicador}-${j}`}>
                <div className={classNames({
                  "TarjetaIndicador__contenedor_hexagono": true,
                  "TarjetaIndicador__contenedor_hexagono--oculto": juntarProyectosAndina && ['DLNE', 'TA', 'DFA'].includes(d.codigoCorto),
                  "TarjetaIndicador__contenedor_hexagono--oculto-r2l": !juntarProyectosAndina && d.codigoCorto === 'CPA'
                })}>
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
