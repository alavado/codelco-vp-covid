import store from '../redux/store'

export const coloresIndicadores = {
  verde: '#1dd600',
  amarillo: '#ffc001',
  naranja: '#ff7b24',
  rojo: '#ff0900',
  gris: 'lightgray'
}

export const indicadores = [
  // SE
  {
    nombre: 'Evolución de casos',
    descripcion: 'Nuevos casos semanales x 1.000 trabajadores',
    sufijo: 'casos x 1.000 trabajadores',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '0 casos' },
      { color: coloresIndicadores.amarillo, nombre: 'menos de 1 caso' },
      { color: coloresIndicadores.rojo, nombre: '1 o más casos' }
    ]
  },
  {
    nombre: 'Positividad',
    descripcion: 'Expresada x 1.000 tests.',
    sufijo: 'x 1.000 tests realizados',
    niveles: [
      { color: coloresIndicadores.verde, nombre: 'Menor a 3' },
      { color: coloresIndicadores.amarillo, nombre: '[3 - 6)' },
      { color: coloresIndicadores.rojo, nombre: '6 o más' }
    ]
  },
  {
    nombre: 'Notificación y seguimiento oportuno de casos',
    descripcion: '',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '' },
      { color: coloresIndicadores.amarillo, nombre: '' },
      { color: coloresIndicadores.rojo, nombre: '' }
    ]
  },
  {
    nombre: 'Investigación y trazabilidad de contactos',
    descripcion: 'N° de contactos por caso, seguimiento oportuno',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '' },
      { color: coloresIndicadores.amarillo, nombre: '' },
      { color: coloresIndicadores.rojo, nombre: '' }
    ]
  },
  {
    nombre: 'Desempeño trazabilidad',
    descripcion: 'Casos nuevos provenientes de contactos',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '' },
      { color: coloresIndicadores.amarillo, nombre: '' },
      { color: coloresIndicadores.rojo, nombre: '' }
    ]
  },
  // SO
  {
    nombre: 'Búsqueda preventiva de casos',
    descripcion: 'Cálculo: % casos fuera de faena / casos totales',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '' },
      { color: coloresIndicadores.amarillo, nombre: '' },
      { color: coloresIndicadores.rojo, nombre: '' }
    ]
  },
  {
    nombre: 'Desempeño testeo (casos asintomáticos / total)',
    descripcion: 'Tests / mil trabajadores',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '' },
      { color: coloresIndicadores.amarillo, nombre: '' },
      { color: coloresIndicadores.rojo, nombre: '' }
    ]
  },
  {
    nombre: 'Brotes generados',
    descripcion: '',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: 'Sin brotes' },
      { color: coloresIndicadores.amarillo, nombre: '1 brote contenido' },
      { color: coloresIndicadores.rojo, nombre: '2 o más brotes' }
    ]
  },
  {
    nombre: 'Contactos notificados a tiempo',
    descripcion: '',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '' },
      { color: coloresIndicadores.amarillo, nombre: '' },
      { color: coloresIndicadores.rojo, nombre: '' }
    ]
  },
  {
    nombre: 'Desempeño trazabilidad interna',
    descripcion: '% casos identificados 24hrs / N° contactos totales finales',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '' },
      { color: coloresIndicadores.amarillo, nombre: '' },
      { color: coloresIndicadores.rojo, nombre: '' }
    ]
  },
]

const obtenerPropiedadValor = indicador => {
  switch (indicador.nombre) {
    case 'Evolución de casos':
      return 'incidenciaSemanal'
    case 'Positividad':
      return 'tasaPositividad1000'
    default:
      return 'incidenciaSemanal'
  }
}

export const obtenerPropiedadSemaforo = indicador => {
  switch (indicador.nombre) {
    case 'Evolución de casos':
      return 'SE_incidencia'
    case 'Positividad':
      return 'SE_positividad'
    case 'Notificación y seguimiento oportuno de casos':
      return 'SE_notificacionOportunidad'
    case 'Investigación y trazabilidad de contactos':
      return 'SE_trazabilidadOportuna'
    case 'Desempeño trazabilidad':
      return 'SE_trazabilidadDesempeno'
    case 'Búsqueda preventiva de casos':
      return 'SO_busqueda'
    case 'Desempeño testeo (casos asintomáticos / total)':
      return 'SO_testeo'
    case 'Brotes generados':
      return 'SO_brotes'
    case 'Contactos notificados a tiempo':
      return 'SO_notificacionOportuna'
    case 'Desempeño trazabilidad interna':
      return 'SO_trazabilidadOportuna'
    default:
      return 'SE_incidencia'
  }
}

export const obtenerValorIndicador = (codigoDivision, indicador, retroceso) => {
  const propiedad = obtenerPropiedadValor(indicador)
  const datos = store.getState().datos.datos
  const valor = datos.series.find(s => s.codigoDivision === codigoDivision)[propiedad].slice(-1 + retroceso)[0]
  return valor ?? -1
}

export const obtenerSemaforoIndicador = (codigoDivision, indicador, retroceso) => {
  const propiedad = obtenerPropiedadSemaforo(indicador)
  const datos = store.getState().datos.datos
  const valor = datos.series.find(s => s.codigoDivision === codigoDivision)[propiedad].slice(-1 + retroceso)[0]
  return valor ?? -1
}