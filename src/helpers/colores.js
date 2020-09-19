import divisiones from '../data/csv/divisiones.json'
import dataCodelco from '../data/csv/data_codelco.json'

export const obtenerColorRegion = codigoRegion => {
  const divisionesRegion = divisiones.filter(d => d.region === codigoRegion)
  if (divisionesRegion.length === 0) {
    return '#cdd0d0'
  }
  const casosDivisiones = dataCodelco.series.filter(s => divisionesRegion.some(d => d.codigo === s.codigo))
  const totalCasosDivisionesRegion = casosDivisiones.map(s => [...s.contratistas, ...s.propios].reduce((sum, v) => sum + v)).reduce((sum, v) => sum + v)
  return escala.find((v, i) => !escala[i + 1] || escala[i + 1].maximo > totalCasosDivisionesRegion).color
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
