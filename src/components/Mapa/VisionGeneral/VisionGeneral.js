import React, { useMemo } from 'react'
import MiniGrafico from './MiniGrafico'
import datos from '../../../data/csv/data_codelco.json'
import moment from 'moment'
import './VisionGeneral.css'

const VisionGeneral = () => {

  const [casosUltimos7Dias, totalCasosCodelco, inicio, fin] = useMemo(() => {
    const { total, contratistasAcum, propiosAcum } = datos.series.find(s => s.codigo === 'Codelco')
    const difContratistas = contratistasAcum.slice(-1)[0] - contratistasAcum.slice(-8)[0]
    const difPropios = propiosAcum.slice(-1)[0] - propiosAcum.slice(-8)[0]
    const inicio = datos.fechas.slice(-7)[0]
    const fin = datos.fechas.slice(-1)[0]
    return [difContratistas + difPropios, total, moment(inicio), moment(fin)]
  }, [])

  return (
    <div className="VisionGeneral">
      <div>
        <div className="VisionGeneral__nuevos_casos">
          {casosUltimos7Dias} nuevos casos
        </div>
        <div className="VisionGeneral__intervalo">
          Última semana ({inicio.format('D [de] MMMM')} al {fin.format('D [de] MMMM')})
        </div>
        <MiniGrafico />
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
