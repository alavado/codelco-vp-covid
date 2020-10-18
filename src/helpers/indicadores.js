import dataCodelco from '../data/csv/data_codelco_semanal.json'

export const coloresIndicadores = {
  verde: '#1dd600',
  amarillo: '#ffc001',
  naranja: '#ff7b24',
  rojo: '#ff0900',
  gris: 'lightgray'
}

export const indicadores = [
  {
    nombre: 'Evolución de casos',
    descripcion: 'Nuevos casos semanales por cada 10.000 trabajadores',
    niveles: [
      {
        color: coloresIndicadores.verde,
        nombre: '0 a 1 caso'
      },
      {
        color: coloresIndicadores.amarillo,
        nombre: '1 a 5 casos'
      },
      {
        color: coloresIndicadores.naranja,
        nombre: '5 a 10 casos'
      },
      {
        color: coloresIndicadores.rojo,
        nombre: 'más de 10 casos'
      }
    ]
  },
  {
    nombre: 'Testeo / positividad / Desempeño testeo (casos asintomáticos)',
  },
  {
    nombre: 'Notificación y seguimiento oportuno casos',
  },
  {
    nombre: 'Investigación y trazabilidad de contactos (N° contactos/caso; seguimiento oportuno)',
  },
  {
    nombre: 'Desempeño trazabilidad (casos nuevos Provenientes de contactos)'
  },
]

export const obtenerCasosPor10000 = codigoDivision => {
  return dataCodelco.series.find(s => s.codigoDivision === codigoDivision).incidenciaSemanal.slice(-1)[0]
}