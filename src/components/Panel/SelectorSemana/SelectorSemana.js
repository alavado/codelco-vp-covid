import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrocedeSemanas } from '../../../redux/ducks/indicadores'
import semanasEpidemiologicas from '../../../data/minsal/semanas.json'
import iconoAtras from '@iconify/icons-mdi/chevron-left'
import iconoAdelante from '@iconify/icons-mdi/chevron-right'
import './SelectorSemana.css'
import { InlineIcon } from '@iconify/react'

const SelectorSemana = () => {

  const { retroceso } = useSelector(state => state.indicadores)
  const { primeraSemana, ultimaSemana } = useSelector(state => state.datos)
  const maximoRetroceso = ultimaSemana - primeraSemana
  const dispatch = useDispatch()

  return (
    <div className="SelectorSemana">
      <input
        className="SelectorSemana__selector"
        type="range"
        min={primeraSemana - ultimaSemana}
        max={0}
        value={retroceso}
        onChange={e => dispatch(retrocedeSemanas(Number(e.target.value), maximoRetroceso))}
      />
      <div className="SelectorSemana__contenedor_semana">
        <button
          className="SelectorSemana__boton"
          onClick={() => dispatch(retrocedeSemanas(retroceso - 1, maximoRetroceso))}
        >
          <InlineIcon className="SelectorSemana__icono_boton" icon={iconoAtras} />
        </button>
        <div className="SelectorSemana__semana_seleccionada">
          <div>Semana {ultimaSemana + retroceso} / {ultimaSemana + retroceso > 53 ? 2021 : 2020}</div>
          <div className="SelectorSemana__fechas_semana">
            {semanasEpidemiologicas[ultimaSemana + retroceso].texto}
          </div>
        </div>
        <button
          className="SelectorSemana__boton"
          onClick={() => dispatch(retrocedeSemanas(retroceso + 1, maximoRetroceso))}
        >
          <InlineIcon className="SelectorSemana__icono_boton" icon={iconoAdelante} />
        </button>
      </div>
    </div>
)
}

export default SelectorSemana
