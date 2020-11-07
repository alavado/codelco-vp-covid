import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrocedeSemanas } from '../../../redux/ducks/indicadores'
import semanasEpidemiologicas from '../../../data/minsal/semanas.json'
import './SelectorSemana.css'

const SelectorSemana = () => {

  const { retroceso } = useSelector(state => state.indicadores)
  const dispatch = useDispatch()
  const ultimaSemana = 42
  const primeraSemana = 13

  return (
    <div className="SelectorSemana">
      <input
        className="SelectorSemana__selector"
        type="range"
        min={primeraSemana - ultimaSemana}
        max={0}
        defaultValue={retroceso}
        onChange={e => dispatch(retrocedeSemanas(Number(e.target.value)))}
      />
      <div className="SelectorSemana__semana_seleccionada">
        <div>Semana {ultimaSemana + retroceso}</div>
        <div className="SelectorSemana__fechas_semana">
          {semanasEpidemiologicas[ultimaSemana + retroceso]}
        </div>
      </div>
    </div>
)
}

export default SelectorSemana
