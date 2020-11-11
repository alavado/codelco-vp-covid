export const procesarCSV = csv => {
  const filas = `${csv}`.split('\n').slice(1).filter(f => f)

  const encabezados = [
    'codigoDivision',
    'semEpidem',
    'nuevosPropios',
    'nuevosExternos',
    'incidenciaSemanal',
    'acumulados',
    'porcentajeAsintomaticos',
    'positividadAntigeno',
    'tasaPositividad1000',
    'SE_incidencia',
    'SE_incidencia_datox',
    'SE_positividad',
    'SE_positividad_datox',
    'SE_seguimientoInicio',
    'SE_seguimientoInicio_datox',
    'SE_seguimientoInicio_datoy',
    'SE_seguimientoDesempeno',
    'SE_seguimientoDesempeno_datox',
    'SE_seguimientoDesempeno_datoy',
    'SE_notificacionOportunidad',
    'SE_notificacionOportunidad_datox',
    'SE_notificacionOportunidad_datoy',
    'SE_contactosDeteccion',
    'SE_contactosDeteccion_datox',
    'SE_contactosDeteccion_datoy',
    'SE_trazabilidadOportu',
    'SE_trazabilidadOportu_datox',
    'SE_trazabilidadDesempeno',
    'SE_trazabilidadDesempeno_datox',
    'SE_trazabilidadDesempeno_datoy',
    'SO_busqueda',
    'SO_busqueda_datox',
    'SO_testeo',
    'SO_testeo_datox',
    'SO_preventiva',
    'SO_preventiva_datox',
    'SO_preventiva_datoy',
    'SO_asintomaticos',
    'SO_asintomaticos_datox',
    'SO_brotes_amarillos',
    'SO_brotes_amarillos_datox',
    'SO_brotes_rojos',
    'SO_brotes_rojos_datox',
    'SO_notificacionOportu',
    'SO_notificacionOportu_datox',
    'SO_notificacionOportu_datoy',
    'SO_trazabilidadOportu',
    'SO_trazabilidadOportu_datox'
  ]
  
  const datos = filas.map(fila => {
    return fila
      .split(',')
      .reduce((obj, dato, i) => ({
        ...obj,
        [encabezados[i]]: dato
      }), {})
  })
  
  const divisiones = Array.from(new Set(datos.map(d => d.codigoDivision))).filter(v => v)
  const semanas = Array.from(new Set(datos.map(d => Number(d.semEpidem)))).filter(d => d)
  
  const series = divisiones.map(codigoDivision => {
    const datosDivision = datos.filter(d => d.codigoDivision === codigoDivision)
    const nuevosPropios = datosDivision.map(d => d.nuevosPropios)
    const nuevosExternos = datosDivision.map(d => d.nuevosExternos)
    const seriesDivision = encabezados.slice(1)
      .reduce((obj, columna) => ({
        ...obj,
        [columna]: datosDivision.map(d => d[columna])
      }), {})
    return {
      codigoDivision,
      nuevosPropios,
      nuevosExternos,
      propiosAcum: nuevosPropios.reduce((prev, v) => [...prev, prev.slice(-1)[0] + Number(v)], [0]).slice(1),
      externosAcum: nuevosExternos.reduce((prev, v) => [...prev, prev.slice(-1)[0] + Number(v)], [0]).slice(1),
      ...seriesDivision
    }
  })
  
  return {
    semanas,
    series
  }
}
