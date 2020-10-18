import divisiones from '../data/csv/divisiones.json'
import dataCodelco from '../data/csv/data_codelco_semanal.json'
import { indicadores } from './indicadores'

export const obtenerColorRegion = codigoRegion => {
  const divisionesRegion = divisiones.filter(d => d.region === codigoRegion)
  if (divisionesRegion.length === 0) {
    return '#cdd0d0'
  }
  const casosDivisiones = dataCodelco.series.filter(s => divisionesRegion.some(d => d.codigo === s.codigoDivision))
  const totalCasosDivisionesRegion = casosDivisiones.map(s => s.acumulados.slice(-1)[0]).reduce((sum, v) => sum + v)
  return escala.find((v, i) => !escala[i + 1] || escala[i + 1].maximo > totalCasosDivisionesRegion).color
}

export const obtenerColorDivision = codigoDivision => {
  const dataDivision = dataCodelco.series.find(s => s.codigoDivision === codigoDivision)
  const totalCasosDivision = dataDivision.acumulados.slice(-1)[0]
  return escala.find((v, i) => !escala[i + 1] || escala[i + 1].maximo > totalCasosDivision).color
}

export const escala = [
  [0, '#95DCF4', '1 - 49'],
  [50, '#54CBF2', '50 - 99'],
  [100, '#00ACE3', '100 - 499'],
  [500, '#008EBC', '500 o más'],
  [1000, '#007092', 'Más de 100']
].map(paso => ({ maximo: paso[0], color: paso[1], leyenda: paso[2] }))

export const colorTrabajadoresPropios = '#fe8720'
export const colorTrabajadoresContratistas = '#009b9e'

export const obtenerColorIndicadorPanel = (indicador, valor) => {
  switch (indicador) {
    case indicadores[0]: {
      if (valor < 1) return '#1dd600'
      if (valor < 5) return '#ffc001'
      if (valor < 10) return '#ff7b24'
      else return '#ff0900'
    }
    default: return 'lightgray'
  }
}