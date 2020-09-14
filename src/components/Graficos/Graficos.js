import React, { useMemo } from 'react'
import divisiones from '../../data/csv/data_codelco.json'
import './Graficos.css'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'

const Graficos = () => {

  const [labels, data] = useMemo(() => {
    const datosCodelco = divisiones.find(d => d.codigo === 'Codelco')
    return [
      datosCodelco.map(d => d.fecha),
      datosCodelco.map(d => d.casosNuevos)
    ]
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
