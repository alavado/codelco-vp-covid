import dataCodelco from '../data/csv/data_codelco_semanal.json'

export const indicadores = [
  'Evolución de casos',
  'Testeo/positividad/Desempeño testeo (casos asintomáticos)',
  'Notificación y seguimiento oportuno casos',
  'Investigación y trazabilidad de contactos (N° contactos/caso; seguimiento oportuno)',
  'Desempeño trazabilidad (casos nuevos Provenientes de contactos)'
]

export const obtenerCasosPor10000 = codigoDivision => {
  console.log(codigoDivision)
  return dataCodelco.series.find(s => s.codigoDivision === codigoDivision).incidenciaSemanal.slice(-1)[0]
}