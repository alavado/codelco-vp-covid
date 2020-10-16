module.exports = {
  obtenerFechasLimite: series => {
    return series.reduce((prev, d) => {
      const { contratistas, propios } = d
      const inicialD = contratistas[0].fecha < propios[0].fecha ? contratistas[0].fecha : propios[0].fecha
      const finalD = contratistas.slice(-1)[0].fecha > propios.slice(-1)[0].fecha ? contratistas.slice(-1)[0].fecha : propios.slice(-1)[0].fecha
      return [prev[0] < inicialD ? prev[0] : inicialD, prev[1] > finalD ? prev[1] : finalD]
    }, ['2030-01-01', '1970-01-01'])
  },
  procesarFilasCSV: (filas, division, tipoTrabajador) => {
    return filas
      .filter(f => f.split(',')[0] === `"${division}"` && f.split(',')[3] === `"${tipoTrabajador}"`)
      .map(f => {
        const [
          division, semana, fecha, tipo_personal, n_trabajador_promedio_faena,
          casos_vigentes_minsal_acumulados, casos_vigentes_codelco_acumulados,
          total_casos_nuevos_confirmados_sint, total_casos_nuevos_confirmados_asint,
          total_pcr_realizadas, total_pcr_positivas, total_anticuerpo_realizadas,
          total_anticuerpo_positivas, total_antigeno_realizadas, total_antigeno_positivas,
          total_antigeno_pcr_positivas, n_contagio_laboral, total_casos_nuevos,
          sem_epidem, casos_nuevos_division_x10000, porc_casos_acum_codelco_division
        ] = f.split(',')
        if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(fecha)) {
          return null
        }
        return {
          fecha,
          trabajadores: n_trabajador_promedio_faena.slice(1, -1),
          casosNuevos: Number(total_casos_nuevos),
          casosPor10000: Number(casos_nuevos_division_x10000)
        }
      })
      .filter(v => v)
  },
  encontrarDatoEnFecha: (serie, dato, fecha) => {
    const punto = serie.find(d => d.fecha === fecha)
    return punto ? punto[dato] : null
  }
}