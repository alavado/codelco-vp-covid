import React, { useMemo } from 'react'
import { Marker } from 'react-map-gl'
import './MarkerRegion.css'
import { useSelector } from 'react-redux'

const MarkerRegion = ({ latitude, longitude }) => {

  // const [nombreRegion, casosContratistas, casosPropios] = useMemo(() => {
  //   if (!codigo) {
  //     return ['Sin definir', 0, 0]
  //   }
  //   const fetureRegion = geoJSONRegiones.features.find(f => f.properties.codregion === Number(codigo))
  //   const divisionesRegion = divisiones.filter(d => d.region === Number(codigo))
  //   const casosContratistas = divisionesRegion
  //     .reduce((sum, division) => sum + datosContagios.series.find(d => d.codigo === division.codigo).totalContratistas, 0)
  //   const casosPropios = divisionesRegion
  //     .reduce((sum, division) => sum + datosContagios.series.find(d => d.codigo === division.codigo).totalPropios, 0)
  //   return [fetureRegion.properties.Region, casosContratistas, casosPropios]
  // }, [codigo])

  const { titulo, casosContratistas, casosPropios, visible } = useSelector(state => state.marcador)

  if (!visible || casosPropios === 0) {
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
          {titulo}
        </div>
        <div>{casosContratistas + casosPropios} casos</div>
        <div>{casosContratistas} contratistas</div>
        <div>{casosPropios} propios</div>
      </div>
    </Marker>
  )
}

export default MarkerRegion
