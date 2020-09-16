import React, { useMemo } from 'react'
import { Marker } from 'react-map-gl'
import geoJSONRegiones from '../../../data/geojson/regiones.json'
import divisiones from '../../../data/csv/divisiones.json'
import datosContagios from '../../../data/csv/data_codelco.json'
import './MarkerRegion.css'

const MarkerRegion = ({ latitude, longitude, visible, codigoRegion }) => {

  const [nombreRegion, casosContratistas, casosPropios] = useMemo(() => {
    if (!codigoRegion) {
      return ''
    }
    const fetureRegion = geoJSONRegiones.features.find(f => f.properties.codregion === Number(codigoRegion))
    const divisionesRegion = divisiones.filter(d => d.region === Number(codigoRegion))
    const casosContratistas = divisionesRegion
      .reduce((sum, division) => sum + datosContagios.series.find(d => d.codigo === division.codigo).totalContratistas, 0)
    const casosPropios = divisionesRegion
      .reduce((sum, division) => sum + datosContagios.series.find(d => d.codigo === division.codigo).totalPropios, 0)
    return [fetureRegion.properties.Region, casosContratistas, casosPropios]
  }, [codigoRegion])

  if (!visible || casosContratistas === 0) {
    return null
  }

  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      captureDrag={false}
    >
      <div className="MarkerRegion">
        <div className="MarkerRegion__nombre_region">
          {nombreRegion}
        </div>
        <div>{casosContratistas + casosPropios} casos</div>
        <div>{casosContratistas} contratistas</div>
        <div>{casosPropios} propios</div>
      </div>
    </Marker>
  )
}

export default MarkerRegion
