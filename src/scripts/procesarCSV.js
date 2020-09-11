const fs = require('fs')

const csv = fs.readFileSync('src/data/csv/data_codelco_diario.csv')
const filas = `${csv}`.split('\n').slice(1)
const divisiones = Array.from(new Set(filas.map(f => f.split(',')[0].replace(/["-]/g, '')))).filter(v => v)

const procesarFilas = (filas, division, tipoTrabajador) => {
  return filas
    .filter(f => f.split(',')[0] === `"${division}"` && f.split(',')[3] === `"${tipoTrabajador}"`)
      .map(f => {
        const [division, semana, fecha, tipo_personal, n_trabajador_promedio_faena, casos_vigentes_minsal_acumulados, casos_vigentes_codelco_acumulados, total_casos_nuevos_confirmados_sint, total_casos_nuevos_confirmados_asint, total_pcr_realizadas, total_pcr_positivas, total_anticuerpo_realizadas, total_anticuerpo_positivas, total_antigeno_realizadas, total_antigeno_positivas, total_antigeno_pcr_positivas, n_contagio_laboral, total_casos_nuevos] = f.split(',')
        return {
          fecha,
          trabajadores: n_trabajador_promedio_faena.slice(1, -1),
          casosNuevos: Number(total_casos_nuevos)
        }
      })
}

const series = []
divisiones.forEach(d => {
  series.push({
    codigo: d,
    propios: procesarFilas(filas, d, 'Propios'),
    contratistas: procesarFilas(filas, d, 'Contratistas')
  })
})

fs.writeFileSync('src/data/csv/data_codelco.json', JSON.stringify(series))