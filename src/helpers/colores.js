import divisiones from '../data/csv/divisiones.json'
import dataCodelco from '../data/csv/data_codelco.json'

export const obtenerColorRegion = codigoRegion => {
  const divisionesRegion = divisiones.filter(d => d.region === codigoRegion)
  if (divisionesRegion.length === 0) {
    return '#cdd0d0'
  }
  const casosDivisiones = dataCodelco.series.filter(s => divisionesRegion.some(d => d.codigo === s.codigo))
  const totalCasosDivisionesRegion = casosDivisiones.map(s => [...s.contratistas, ...s.propios].reduce((sum, v) => sum + v)).reduce((sum, v) => sum + v)
  if (totalCasosDivisionesRegion < 50) {
    return '#DEDA5D'
  }
  else if (totalCasosDivisionesRegion < 100) {
    return '#73BADE'
  }
  else if (totalCasosDivisionesRegion < 500) {
    return '#52859E'
  }
  else if (totalCasosDivisionesRegion < 1000) {
    return '#2B4552'
  }
  else {
    return '#1D2F38'
  }
}