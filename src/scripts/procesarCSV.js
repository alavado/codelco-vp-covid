const fs = require('fs')
const moment = require('moment')

const csv = fs.readFileSync('src/data/csv/data_codelco_diario.csv')
const filas = `${csv}`.split('\n').slice(1)
const divisiones = Array.from(new Set(filas.map(f => f.split(',')[0].replace(/["-]/g, '')))).filter(v => v)

const procesarFilas = (filas, division, tipoTrabajador) => {
  return filas
    .filter(f => f.split(',')[0] === `"${division}"` && f.split(',')[3] === `"${tipoTrabajador}"`)
      .map(f => {
        const [division, semana, fecha, tipo_personal, n_trabajador_promedio_faena, casos_vigentes_minsal_acumulados, casos_vigentes_codelco_acumulados, total_casos_nuevos_confirmados_sint, total_casos_nuevos_confirmados_asint, total_pcr_realizadas, total_pcr_positivas, total_anticuerpo_realizadas, total_anticuerpo_positivas, total_antigeno_realizadas, total_antigeno_positivas, total_antigeno_pcr_positivas, n_contagio_laboral, total_casos_nuevos] = f.split(',')
        if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(fecha)) {
          return null
        }
        return {
          fecha,
          trabajadores: n_trabajador_promedio_faena.slice(1, -1),
          casosNuevos: Number(total_casos_nuevos)
        }
      })
      .filter(v => v)
}

const series = []
divisiones.forEach(d => {
  series.push({
    codigo: d,
    propios: procesarFilas(filas, d, 'Propios'),
    contratistas: procesarFilas(filas, d, 'Contratistas')
  })
})

const [fechaInicial, fechaFinal] = series.reduce((prev, d) => {
  const { contratistas, propios } = d
  const inicialD = contratistas[0].fecha < propios[0].fecha ? contratistas[0].fecha : propios[0].fecha
  const finalD = contratistas.slice(-1)[0].fecha > propios.slice(-1)[0].fecha ? contratistas.slice(-1)[0].fecha : propios.slice(-1)[0].fecha
  return [prev[0] < inicialD ? prev[0] : inicialD, prev[1] > finalD ? prev[1] : finalD]
}, ['2030-01-01', '1970-01-01'])

const inicio = moment(fechaInicial), fin = moment(fechaFinal)
const propiosCodelco = [], contratistasCodelco = []
while (!inicio.isSame(fin)) {
  propiosCodelco.push(series
    .map(d => d.propios)
    .reduce((prev, serie) => {
      const casosFecha = serie.find(d => d.fecha === inicio.format('YYYY-MM-DD'))
      return prev + (casosFecha ? casosFecha.casosNuevos : 0)
    }, 0))
  contratistasCodelco.push(series
    .map(d => d.contratistas)
    .reduce((prev, serie) => {
      const casosFecha = serie.find(d => d.fecha === inicio.format('YYYY-MM-DD'))
      return prev + (casosFecha ? casosFecha.casosNuevos : 0)
    }, 0))
  inicio.add(1, 'day')
}

series.push({
  codigo: 'Codelco',
  propios: propiosCodelco,
  contratistas: contratistasCodelco
})

fs.writeFileSync('src/data/csv/data_codelco.json', JSON.stringify(series))