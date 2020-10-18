const { assert } = require('console')
const fs = require('fs')
const archivo = 'src/data/csv/base_dashboard.csv'
const csv = fs.readFileSync(archivo)
const filas = `${csv}`.split('\n').slice(1).filter(f => f)

const datos = filas.map(fila => {
  const [codigoDivision, semana, nuevosPropios, nuevosExternos, incidenciaSemanal, acumulados] = fila.split(';')
  return ({
    codigoDivision,
    semana: Number(semana),
    nuevosPropios: Number(nuevosPropios),
    nuevosExternos: Number(nuevosExternos),
    incidenciaSemanal: Number(incidenciaSemanal),
    acumulados: Number(acumulados),
  })
})

const divisiones = Array.from(new Set(datos.map(d => d.codigoDivision))).filter(v => v)
const semanas = Array.from(new Set(datos.map(d => d.semana))).filter(d => d)

const series = divisiones.map(codigoDivision => {
  const datosDivision = datos.filter(d => d.codigoDivision === codigoDivision)
  assert(datosDivision.length === semanas.length, 'Faltan semanas')
  return {
    codigoDivision,
    nuevosPropios: datos.map(d => d.nuevosPropios),
    nuevosExternos: datos.map(d => d.nuevosExternos),
    incidenciaSemanal: datos.map(d => d.incidenciaSemanal),
    acumulados: datos.map(d => d.acumulados)
  }
})

const datosCSV = {
  semanas,
  series
}

fs.writeFileSync('src/data/csv/data_codelco_semanal.json', JSON.stringify(datosCSV))
