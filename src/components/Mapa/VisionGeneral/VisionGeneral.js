import React, { useMemo } from 'react'
import MiniGrafico from './MiniGrafico'
import datos from '../../../data/csv/data_codelco_semanal.json'
import divisiones from '../../../data/csv/divisiones.json'
import geoJSONRegiones from '../../../data/geojson/regiones.json'
import Select from 'react-select'
import TotalCasos from './TotalCasos'
import { useSelector, useDispatch } from 'react-redux'
import { muestraDivision } from '../../../redux/ducks/division'
import './VisionGeneral.css'
import { Link } from 'react-router-dom'
import { InlineIcon } from '@iconify/react'
import chartBox from  '@iconify/icons-mdi/chart-bar'
import semanasEpidemilogicas from '../../../data/minsal/semanas.json'

const divisionesAgrupadasPorRegion = Array.from(new Set(divisiones.map(d => d.region)))
  .sort((r1, r2) => r1 < r2 ? -1 : 1)
  .map(region => {
    const divisionesRegion = divisiones.filter(d => d.region === region)
    const feature = geoJSONRegiones.features.find(f => Number(f.properties.codregion) === Number(region))
    const label = feature?.properties.Region ?? 'Global'
    return {
      label,
      options: divisionesRegion.map(d => ({ value: d.codigo, label: d.nombre }))
    }
  })

const VisionGeneral = () => {

  const { codigo } = useSelector(state => state.division)
  const dispatch = useDispatch()

  const [casosUltimos7Dias, totalCasosCodelco, semanas] = useMemo(() => {
    const serie = datos.series.find(d => d.codigoDivision === codigo)
    return [
      serie.nuevosExternos.slice(-1)[0] + serie.nuevosPropios.slice(-1)[0],
      serie.acumulados.slice(-1)[0],
      datos.semanas
    ]
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
          onChange={e => dispatch(muestraDivision(e.value))}
          className="VisionGeneral__selector_division"
          value={{ value: codigo, label: divisiones.find(d => d.codigo === codigo).nombre }}
          formatGroupLabel={data => (
            <div>
              <span>{data.label}</span>
            </div>
          )}
        />
        <div className="VisionGeneral__nuevos_casos">
          {casosUltimos7Dias} nuevo{casosUltimos7Dias !== 1 && 's'} caso{casosUltimos7Dias !== 1 && 's'}
        </div>
        <div className="VisionGeneral__intervalo">
          Semana {semanas.slice(-1)[0]} - {semanasEpidemilogicas[semanas.slice(-1)[0]]}
        </div>
        <MiniGrafico codigo={codigo} />
        <div className="VisionGeneral__total_casos">
          {totalCasosCodelco.toLocaleString('de-DE')} casos hasta la fecha
        </div>
        <TotalCasos codigo={codigo} />
        <Link className="VisionGeneral__link_grafico" to={`/graficos/${codigo}`}>
          <InlineIcon icon={chartBox} className="VisionGeneral__link_grafico_icono" />
          Ver gráficos
        </Link>
      </div>
      <div className="VisionGeneral__fecha_actualizacion">
        Datos más recientes: Semana {semanas.slice(-1)[0]}<br />
        {/* ({fin.fromNow()}) */}
      </div>
    </div>
  )
}

export default VisionGeneral
