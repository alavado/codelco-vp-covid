import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import divisiones from '../../../../data/csv/data_codelco.json'
import { colorTrabajadoresContratistas, colorTrabajadoresPropios } from '../../../../helpers/colores'
import './MiniDona.css'

const MiniDona = ({ codigo }) => {

  const datosDivision = divisiones.series.find(d => d.codigo === codigo)
  const casosPropios = datosDivision.propiosAcum.slice(-1)[0]
  const casosContratistas = datosDivision.contratistasAcum.slice(-1)[0]
  const totalCasos = casosPropios + casosContratistas
  const porcentajePropios = (100 * casosPropios / totalCasos).toLocaleString('es-CL', { maximumFractionDigits: 1 })
  const porcentajeContratistas = (100 * casosContratistas / totalCasos).toLocaleString('es-CL', { maximumFractionDigits: 1 })

  return (
    <div className="MiniDona">
      <Doughnut
        data={{
          labels: [`${casosPropios} casos propios (${porcentajePropios}%)`, `${casosContratistas} casos contratistas (${porcentajeContratistas}%)`],
          datasets: [{
            data: [casosPropios, casosContratistas],
            backgroundColor: [colorTrabajadoresPropios, colorTrabajadoresContratistas]
          }]
        }}
        options={{
          maintainAspectRatio: false,
          legend: {
            position: 'top',
            align: 'start',
            labels: {
              boxWidth: 30,
              fontSize: 11
            },
          },
          tooltips: {
            callbacks: {
              label: item => `${item.index === 0 ? 'Propios' : 'Contratistas'}: ${item.index === 0 ? casosPropios : casosContratistas} casos`
            }
          }
        }}
      />
    </div>
  )
}

export default MiniDona
