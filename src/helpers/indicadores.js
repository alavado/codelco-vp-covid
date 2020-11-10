import store from '../redux/store'

export const coloresIndicadores = {
  verde: '#1dd600',
  amarillo: '#ffc001',
  naranja: '#ff7b24',
  rojo: '#ff0900',
  celeste: 'lightblue',
  gris: 'lightgray'
}

export const indicadores = [
  // SE
  {
    nombre: 'Evolución de casos',
    texto: 'Casos nuevos',
    descripcion: 'Total casos nuevos x 1000 / dotación',
    sufijo: 'casos x 1.000 trabajadores',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '0' },
      { color: coloresIndicadores.amarillo, nombre: '< 1' },
      { color: coloresIndicadores.rojo, nombre: '> 1' }
    ]
  },
  {
    nombre: 'Positividad',
    texto: 'Tests positivos (test rápido o búsqueda activa)',
    descripcion: 'Total test positivos x 100 / total de tests',
    sufijo: 'x 1.00 tests realizados',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '< 1' },
      { color: coloresIndicadores.amarillo, nombre: '1 a 3' },
      { color: coloresIndicadores.rojo, nombre: '> 3' }
    ]
  },
  {
    nombre: 'Inicio de seguimiento',
    texto: 'Días desde la confirmación al inicio del seguimiento',
    descripcion: 'Número de casos a los que se les inicia el seguimiento dentro de los dos dias desde la confirmacion / casos nuevos',
    sufijo: 'casos',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ]
  },
  {
    nombre: 'Desempeño de seguimiento',
    texto: 'Caso, todos los días, Contacto 2 veces en el período',
    descripcion: 'Numero de casos con contacto diario desde el inicio de seguimiento + número de contactos con contacto al menos dos veces desde inicio de seguimiento / (Total de casos + total de contactos)',
    sufijo: 'casos',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ]
  },
  {
    nombre: 'Oportunidad de Notificacion',
    texto: 'Dias DESDE inicio de síntomas a clasificación del caso',
    descripcion: 'Número de casos clasificados como confirmado (PCR+) o probable (o Ag+ si se usa como confirmatorio), dentro de 3 días del inicio de síntomas / casos nuevos',
    sufijo: 'casos',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ]
  },
  {
    nombre: 'Detección de contactos',
    texto: 'Numero de contactos de un caso índice',
    descripcion: 'Número de casos con 3 o más contactos / casos nuevos',
    sufijo: 'casos',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ]
  },
  {
    nombre: 'Trazabilidad oportuna',
    texto: 'Dias DESDE inicio de síntomas o PCR + HASTA fin de investigación de contactos',
    descripcion: 'Número de contactos (laborales + familiares) contactados durante los 3 primeros días desde la confirmación del caso / Contactos totales (familiares + laborales)',
    sufijo: 'casos',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ]
  },
  {
    nombre: 'Desempeño de trazabilidad',
    texto: 'Casos nuevos provenientes de contactos',
    descripcion: 'Numero de casos nuevos provenientes de contactos (familiares + laborales) / casos nuevos',
    sufijo: 'casos',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 60%' },
      { color: coloresIndicadores.amarillo, nombre: '30% a 60%' },
      { color: coloresIndicadores.rojo, nombre: '< 30%' },
      { color: coloresIndicadores.celeste, nombre: 'No calculado, menos de 8 casos' }
    ]
  },
  // SO
  {
    nombre: 'Búsqueda preventiva',
    texto: 'Casos detectados fuera de faena',
    descripcion: 'Casos fuera de faena / casos nuevos',
    sufijo: 'casos',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 30%' },
      { color: coloresIndicadores.amarillo, nombre: '10% a 30%' },
      { color: coloresIndicadores.rojo, nombre: 'menor a 10%' },
      { color: coloresIndicadores.celeste, nombre: 'No calculado, menos de 8 casos' }
    ]
  },
  {
    nombre: 'Testeo sistemático',
    texto: 'Numero de test por trabajador',
    descripcion: 'Numero de test por trabajador / Dotación activa (en faena)',
    sufijo: 'tests',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '>= 1' },
      { color: coloresIndicadores.rojo, nombre: '< 1' }
    ]
  },
  {
    nombre: 'Detección casos asintomáticos',
    texto: 'Proporción de casos asintomáticos',
    descripcion: 'Numero de casos asintomáticos / Casos nuevos',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' },
      { color: coloresIndicadores.celeste, nombre: 'No calculado, menos de 8 casos' }
    ]
  },
  {
    nombre: 'Brotes generadores',
    texto: 'Número y tipo de brotes (contenidos o no)',
    descripcion: 'Número y tipo de brotes (contenidos o no)',
    sufijo: 'brotes',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '0' },
      { color: coloresIndicadores.amarillo, nombre: '1 contenido' },
      { color: coloresIndicadores.rojo, nombre: '2 contenidos o 1 brote' }
    ]
  },
  {
    nombre: 'Notificación oportuna de contactos',
    texto: 'Contactos notificados antes de 24 horas',
    descripcion: 'Número de contactos laborales notificados antes de 24 horas / Total de contactos',
    sufijo: 'contactos',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ]
  },
  {
    nombre: 'Trazabilidad oportuna interna',
    texto: 'Dias DESDE inicio de síntomas o PCR + HASTA fin de investigación de contactos',
    descripcion: 'Número de contactos (laborales)  contactados durante los 3 primeros días desde la confirmación del caso / Contactos finales (laborales)',
    sufijo: 'contactos',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
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
    case 'Inicio de seguimiento':
      return 'SE_seguimientoInicio'
    case 'Desempeño de seguimiento':
      return 'SE_seguimientoDesempeno'
    case 'Oportunidad de Notificacion':
      return 'SE_notificacionOportunidad'
    case 'Detección de contactos':
      return 'SE_contactosDeteccion'
    case 'Trazabilidad oportuna':
      return 'SE_trazabilidadOportuna'
    case 'Desempeño de trazabilidad':
      return 'SE_trazabilidadDesempeno'
    case 'Búsqueda preventiva':
      return 'SO_busqueda'
    case 'Testeo sistemático':
      return 'SO_testeo'
    case 'Detección casos asintomáticos':
      return 'SO_asintomaticos'
    case 'Brotes generadores':
      return 'SO_brotes'
    case 'Notificación oportuna de contactos':
      return 'SO_notificacionOportuna'
    case 'Trazabilidad oportuna interna':
      return 'SO_trazabilidadOportuna'
    default:
      return 'SE_incidencia'
  }
}

export const obtenerValorIndicador = (codigoDivision, indicador, retroceso) => {
  const propiedad = obtenerPropiedadValor(indicador)
  const datos = store.getState().datos.datos
  const valor = datos.series.find(s => s.codigoDivision === codigoDivision)[propiedad].slice(-1 + retroceso)[0]
  return isNaN(valor) ? (valor.trim() === 'NA' ? -1 : -2) : Number(valor)
}

export const obtenerSemaforoIndicador = (codigoDivision, indicador, retroceso) => {
  const propiedad = obtenerPropiedadSemaforo(indicador)
  const datos = store.getState().datos.datos
  const valor = datos.series.find(s => s.codigoDivision === codigoDivision)[propiedad].slice(-1 + retroceso)[0]
  return isNaN(valor) ? (valor.trim() === 'NA' ? -1 : -2) : Number(valor)
}