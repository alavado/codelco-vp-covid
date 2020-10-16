const fs = require('fs')
const moment = require('moment')
const { obtenerFechasLimite, procesarFilasCSV, encontrarDatoEnFecha } = require('./helpers')

const csv = fs.readFileSync('src/data/csv/data_codelco_diario.csv')
const filas = `${csv}`.split('\n').slice(1)
const divisiones = Array.from(new Set(filas.map(f => f.split(',')[0].replace(/["-]/g, '')))).filter(v => v)

const series = divisiones.map(d => ({
  codigo: d,
  propios: procesarFilasCSV(filas, d, 'Propios'),
  contratistas: procesarFilasCSV(filas, d, 'Contratistas')
}))

const [fechaInicial, fechaFinal] = obtenerFechasLimite(series)
const inicio = moment(fechaInicial), fin = moment(fechaFinal)
const propiosCodelco = [], contratistasCodelco = []
const propiosCodelcoPor10000 = [], contratistasCodelcoPor10000 = []
const fechas = []

while (inicio.isSameOrBefore(fin)) {
  const fechaFormateada = inicio.format('YYYY-MM-DD')
  propiosCodelco.push(series
    .map(d => d.propios)
    .reduce((prev, serie) => prev + encontrarDatoEnFecha(serie, 'casosNuevos', fechaFormateada), 0))
  contratistasCodelco.push(series
    .map(d => d.contratistas)
    .reduce((prev, serie) => prev + encontrarDatoEnFecha(serie, 'casosNuevos', fechaFormateada), 0))
  propiosCodelcoPor10000.push(series
    .map(d => d.propios)
    .reduce((prev, serie) => prev + encontrarDatoEnFecha(serie, 'casosPor10000', fechaFormateada), 0))
  contratistasCodelcoPor10000.push(series
    .map(d => d.contratistas)
    .reduce((prev, serie) => prev + encontrarDatoEnFecha(serie, 'casosPor10000', fechaFormateada), 0))
  fechas.push(fechaFormateada)
  inicio.add(1, 'day')
}

const seriesCompletas = [
  ...series.map(serie => {
    return {
      codigo: serie.codigo,
      propios: fechas.map(fecha => encontrarDatoEnFecha(serie.propios, 'casosNuevos', fecha)),
      contratistas: fechas.map(fecha => encontrarDatoEnFecha(serie.contratistas, 'casosNuevos', fecha)),
      propiosPor10000: fechas.map(fecha => encontrarDatoEnFecha(serie.propios, 'casosPor10000', fecha)),
      contratistasPor10000: fechas.map(fecha => encontrarDatoEnFecha(serie.contratistas, 'casosPor10000', fecha))
    }
  }),
  {
    codigo: 'Codelco',
    propios: propiosCodelco,
    contratistas: contratistasCodelco,
    propiosPor10000: propiosCodelcoPor10000,
    contratistasPor10000: contratistasCodelcoPor10000
  }
]

const datos = {
  fechas,
  series: seriesCompletas.map(serie => {
    const propiosAcum = serie.propios.reduce((prev, v) => [...prev, v + prev.slice(-1)[0]], [0]).slice(1)
    const contratistasAcum = serie.contratistas.reduce((prev, v) => [...prev, v + prev.slice(-1)[0]], [0]).slice(1)
    return {
      ...serie,
      propiosAcum,
      contratistasAcum,
      totalPropios: propiosAcum.slice(-1)[0],
      totalContratistas: contratistasAcum.slice(-1)[0],
      total: propiosAcum.slice(-1)[0] + contratistasAcum.slice(-1)[0]
    }
  })
}

fs.writeFileSync('src/data/csv/data_codelco.json', JSON.stringify(datos))