import divisiones from '../data/csv/divisiones.json'
import dataCodelco from '../data/csv/data_codelco.json'

export const obtenerColorRegion = codigoRegion => {
  const divisionesRegion = divisiones.filter(d => d.region === codigoRegion)
  if (divisionesRegion.length === 0) {
    return '#cdd0d0'
  }
  const casosDivisiones = dataCodelco.series.filter(s => divisionesRegion.some(d => d.codigo === s.codigo))
  const totalCasosDivisionesRegion = casosDivisiones.map(s => [...s.contratistas, ...s.propios].reduce((sum, v) => sum + v)).reduce((sum, v) => sum + v)
  return escala.find(v => v.maximo > totalCasosDivisionesRegion).color
}

export const escala = [
  [0, '#cdd0d0'],
  [50, '#DEDA5D'],
  [100, '#73BADE'],
  [500, '#52859E'],
  [1000, '#2B4552'],
  [Infinity, '#1D2F38']
].map(paso => ({ maximo: paso[0], color: paso[1] }))
