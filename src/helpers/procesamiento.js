export const procesarCSV = csv => {
  const filas = `${csv}`.split('\n').slice(1).filter(f => f)

  const encabezados = [
    'codigoDivision',
    'semana',
    'nuevosPropios',
    'nuevosExternos',
    'incidenciaSemanal',
    'acumulados',
    'porcentajeAsintomaticos',
    'positividadAntigeno',
    'tasaPositividad1000',
    'SE_incidencia',
    'SE_positividad',
    'SE_seguimientoInicio',
    'SE_seguimientoDesempeno',
    'SE_notificacionOportunidad',
    'SE_contactosDeteccion',
    'SE_trazabilidadOportuna',
    'SE_trazabilidadDesempeno',
    'SO_busqueda',
    'SO_testeo',
    'SO_asintomaticos',
    'SO_brotes',
    'SO_notificacionOportuna',
    'SO_trazabilidadOportuna'
  ]
  
  const datos = filas.map(fila => {
    return fila
      .split(',')
      .reduce((obj, dato, i) => ({
        ...obj,
        [encabezados[i]]: i > 0 ? Number(dato) : dato
      }), {})
  })
  
  const divisiones = Array.from(new Set(datos.map(d => d.codigoDivision))).filter(v => v)
  const semanas = Array.from(new Set(datos.map(d => d.semana))).filter(d => d)
  
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
      propiosAcum: nuevosPropios.reduce((prev, v) => [...prev, prev.slice(-1)[0] + v], [0]).slice(1),
      externosAcum: nuevosExternos.reduce((prev, v) => [...prev, prev.slice(-1)[0] + v], [0]).slice(1),
      ...seriesDivision
    }
  })
  
  return {
    semanas,
    series
  }
}
