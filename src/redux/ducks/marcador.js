import geoJSONRegiones from '../../data/geojson/regiones.json'
import vicepresidencias from '../../data/csv/vicepresidencias.json'
import store from '../store'

const fijarRegion = 'marcador/fijarRegion'
const fijarDivision = 'marcador/fijarDivision'
const mostrarMarcador = 'marcador/mostrarMarcador'

const defaultState = {
  visible: false
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case fijarRegion: {
      const { codigo, datos } = action.payload
      if (!codigo || codigo === state.codigo) {
        return state
      }
      const { Region: titulo } = geoJSONRegiones.features
        .find(f => f.properties.codregion === Number(codigo))
        .properties
      const divisionesRegion = vicepresidencias.filter(d => d.region === Number(codigo))
      const casosContratistas = divisionesRegion
        .reduce((sum, division) => sum + datos.series.find(d => d.codigoDivision === division.codigo).externosAcum.slice(-1)[0], 0)
      const casosPropios = divisionesRegion
        .reduce((sum, division) => sum + datos.series.find(d => d.codigoDivision === division.codigo).propiosAcum.slice(-1)[0], 0)
      return {
        ...state,
        codigo,
        titulo,
        casosPropios,
        casosContratistas,
        visible: true
      }
    }
    case fijarDivision: {
      const { codigo, datos } = action.payload
      if (!codigo || codigo === state.codigo) {
        return state
      }
      const division = vicepresidencias.find(d => d.codigo === codigo)
      const datosDivision = datos.series.find(s => s.codigoDivision === codigo)
      return {
        ...state,
        codigo,
        titulo: division.nombre,
        casosPropios: datosDivision.propiosAcum.slice(-1)[0],
        casosContratistas: datosDivision.externosAcum.slice(-1)[0],
        visible: true
      }
    }
    case mostrarMarcador: {
      return {
        ...state,
        visible: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const muestraRegionEnMarcador = codigo => ({
  type: fijarRegion,
  payload: {
    codigo,
    datos: store.getState().datos.datos
  }
})

export const muestraDivisionEnMarcador = codigo => ({
  type: fijarDivision,
  payload: {
    codigo,
    datos: store.getState().datos.datos
  }
})

export const muestraMarcador = () => ({
  type: mostrarMarcador,
  payload: true
})

export const escondeMarcador = () => ({
  type: mostrarMarcador,
  payload: false
})