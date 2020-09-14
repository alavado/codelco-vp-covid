import React, { useMemo } from 'react'
import divisiones from '../../data/csv/data_codelco.json'
import './Graficos.css'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'

const Graficos = () => {

  const [labels, data] = useMemo(() => {
    const [fechaInicial, fechaFinal] = divisiones.reduce((prev, d) => {
      const { contratistas, propios } = d
      const inicialD = contratistas[0].fecha < propios[0].fecha ? contratistas[0].fecha : propios[0].fecha
      const finalD = contratistas.slice(-1)[0].fecha > propios.slice(-1)[0].fecha ? contratistas.slice(-1)[0].fecha : propios.slice(-1)[0].fecha
      return [prev[0] < inicialD ? prev[0] : inicialD, prev[1] > finalD ? prev[1] : finalD]
    }, ['2030-01-01', '1970-01-01'])
    console.log(fechaInicial, fechaFinal)
    return [1, 2]
  }, [])

  return (
    <div className="Graficos">
      {/* <Bar
        labels
        data
      /> */}
    </div>
  )
}

export default Graficos
