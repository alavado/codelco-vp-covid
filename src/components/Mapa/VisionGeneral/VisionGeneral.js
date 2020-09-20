import React, { useMemo, useState } from 'react'
import MiniGrafico from './MiniGrafico'
import datos from '../../../data/csv/data_codelco.json'
import divisiones from '../../../data/csv/divisiones.json'
import geoJSONRegiones from '../../../data/geojson/regiones.json'
import moment from 'moment'
import './VisionGeneral.css'
import Select from 'react-select'
import MiniDona from './MiniDona'

const divisionesAgrupadasPorRegion = Array.from(new Set(divisiones.map(d => d.region)))
  .sort((r1, r2) => r1 < r2 ? -1 : 1)
  .map(region => {
    const divisionesRegion = divisiones.filter(d => d.region === region)
    const feature = geoJSONRegiones.features.find(f => Number(f.properties.codregion) === Number(region))
    const label = feature?.properties.Region ?? 'General'
    return {
      label,
      options: divisionesRegion.map(d => ({ value: d.codigo, label: d.nombre }))
    }
  })

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
      <div className="VisionGeneral__contenedor_superior">
        <label
          htmlFor="selector_division"
          className="VisionGeneral__label_selector_division"
        >
          División
        </label>
        <Select
          id="selector_division"
          options={divisionesAgrupadasPorRegion}
          defaultValue={divisionesAgrupadasPorRegion[0].options[0]}
          onChange={e => setCodigo(e.value)}
          className="VisionGeneral__selector_division"
          formatGroupLabel={data => (
            <div>
              <span>{data.label}</span>
            </div>
          )}
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
        <MiniDona codigo={codigo} />
      </div>
      <div className="VisionGeneral__fecha_actualizacion">
        Actualizado hasta el {fin.format('D [de] MMMM')}<br />
        ({fin.fromNow()})
      </div>
    </div>
  )
}

export default VisionGeneral
