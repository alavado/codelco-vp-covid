import dataCodelco from '../data/csv/data_codelco_semanal.json'
import store from '../redux/store'

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
        nombre: '1 o más casos'
      }
    ]
  },
  {
    nombre: 'Porcentaje de asintomáticos',
    descripcion: 'Solo se calcula si hay más de 8 casos esa semana en esa división',
    niveles: [
      {
        color: coloresIndicadores.verde,
        nombre: 'Más de 80%'
      },
      {
        color: coloresIndicadores.amarillo,
        nombre: '(60% - 80%]'
      },
      {
        color: coloresIndicadores.rojo,
        nombre: '60% o menos'
      }
    ]
  },
  {
    nombre: 'Positividad de testeo',
    descripcion: 'Expresada por cada 1.000 tests.',
    niveles: [
      {
        color: coloresIndicadores.verde,
        nombre: 'Menor a 3'
      },
      {
        color: coloresIndicadores.amarillo,
        nombre: '(3 - 6]'
      },
      {
        color: coloresIndicadores.rojo,
        nombre: '6 o más'
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
    case 'Porcentaje de asintomáticos':
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
    case 'Porcentaje de asintomáticos':
      return 'S_asintomaticos'
    case 'Positividad de testeo':
      return 'S_positividad'
    default:
      return 'S_incidencia'
  }
}

export const obtenerValorIndicador = (codigoDivision, indicador) => {
  const retroceso = store.getState().indicadores.retroceso
  const propiedad = obtenerPropiedadValor(indicador)
  const valor = dataCodelco.series.find(s => s.codigoDivision === codigoDivision)[propiedad].slice(-1 + retroceso)[0]
  return valor ?? -1
}

export const obtenerSemaforoIndicador = (codigoDivision, indicador) => {
  const retroceso = store.getState().indicadores.retroceso
  const propiedad = obtenerPropiedadSemaforo(indicador)
  const valor = dataCodelco.series.find(s => s.codigoDivision === codigoDivision)[propiedad].slice(-1 + retroceso)[0]
  return valor ?? -1
}