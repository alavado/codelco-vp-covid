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
    nombre: 'Casos nuevos',
    descripcion: 'Nuevos casos semanales por cada 1.000 trabajadores',
    niveles: [
      {
        color: coloresIndicadores.verde,
        nombre: '0 casos'
      },
      {
        color: coloresIndicadores.amarillo,
        nombre: 'menos de 1 caso'
      },
      {
        color: coloresIndicadores.rojo,
        nombre: 'más de 1 caso'
      }
    ]
  },
  {
    nombre: 'Porcentaje de sintomáticos',
    descripcion: 'Solo se calcula si hay más de 8 casos esa semana en esa división',
    niveles: [
      {
        color: coloresIndicadores.verde,
        nombre: 'más de 80%'
      },
      {
        color: coloresIndicadores.amarillo,
        nombre: '60% - 80%'
      },
      {
        color: coloresIndicadores.rojo,
        nombre: 'menos de 60%'
      }
    ]
  },
  {
    nombre: 'Positividad de testeo',
    descripcion: 'Expresado por cada 1.000 tests.',
    niveles: [
      {
        color: coloresIndicadores.verde,
        nombre: 'Menor a 3'
      },
      {
        color: coloresIndicadores.amarillo,
        nombre: '3 a 6'
      },
      {
        color: coloresIndicadores.rojo,
        nombre: 'Mayor a 6'
      }
    ]
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

const obtenerPropiedadValor = indicador => {
  switch (indicador.nombre) {
    case 'Casos nuevos':
      return 'incidenciaSemanal'
    case 'Porcentaje de sintomáticos':
      return 'porcentajeAsintomaticos'
    case 'Positividad de testeo':
      return 'tasaPositividad1000'
    default:
      return 'incidenciaSemanal'
  }
}

const obtenerPropiedadSemaforo = indicador => {
  switch (indicador.nombre) {
    case 'Casos nuevos':
      return 'S_incidencia'
    case 'Porcentaje de sintomáticos':
      return 'S_asintomaticos'
    case 'Positividad de testeo':
      return 'S_positividad'
    default:
      return 'S_incidencia'
  }
}

export const obtenerValorIndicador = (codigoDivision, indicador) => {
  const propiedad = obtenerPropiedadValor(indicador)
  const valor = dataCodelco.series.find(s => s.codigoDivision === codigoDivision)[propiedad].slice(-1)[0]
  return valor ?? -1
}

export const obtenerSemaforoIndicador = (codigoDivision, indicador) => {
  const propiedad = obtenerPropiedadSemaforo(indicador)
  const valor = dataCodelco.series.find(s => s.codigoDivision === codigoDivision)[propiedad].slice(-1)[0]
  return valor ?? -1
}