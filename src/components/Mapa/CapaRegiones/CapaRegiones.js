import React, { useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import geoJSONComunas from '../../../data/geojson/regiones.json'
import { useParams } from 'react-router-dom'
import './CapaRegiones.css'

const CapaComunas = () => {

  const { codigo: codigoComunaSeleccionada } = useParams()

  const geoJSONComunasOtrasRegiones = useMemo(() => {
    if (!codigoComunaSeleccionada) {
      return geoJSONComunas
    }
    const comuna = geoJSONComunas.features.find(f => Number(f.properties.COD_COMUNA) === Number(codigoComunaSeleccionada))
    return {
      ...geoJSONComunas,
      features: geoJSONComunas.features.filter(f => f.properties.NOM_REG !== comuna.properties.NOM_REG)
    }
  }, [codigoComunaSeleccionada])

  const geoJSONComunasRegion = useMemo(() => {
    if (!codigoComunaSeleccionada) {
      return geoJSONComunas
    }
    const comuna = geoJSONComunas.features.find(f => Number(f.properties.COD_COMUNA) === Number(codigoComunaSeleccionada))
    return {
      ...geoJSONComunas,
      features: geoJSONComunas.features.filter(f => f.properties.NOM_REG === comuna.properties.NOM_REG)
    }
  }, [codigoComunaSeleccionada])

  const geoJSONComuna = useMemo(() => {
    return {
      ...geoJSONComunas,
      features: geoJSONComunas.features.filter(f => f.properties.COD_COMUNA === codigoComunaSeleccionada)
    }
  }, [codigoComunaSeleccionada])

  return (
    <>
      <Source
        id="source-otras-comunas"
        type="geojson"
        data={geoJSONComunasOtrasRegiones}
      >
        <Layer
          id="layer-otras-comunas-fill"
          type="fill"
          paint={{
            'fill-color': ['get', 'colorPositividad'],
            'fill-opacity': .2
          }}
        />
        <Layer
          id="layer-otras-comunas-line"
          type="line"
          paint={{
            'line-color': '#1e0b0b',
            'line-opacity': .3
          }}
        />
      </Source>
      <Source
        id="source-comunas-region"
        type="geojson"
        data={geoJSONComunasRegion}
      >
        <Layer
          id="layer-comunas-fill"
          type="fill"
          paint={{
            'fill-color': ['get', 'colorPositividad'],
            'fill-opacity': 1
          }}
        />
        <Layer
          id="layer-comunas-line"
          type="line"
          paint={{
            'line-color': '#1e0b0b',
            'line-width': 1.25
          }}
        />
      </Source>
      <Source
        id="source-comuna"
        type="geojson"
        data={geoJSONComuna}
      >
        <Layer
          id="layer-comuna-fill"
          type="fill"
          paint={{
            'fill-color': 'black',
            'fill-opacity': .05
          }}
        />
        <Layer
          id="layer-comuna-line"
          type="line"
          paint={{
            'line-color': '#1e0b0b',
            'line-width': 3
          }}
        />
      </Source>
      {/* {labelsComunas} */}
    </>
  )
}

export default CapaComunas
