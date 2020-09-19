import React, { useMemo, useState } from 'react'
import divisiones from '../../../data/csv/data_codelco.json'
import './Grafico.css'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'
import 'moment/locale/es'
import classNames from 'classnames'
import { colorTrabajadoresContratistas, colorTrabajadoresPropios } from '../../../helpers/colores'

const Grafico = ({ division }) => {

  const [acumulados, setAcumulados] = useState(true)

  const [fechas, series, total, totalPropios, totalContratistas] = useMemo(() => {
    const datosDivision = divisiones.series.find(d => d.codigo === division.codigo)
    return [
      divisiones.fechas,
      {
        propios: acumulados ? datosDivision.propiosAcum : datosDivision.propios,
        contratistas: acumulados ? datosDivision.contratistasAcum : datosDivision.contratistas
      },
      datosDivision.total,
      datosDivision.totalPropios,
      datosDivision.totalContratistas
    ]
  }, [acumulados, division])

  return (
    <div className="Grafico">
      <div className="Grafico__superior">
        <div>
          <h2 className="Grafico__titulo">{division.nombre}</h2>
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
      <div className="Grafico__contenedor_grafico">
        <div className="Grafico__descripcion">
          <p className="Grafico__total_acumulado">{total}</p>
          <p>Casos confirmados</p>
        </div>
        <div className="Grafico__grafico">
          <Bar
            data={{
              labels: fechas,
              datasets: [
                {
                  data: series.propios.slice(),
                  backgroundColor: colorTrabajadoresPropios,
                  label: `Trabajadores propios`
                },
                {
                  data: series.contratistas.slice(),
                  backgroundColor: colorTrabajadoresContratistas,
                  label: `Trabajadores contratistas`
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
              tooltips: {
                callbacks: {
                  title: items => moment(items[0].xLabel).format('dddd D [de] MMMM'),
                  label: (item, data) => `${data.datasets[item.datasetIndex].label}: ${item.yLabel} casos`
                 }
              },
              scales: {
                xAxes: [{
                  ticks: {
                    maxRotation: 0,
                    autoSkip: false,
                    callback: v => {
                      const fecha = moment(v)
                      return fecha.date() === 1 ? fecha.format('D MMM') : null
                    },
                  },
                  gridLines: {
                    display: false
                  }
                }],
                yAxes: [{
                  gridLines: {
                    display: false
                  },
                  position: 'right',
                  ticks: {
                    suggestedMax: 10,
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

export default Grafico
