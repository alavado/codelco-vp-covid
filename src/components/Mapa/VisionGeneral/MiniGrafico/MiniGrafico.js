import React from 'react'
import { Line } from 'react-chartjs-2'
import divisiones from '../../../../data/csv/data_codelco.json'
import moment from 'moment'
import './MiniGrafico.css'

const MiniGrafico = ({ codigo }) => {

  const datosDivision = divisiones.series.find(d => d.codigo === codigo)

  return (
    <div className="MiniGrafico">
      <Line
        data={{
          labels: divisiones.fechas,
          datasets: [{
            data: datosDivision.propiosAcum.map((d, i) => d + datosDivision.contratistasAcum[i]),
            fill: false,
            borderColor: '#e6192e',
            pointRadius: 0,
            lineTension: 0,
            pointHitRadius: 3
          }]
        }}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              title: items => moment(items[0].xLabel).format('D [de] MMMM'),
              label: item => `${item.yLabel} casos hasta la fecha`
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                maxRotation: 0,
                fontColor: '#212121',
                fontSize: 11,
                autoSkip: false,
                callback: (v, i, vals) => i === 0 || i === vals.length - 1 ? moment(v).format('D[/]M') : null
              }
            }],
            yAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                display: false
              }
            }]
          }
        }}
      />
    </div>
  )
}

export default MiniGrafico
