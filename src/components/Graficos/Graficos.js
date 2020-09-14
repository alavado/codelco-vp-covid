import React, { useMemo, useState } from 'react'
import divisiones from '../../data/csv/data_codelco.json'
import './Graficos.css'
import { Chart, Bar } from 'react-chartjs-2'
import moment from 'moment'
import 'moment/locale/es'

Chart.defaults.global.defaultFontFamily = 'Montserrat'

const Graficos = () => {

  const [acumulados, setAcumulados] = useState(false)

  const [fechas, serie, total] = useMemo(() => {
    const serie = divisiones.series.find(d => d.codigo === 'Codelco').propios.slice()
    return [
      divisiones.fechas,
      acumulados
        ? serie.reduce((prev, v) => [...prev, prev.slice(-1)[0] + v], [0]).slice(1)
        : serie,
      serie.reduce((sum, v) => sum + v)
    ]
  }, [acumulados])

  return (
    <div className="Graficos">
      <button onClick={() => setAcumulados(!acumulados)}>toggle</button>
      <div className="Graficos__contenedor_grafico">
        <div className="Grafico__titulo">
          <h2>Toda CODELCO</h2>
          <p className="Grafico__total_acumulado">{total}</p>
          <p>Casos confirmados</p>
        </div>
        <div className="Graficos__grafico">
          <Bar
            data={{
              labels: fechas,
              datasets: [
                {
                  data: serie,
                  backgroundColor: '#52859E',
                }
              ]
            }}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  ticks: {
                    maxRotation: 0,
                    autoSkip: false,
                    callback: v => {
                      const fecha = moment(v)
                      return fecha.date() === 1 ? fecha.format('D MMM') : null
                    }
                  },
                  gridLines: {
                    display: false
                  }
                }],
                yAxes: [{
                  gridLines: {
                    display: false
                  }
                }]
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Graficos
