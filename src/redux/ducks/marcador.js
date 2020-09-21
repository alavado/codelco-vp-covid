import geoJSONRegiones from '../../data/geojson/regiones.json'
import divisiones from '../../data/csv/divisiones.json'
import datosContagios from '../../data/csv/data_codelco.json'

const fijarRegion = 'marcador/fijarRegion'
const fijarDivision = 'marcador/fijarDivision'
const mostrarMarcador = 'marcador/mostrarMarcador'

const defaultState = {
  visible: false
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case fijarRegion: {
      const codigo = action.payload
      if (!codigo || codigo === state.codigo) {
        return {
          ...state
        }
      }
      const { Region: titulo } = geoJSONRegiones.features
        .find(f => f.properties.codregion === Number(codigo))
        .properties
      const divisionesRegion = divisiones.filter(d => d.region === Number(codigo))
      const casosContratistas = divisionesRegion
        .reduce((sum, division) => sum + datosContagios.series.find(d => d.codigo === division.codigo).totalContratistas, 0)
      const casosPropios = divisionesRegion
        .reduce((sum, division) => sum + datosContagios.series.find(d => d.codigo === division.codigo).totalPropios, 0)
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
      return {
        ...state
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
  payload: codigo
})

export const muestraDivisionEnMarcador = codigo => ({
  type: fijarDivision
})

export const muestraMarcador = () => ({
  type: mostrarMarcador,
  payload: true
})

export const escondeMarcador = () => ({
  type: mostrarMarcador,
  payload: false
})