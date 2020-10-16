import dataCodelco from '../data/csv/data_codelco.json'

export const indicadores = [
  'Evolución de casos',
  'Testeo/positividad/Desempeño testeo (casos asintomáticos)',
  'Notificación y seguimiento oportuno casos',
  'Investigación y trazabilidad de contactos (N° contactos/caso; seguimiento oportuno)',
  'Desempeño trazabilidad (casos nuevos Provenientes de contactos)'
]

export const obtenerCasosPor10000 = codigoDivision => {
  const { contratistasPor10000, propiosPor10000 } = dataCodelco.series.find(s => s.codigo === codigoDivision)
  return contratistasPor10000.slice(-1)[0] + propiosPor10000.slice(-1)[0]
}