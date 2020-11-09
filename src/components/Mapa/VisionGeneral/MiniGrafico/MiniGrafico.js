import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import './MiniGrafico.css'
import { useSelector } from 'react-redux'

const MiniGrafico = ({ codigo }) => {

  const { datos } = useSelector(state => state.datos)
  const datosDivision = datos.series.find(d => d.codigoDivision === codigo)

  return (
    <div className="MiniGrafico">
      <Line
        data={{
          labels: datos.semanas,
          datasets: [{
            data: datosDivision.acumulados,
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
                callback: (v, i, vals) => i === 0 || i === vals.length - 1 ? `Sem. ${v}` : null
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
