import semanasEpi from '../data/minsal/semanas.json'
import { parse, compareDesc } from 'date-fns'

export const procesarCSV = csv => {
  const filas = `${csv}`.split('\n').slice(1).filter(f => f)

  const encabezados = [
    'codigoDivision',
    'semEpidem',
    'ano',
    'nuevos_propios',
    'nuevos_externos',
    'incidencia_semal',
    'acumulados_sema',
    'porcentaje_asintomaticos',
    'positividad_antigeno',
    'tasa_positividad(1000)',
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
    'SO_trazabilidadOportu_datox',
    'SO_busqueda_durante',
    'SO_busqueda_durante_datox',
    'SE_seguimientoDesempeno_contactos',
    'SE_seguimientoDesempeno_contactos_datox',
    'SE_seguimientoDesempeno_contactos_datoy'    
  ]
  
  const datos = filas.map(fila => {
    return fila
      .split(',')
      .reduce((obj, dato, i) => ({
        ...obj,
        [encabezados[i]]: dato
      }), {})
  })

  const ultimaSemana = 53;//Object.keys(semanasEpi).find(s => compareDesc(parse(semanasEpi[s].termino, 'dd-MM-yyyy', new Date()), Date.now()) <= 0)
  const divisiones = Array.from(new Set(datos.map(d => d.codigoDivision))).filter(v => v)
  const semanas = Array.from(new Set(datos.map(d => Number(d.semEpidem)))).filter(d => d).slice(0, ultimaSemana)

  const series = divisiones.map(codigoDivision => {
    const datosDivision = datos.filter(d => d.codigoDivision === codigoDivision).slice(0, ultimaSemana)
    const nuevosPropios = datosDivision.map(d => Number(isNaN(d.nuevos_propios) ? 0 : d.nuevos_propios))
    const nuevosExternos = datosDivision.map(d => Number(isNaN(d.nuevos_externos) ? 0 : d.nuevos_externos))
    const seriesDivision = encabezados.slice(1)
      .reduce((obj, columna) => ({
        ...obj,
        [columna]: datosDivision.map(d => d[columna])
      }), {})
    return {
      codigoDivision,
      nuevosPropios,
      nuevosExternos,
      propiosAcum: nuevosPropios.reduce((prev, v) => [...prev, prev.slice(-1)[0] + Number(isNaN(v) ? 0 : v)], [0]),
      externosAcum: nuevosExternos.reduce((prev, v) => [...prev, prev.slice(-1)[0] + Number(isNaN(v) ? 0 : v)], [0]),
      ...seriesDivision
    }
  })
  
  return {
    semanas,
    series
  }
}
