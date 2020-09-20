import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import divisiones from '../../../../data/csv/data_codelco.json'
import { colorTrabajadoresContratistas, colorTrabajadoresPropios } from '../../../../helpers/colores'
import './MiniDona.css'

const MiniDona = ({ codigo }) => {

  const datosDivision = divisiones.series.find(d => d.codigo === codigo)

  return (
    <div className="MiniDona">
      <Doughnut
        data={{
          labels: ['Casos propios', 'Casos contratistas'],
          datasets: [{
            data: [datosDivision.propiosAcum.slice(-1)[0], datosDivision.contratistasAcum.slice(-1)[0]],
            backgroundColor: [colorTrabajadoresPropios, colorTrabajadoresContratistas]
          }]
        }}
        options={{
          maintainAspectRatio: false,
          legend: {
            position: 'top',
            align: 'start'
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }]
          }
        }}
      />
    </div>
  )
}

export default MiniDona
