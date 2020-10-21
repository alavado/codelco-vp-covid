const { assert } = require('console')
const fs = require('fs')
const archivo = 'src/data/csv/base_dashboard.csv'
const csv = fs.readFileSync(archivo)
const filas = `${csv}`.split('\n').slice(1).filter(f => f)

const datos = filas.map(fila => {
  const [codigoDivision, semana, nuevosPropios, nuevosExternos, incidenciaSemanal, acumulados, porcentajeAsintomaticos, positividadAntigeno, tasaPositividad1000, S_incidencia, S_asintomaticos, S_positividad] = fila.split(',')
  return ({
    codigoDivision,
    semana: Number(semana),
    nuevosPropios: Number(nuevosPropios),
    nuevosExternos: Number(nuevosExternos),
    incidenciaSemanal: Number(incidenciaSemanal),
    acumulados: Number(acumulados),
    porcentajeAsintomaticos: Number(porcentajeAsintomaticos),
    tasaPositividad1000: Number(tasaPositividad1000),
    S_incidencia: Number(S_incidencia),
    S_asintomaticos: Number(S_asintomaticos),
    S_positividad: Number(S_positividad)
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
    propiosAcum: nuevosPropios.reduce((prev, v) => [...prev, prev.slice(-1)[0] + v], [nuevosPropios[0]]),
    externosAcum: nuevosExternos.reduce((prev, v) => [...prev, prev.slice(-1)[0] + v], [nuevosExternos[0]]),
    incidenciaSemanal: datosDivision.map(d => d.incidenciaSemanal),
    acumulados: datosDivision.map(d => d.acumulados),
    porcentajeAsintomaticos: datosDivision.map(d => d.porcentajeAsintomaticos),
    tasaPositividad1000: datosDivision.map(d => d.tasaPositividad1000),
    S_incidencia:  datosDivision.map(d => d.S_incidencia),
    S_asintomaticos: datosDivision.map(d => d.S_asintomaticos),
    S_positividad: datosDivision.map(d => d.S_positividad)
  }
})

const datosCSV = {
  semanas,
  series
}

fs.writeFileSync('src/data/csv/data_codelco_semanal.json', JSON.stringify(datosCSV))
