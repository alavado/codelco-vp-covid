import React, { useMemo, useState } from 'react'
import divisiones from '../../data/csv/data_codelco.json'
import './Graficos.css'
import { Chart, Bar } from 'react-chartjs-2'
import moment from 'moment'
import 'moment/locale/es'
import classNames from 'classnames'

Chart.defaults.global.defaultFontFamily = 'Montserrat'

const Graficos = () => {

  const [acumulados, setAcumulados] = useState(false)

  const [fechas, series, total, totalPropios, totalContratistas] = useMemo(() => {
    const { propios, contratistas } = divisiones.series.find(d => d.codigo === 'Codelco')
    return [
      divisiones.fechas,
      {
        propios: acumulados
          ? propios.reduce((prev, v) => [...prev, prev.slice(-1)[0] + v], [0]).slice(1)
          : propios.slice(),
        contratistas: acumulados
          ? contratistas.reduce((prev, v) => [...prev, prev.slice(-1)[0] + v], [0]).slice(1)
          : contratistas.slice(),
      },
      propios.reduce((sum, v) => sum + v) + contratistas.reduce((sum, v) => sum + v),
      propios.reduce((sum, v) => sum + v),
      contratistas.reduce((sum, v) => sum + v),
    ]
  }, [acumulados])

  return (
    <div className="Graficos">
      <div className="Graficos__superior">
        <div>
          <h2 className="Grafico__titulo">Toda CODELCO</h2>
          <h3 className="Grafico__subtitulo">Período: {moment(fechas[0]).format('D [de] MMMM')} al {moment(fechas.slice(-1)[0]).format('D [de] MMMM')}</h3>
        </div>
        <div>
          <button
            className={classNames({
              'Grafico__selector_acumulados': true,
              'Grafico__selector_acumulados--izquierda': true,
              'Grafico__selector_acumulados--activo': !acumulados
            })}
            onClick={() => setAcumulados(false)}
          >
            Nuevos casos
          </button>
          <button
            className={classNames({
              'Grafico__selector_acumulados': true,
              'Grafico__selector_acumulados--derecha': true,
              'Grafico__selector_acumulados--activo': acumulados
            })}
            onClick={() => setAcumulados(true)}
          >
            Acumulados
          </button>
        </div>
      </div>
      <div className="Graficos__contenedor_grafico">
        <div className="Grafico__descripcion">
          <p className="Grafico__total_acumulado">{total}</p>
          <p>Casos confirmados</p>
        </div>
        <div className="Graficos__grafico">
          <Bar
            data={{
              labels: fechas,
              datasets: [
                {
                  data: series.propios,
                  backgroundColor: '#42809E',
                  label: `Trabajadores propios: ${totalPropios} casos`
                },
                {
                  data: series.contratistas,
                  backgroundColor: '#EBCB63',
                  label: `Trabajadores contratistas: ${totalContratistas} casos`
                }
              ]
            }}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: true,
                position: 'bottom',
                align: 'end'
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
                  },
                  position: 'right'
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
