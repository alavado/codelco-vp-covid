import geoJSONRegiones from '../../data/geojson/regiones.json'
import divisiones from '../../data/csv/divisiones.json'
import datosContagios from '../../data/csv/data_codelco_semanal.json'

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
        return state
      }
      const { Region: titulo } = geoJSONRegiones.features
        .find(f => f.properties.codregion === Number(codigo))
        .properties
      const divisionesRegion = divisiones.filter(d => d.region === Number(codigo))
      const casosContratistas = divisionesRegion
        .reduce((sum, division) => sum + datosContagios.series.find(d => d.codigoDivision === division.codigo).externosAcum.slice(-1)[0], 0)
      const casosPropios = divisionesRegion
        .reduce((sum, division) => sum + datosContagios.series.find(d => d.codigoDivision === division.codigo).propiosAcum.slice(-1)[0], 0)
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
      const codigo = action.payload
      if (!codigo || codigo === state.codigo) {
        return state
      }
      const division = divisiones.find(d => d.codigo === codigo)
      const datosDivision = datosContagios.series.find(s => s.codigoDivision === codigo)
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
  payload: codigo
})

export const muestraDivisionEnMarcador = codigo => ({
  type: fijarDivision,
  payload: codigo
})

export const muestraMarcador = () => ({
  type: mostrarMarcador,
  payload: true
})

export const escondeMarcador = () => ({
  type: mostrarMarcador,
  payload: false
})