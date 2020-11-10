import { coloresIndicadores } from './indicadores'
import datosRegiones from '../data/csv/divisiones.json'
import store from '../redux/store'

export const obtenerColorRegion = codigoRegion => {
  const divisionesRegion = datosRegiones.filter(d => d.region === codigoRegion)
  if (divisionesRegion.length === 0) {
    return '#cdd0d0'
  }
  const { datos } = store.getState().datos
  const casosDivisiones = datos.series.filter(s => divisionesRegion.some(d => d.codigo === s.codigoDivision))
  const totalCasosDivisionesRegion = casosDivisiones.map(s => s.acumulados.slice(-1)[0]).reduce((sum, v) => sum + v)
  return escala.find((v, i) => !escala[i + 1] || escala[i + 1].maximo > totalCasosDivisionesRegion).color
}

export const obtenerColorDivision = codigoDivision => {
  const { datos } = store.getState().datos
  const dataDivision = datos.series.find(s => s.codigoDivision === codigoDivision)
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
  if (valor === -2) return coloresIndicadores.celeste
  if (valor === -1) return coloresIndicadores.gris
  if (valor === 2) return coloresIndicadores.rojo
  if (valor === 1) return coloresIndicadores.amarillo
  else return coloresIndicadores.verde
}