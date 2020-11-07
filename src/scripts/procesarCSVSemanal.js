const { assert } = require('console')
const fs = require('fs')
const archivo = 'src/data/csv/base_dashboard.csv'
const csv = fs.readFileSync(archivo)
const filas = `${csv}`.split('\n').slice(1).filter(f => f)

const datos = filas.map(fila => {
  const [
    codigoDivision, semana, nuevosPropios, nuevosExternos, incidenciaSemanal,
    acumulados, porcentajeAsintomaticos, positividadAntigeno, tasaPositividad1000,
    SE_incidencia, SE_positividad, SE_seguimientoInicio,
    SE_seguimientoDesempeno, SE_notificacionOportunidad, SE_contactosDeteccion,
    SE_trazabilidadOportuna, SE_trazabilidadDesempeno,
    SO_busqueda, SO_testeo, SO_asintomaticos, SO_brotes,
    SO_notificacionOportuna, SO_trazabilidadOportuna] = fila.split(',')
  return ({
    codigoDivision,
    semana: Number(semana),
    nuevosPropios: Number(nuevosPropios),
    nuevosExternos: Number(nuevosExternos),
    incidenciaSemanal: Number(incidenciaSemanal),
    acumulados: Number(acumulados),
    porcentajeAsintomaticos: Number(porcentajeAsintomaticos),
    tasaPositividad1000: Number(tasaPositividad1000),
    SE_incidencia: Number(SE_incidencia),
    SE_positividad: Number(SE_positividad),
    SE_seguimientoInicio: Number(SE_seguimientoInicio),
    SE_seguimientoDesempeno: Number(SE_seguimientoDesempeno),
    SE_notificacionOportunidad: Number(SE_notificacionOportunidad),
    SE_contactosDeteccion: Number(SE_contactosDeteccion),
    SE_trazabilidadOportuna: Number(SE_trazabilidadOportuna),
    SE_trazabilidadDesempeno: Number(SE_trazabilidadDesempeno),
    SO_busqueda: Number(SO_busqueda),
    SO_testeo: Number(SO_testeo),
    SO_asintomaticos: Number(SO_asintomaticos),
    SO_brotes: Number(SO_brotes),
    SO_notificacionOportuna: Number(SO_notificacionOportuna),
    SO_trazabilidadOportuna: Number(SO_trazabilidadOportuna)
  })
})

const divisiones = Array.from(new Set(datos.map(d => d.codigoDivision))).filter(v => v)
const semanas = Array.from(new Set(datos.map(d => d.semana))).filter(d => d)

const series = divisiones.map(codigoDivision => {
  const datosDivision = datos.filter(d => d.codigoDivision === codigoDivision)
  assert(datosDivision.length === semanas.length, 'Faltan semanas')
  const nuevosPropios = datosDivision.map(d => d.nuevosPropios)
  const nuevosExternos = datosDivision.map(d => d.nuevosExternos)
  return {
    codigoDivision,
    nuevosPropios,
    nuevosExternos,
    propiosAcum: nuevosPropios.reduce((prev, v) => [...prev, prev.slice(-1)[0] + v], [0]).slice(1),
    externosAcum: nuevosExternos.reduce((prev, v) => [...prev, prev.slice(-1)[0] + v], [0]).slice(1),
    incidenciaSemanal: datosDivision.map(d => d.incidenciaSemanal),
    acumulados: datosDivision.map(d => d.acumulados),
    porcentajeAsintomaticos: datosDivision.map(d => d.porcentajeAsintomaticos),
    tasaPositividad1000: datosDivision.map(d => d.tasaPositividad1000),
    SE_incidencia: datosDivision.map(d => d.SE_incidencia),
    SE_positividad: datosDivision.map(d => d.SE_positividad),
    SE_seguimientoInicio: datosDivision.map(d => d.SE_seguimientoInicio),
    SE_seguimientoDesempeno: datosDivision.map(d => d.SE_seguimientoDesempeno),
    SE_notificacionOportunidad: datosDivision.map(d => d.SE_notificacionOportunidad),
    SE_contactosDeteccion: datosDivision.map(d => d.SE_contactosDeteccion),
    SE_trazabilidadOportuna: datosDivision.map(d => d.SE_trazabilidadOportuna),
    SE_trazabilidadDesempeno: datosDivision.map(d => d.SE_trazabilidadDesempeno),
    SO_busqueda: datosDivision.map(d => d.SO_busqueda),
    SO_testeo: datosDivision.map(d => d.SO_testeo),
    SO_asintomaticos: datosDivision.map(d => d.SO_asintomaticos),
    SO_brotes: datosDivision.map(d => d.SO_brotes),
    SO_notificacionOportuna: datosDivision.map(d => d.SO_notificacionOportuna),
    SO_trazabilidadOportuna: datosDivision.map(d => d.SO_trazabilidadOportuna)
  }
})

const datosCSV = {
  semanas,
  series
}

fs.writeFileSync('src/data/csv/data_codelco_semanal.json', JSON.stringify(datosCSV))
