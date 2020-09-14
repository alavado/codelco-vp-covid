import React from 'react'
import './Graficos.css'
import { Chart } from 'react-chartjs-2'
import divisiones from '../../data/csv/divisiones.json'
import 'moment/locale/es'
import Grafico from './Grafico/Grafico'

Chart.defaults.global.defaultFontFamily = 'Montserrat'

const Graficos = () => {

  return (
    <div className="Graficos">
      <Grafico division={divisiones.find(d => d.codigo === 'Codelco')} />
      {divisiones.filter(d => d.codigo !== 'Codelco').map(d => <Grafico key={d.codigo} division={d} />)}
    </div>
  )
}

export default Graficos
