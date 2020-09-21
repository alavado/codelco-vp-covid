import React, { useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import geoJSONRegiones from '../../../data/geojson/regiones.json'
import './CapaRegiones.css'
import { obtenerColorRegion } from '../../../helpers/colores'

const CapaRegiones = () => {

  const geoJSONConColres = useMemo(() => {
    return {
      ...geoJSONRegiones,
      features: geoJSONRegiones.features.map(f => ({
        ...f,
        properties: {
          ...f.properties,
          color: obtenerColorRegion(f.properties.codregion)
        }
      }))
    }
  }, [])

  return (
    <>
      <Source
        id="source-regiones"
        type="geojson"
        data={geoJSONConColres}
      >
        <Layer
          id="layer-regiones-fill"
          type="fill"
          paint={{
            'fill-color': ['get', 'color'],
            'fill-opacity': 1
          }}
        />
        <Layer
          id="layer-regiones-line"
          type="line"
          paint={{
            'line-color': 'white',
            'line-opacity': 1
          }}
        />
      </Source>
    </>
  )
}

export default CapaRegiones
