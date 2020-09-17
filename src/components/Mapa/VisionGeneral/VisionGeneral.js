import React, { useMemo, useState } from 'react'
import MiniGrafico from './MiniGrafico'
import datos from '../../../data/csv/data_codelco.json'
import divisiones from '../../../data/csv/divisiones.json'
import moment from 'moment'
import './VisionGeneral.css'
import Select from 'react-select'

const options = divisiones.map(d => ({
  value: d.codigo,
  label: d.nombre
}))

const VisionGeneral = () => {

  const [codigo, setCodigo] = useState('Codelco')

  const [casosUltimos7Dias, totalCasosCodelco, inicio, fin] = useMemo(() => {
    const { total, contratistasAcum, propiosAcum } = datos.series.find(s => s.codigo === codigo)
    const difContratistas = contratistasAcum.slice(-1)[0] - contratistasAcum.slice(-8)[0]
    const difPropios = propiosAcum.slice(-1)[0] - propiosAcum.slice(-8)[0]
    const inicio = datos.fechas.slice(-7)[0]
    const fin = datos.fechas.slice(-1)[0]
    return [difContratistas + difPropios, total, moment(inicio), moment(fin)]
  }, [codigo])

  return (
    <div className="VisionGeneral">
      <div>
        <Select
          options={options}
          onChange={e => setCodigo(e.value)}
        />
        <div className="VisionGeneral__nuevos_casos">
          {casosUltimos7Dias} nuevos casos
        </div>
        <div className="VisionGeneral__intervalo">
          Última semana ({inicio.format('D [de] MMMM')} al {fin.format('D [de] MMMM')})
        </div>
        <MiniGrafico codigo={codigo} />
        <div className="VisionGeneral__total_casos">
          {totalCasosCodelco} casos
        </div>
        <div className="VisionGeneral__intervalo">
         Desde el {moment(datos.fechas[0]).format('D [de] MMMM')} al {fin.format('D [de] MMMM')}
        </div>
      </div>
      <div className="VisionGeneral__fecha_actualizacion">
        Actualizado hasta el {fin.format('D [de] MMMM')}<br />
        ({fin.fromNow()})
      </div>
    </div>
  )
}

export default VisionGeneral
