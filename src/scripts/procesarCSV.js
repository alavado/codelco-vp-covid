const fs = require('fs')

const csv = fs.readFileSync('src/data/csv/data_codelco_diario.csv')
const filas = `${csv}`.split('\n').slice(1)
const divisiones = Array.from(new Set(filas.map(f => f.split(',')[0].replace(/["-]/g, '')))).filter(v => v)

const series = []
divisiones.forEach(d => {
  series.push({
    codigo: d,
    datosTrabajadoresPropios: filas
      .filter(f => f.split(',')[0] === `"${d}"` && f.split(',')[3] === `"Propios"`)
      .map(f => {
        const [division, semana, fecha, tipo_personal, n_trabajador_promedio_faena, casos_vigentes_minsal_acumulados, casos_vigentes_codelco_acumulados, total_casos_nuevos_confirmados_sint, total_casos_nuevos_confirmados_asint, total_pcr_realizadas, total_pcr_positivas, total_anticuerpo_realizadas, total_anticuerpo_positivas, total_antigeno_realizadas, total_antigeno_positivas, total_antigeno_pcr_positivas, n_contagio_laboral, total_casos_nuevos] = f.split(',')
        return {
          fecha,
          totalTrabajadores: Number(n_trabajador_promedio_faena.slice(1, -1)),
          casosMINSAL: Number(casos_vigentes_minsal_acumulados.slice(1, -1)),
          casosCODELCO: Number(casos_vigentes_codelco_acumulados.slice(1, -1)),
          totalCasosNuevos: Number(total_casos_nuevos)
        }
      }),
      datosTrabajadoresContratistas: filas
        .filter(f => f.split(',')[0] === `"${d}"` && f.split(',')[3] === `"Contratistas"`)
        .map(f => {
          const [division, semana, fecha, tipo_personal, n_trabajador_promedio_faena, casos_vigentes_minsal_acumulados, casos_vigentes_codelco_acumulados, total_casos_nuevos_confirmados_sint, total_casos_nuevos_confirmados_asint, total_pcr_realizadas, total_pcr_positivas, total_anticuerpo_realizadas, total_anticuerpo_positivas, total_antigeno_realizadas, total_antigeno_positivas, total_antigeno_pcr_positivas, n_contagio_laboral, total_casos_nuevos] = f
          return {
            fecha,
            totalTrabajadores: n_trabajador_promedio_faena,
            casosMINSAL: casos_vigentes_minsal_acumulados,
            casosCODELCO: casos_vigentes_codelco_acumulados,
            totalCasosNuevos: total_casos_nuevos
          }
        })
  })
})

fs.writeFileSync('src/data/csv/data_codelco.json', JSON.stringify(series))