import React, { useEffect } from 'react'
import './Graficos.css'
import { Chart } from 'react-chartjs-2'
import vicepresidencias from '../../data/csv/vicepresidencias.json'
import 'moment/locale/es'
import Grafico from './Grafico/Grafico'
import { useParams } from 'react-router-dom'

Chart.defaults.global.defaultFontFamily = 'Montserrat'

const Graficos = () => {

  const { codigo } = useParams()

  useEffect(() => {
    const elem = document.getElementById(`grafico-${codigo}`)
    if (elem) {
      document.getElementsByClassName('App')[0].scrollTo(0, elem.offsetTop - 50)
    }
  }, [codigo])

  return (
    <div className="Graficos">
      <div className="Graficos__titulo">
        Gráficos de casos confirmados semanales
      </div>
      {/* <Grafico division={vicepresidencias.find(d => d.codigo === 'GLOBAL')} /> */}
      {vicepresidencias.filter(d => d.codigo !== 'GLOBAL').map(d => (
        <div
          id={`grafico-${d.codigo}`}
          key={`contenedor-grafico-${d.codigo}`}
        >
          <Grafico division={d} />
        </div>
      ))}
    </div>
  )
}

export default Graficos
