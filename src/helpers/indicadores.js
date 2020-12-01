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
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '0' },
      { color: coloresIndicadores.amarillo, nombre: '< 1' },
      { color: coloresIndicadores.rojo, nombre: '> 1' }
    ],
    propiedadSemaforo: 'SE_incidencia',
    leyenda: 'X casos por 1000 trabajadores'
  },
  {
    nombre: 'Positividad',
    texto: 'Tests positivos (test rápido o búsqueda activa)',
    descripcion: 'Total test positivos x 100 / total de tests',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '< 1' },
      { color: coloresIndicadores.amarillo, nombre: '1 a 3' },
      { color: coloresIndicadores.rojo, nombre: '> 3' }
    ],
    propiedadSemaforo: 'SE_positividad',
    leyenda: 'X% de tests positivos',
  },
  {
    nombre: 'Inicio de seguimiento',
    texto: 'Días desde la confirmación al inicio del seguimiento',
    descripcion: 'Número de casos a los que se les inicia el seguimiento dentro de los dos dias desde la confirmacion / casos nuevos',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ],
    propiedadSemaforo: 'SE_seguimientoInicio',
    leyenda: 'X de Y casos nuevos',
  },
  {
    nombre: 'Desempeño de seguimiento de casos',
    texto: 'Caso, todos los días, Contacto 2 veces en el período',
    descripcion: '(Numero de casos con contacto diario desde el inicio de seguimiento + número de contactos con contacto al menos dos veces desde inicio de seguimiento) / (Total de casos + total de contactos)',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ],
    propiedadSemaforo: 'SE_seguimientoDesempeno',
    leyenda: 'X seguimientos oportunos de Y seguimientos',
  },
  {
    nombre: 'Desempeño seguimiento de contactos',
    texto: 'Caso, todos los días, Contacto 2 veces en el período',
    descripcion: '(Numero de casos con contacto diario desde el inicio de seguimiento + número de contactos con contacto al menos dos veces desde inicio de seguimiento) / (Total de casos + total de contactos)',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ],
    propiedadSemaforo: 'SE_seguimientoDesempeno_contactos',
    leyenda: 'X seguimientos oportunos de Y seguimientos',
  },
  {
    nombre: 'Oportunidad de Notificacion',
    texto: 'Dias DESDE inicio de síntomas a clasificación del caso',
    descripcion: 'Número de casos clasificados como confirmado (PCR+) o probable (o Ag+ si se usa como confirmatorio), dentro de 3 días del inicio de síntomas / casos nuevos',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ],
    propiedadSemaforo: 'SE_notificacionOportunidad',
    leyenda: 'X notificaciones oportunas de Y casos nuevos',
  },
  {
    nombre: 'Detección de contactos',
    texto: 'Numero de contactos de un caso índice',
    descripcion: 'Número de casos con 3 o más contactos / casos nuevos',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ],
    propiedadSemaforo: 'SE_contactosDeteccion',
    leyenda: 'X casos con suficientes contactos de Y casos nuevos',
  },
  {
    nombre: 'Trazabilidad oportuna',
    texto: 'Dias DESDE inicio de síntomas o PCR + HASTA fin de investigación de contactos',
    descripcion: 'Número de contactos (laborales + familiares) contactados durante los 3 primeros días desde la confirmación del caso / Contactos totales (familiares + laborales)',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ],
    propiedadSemaforo: 'SE_trazabilidadOportu',
    leyenda: 'X% de contactos trazados oportunamente',
  },
  {
    nombre: 'Desempeño de trazabilidad',
    texto: 'Casos nuevos provenientes de contactos',
    descripcion: 'Numero de casos nuevos provenientes de contactos (familiares + laborales) / casos nuevos',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 60%' },
      { color: coloresIndicadores.amarillo, nombre: '30% a 60%' },
      { color: coloresIndicadores.rojo, nombre: '< 30%' },
      { color: coloresIndicadores.celeste, nombre: 'No calculado, 8 casos o menos' }
    ],
    propiedadSemaforo: 'SE_trazabilidadDesempeno',
    leyenda: 'X casos provenientes de contactos de Y casos nuevos',
  },
  // SO
  {
    nombre: 'Búsqueda antes de faena',
    texto: 'Casos detectados antes de faena',
    descripcion: 'Casos antes de faena / casos nuevos',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 30%' },
      { color: coloresIndicadores.amarillo, nombre: '10% a 30%' },
      { color: coloresIndicadores.rojo, nombre: 'menor a 10%' },
      { color: coloresIndicadores.celeste, nombre: 'No calculado, 8 casos o menos' }
    ],
    propiedadSemaforo: 'SO_busqueda',
    leyenda: 'X% de los casos totales detectados antes de faena',
  },
  {
    nombre: 'Busqueda durante faena',
    texto: 'Casos detectados durante faena',
    descripcion: 'Casos durante faena / casos nuevos',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 30%' },
      { color: coloresIndicadores.amarillo, nombre: '10% a 30%' },
      { color: coloresIndicadores.rojo, nombre: 'menor a 10%' },
      { color: coloresIndicadores.celeste, nombre: 'No calculado, 8 casos o menos' }
    ],
    propiedadSemaforo: 'SO_busqueda_durante',
    leyenda: 'X% de los casos totales detectados durante faena',
  },
  {
    nombre: 'Detección antes de faena',
    texto: 'Casos detectados antes de ingresar a faena (todos los medios utilizados)',
    descripcion: '(N° Casos confirmados Covid + detectados antes de ingresar a faena) / Número de casos confirmados Covid (+)',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 40%' },
      { color: coloresIndicadores.amarillo, nombre: '20% a 40%' },
      { color: coloresIndicadores.rojo, nombre: '< 20%' }
    ],
    propiedadSemaforo: 'SO_preventiva',
    leyenda: 'X casos detectados antes de entrar a faena de Y casos totales',
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
      { color: coloresIndicadores.celeste, nombre: 'No calculado, 8 casos o menos' }
    ],
    propiedadSemaforo: 'SO_asintomaticos',
    leyenda: 'X% casos asintomáticos',
  },
  {
    nombre: 'Identificación de Brotes alerta amarilla',
    texto: 'Identificación de Brotes (Alerta Amarilla)',
    descripcion: 'N° de Brotes con Alerta Amarilla identificados en el Periodo',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '0' },
      { color: coloresIndicadores.amarillo, nombre: '1' },
      { color: coloresIndicadores.rojo, nombre: '>= 2 Alertas Amarillas' }
    ],
    propiedadSemaforo: 'SO_brotes_amarillos',
    leyenda: 'X brotes amarillos',
  },
  {
    nombre: 'Identificación de Brotes alerta roja',
    texto: 'Identificación de Brotes (Alerta Roja)',
    descripcion: 'N° de Brotes con Alerta Roja identificados en el Periodo',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '0' },
      { color: coloresIndicadores.amarillo, nombre: '1' },
      { color: coloresIndicadores.rojo, nombre: '>= 2 Alertas Rojas' }
    ],
    propiedadSemaforo: 'SO_brotes_rojos',
    leyenda: 'X brotes rojos',
  },
  {
    nombre: 'Notificación oportuna de contactos',
    texto: 'Contactos notificados antes de 24 horas',
    descripcion: 'Número de contactos laborales notificados antes de 24 horas / Total de contactos',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ],
    propiedadSemaforo: 'SO_notificacionOportu',
    leyenda: 'X contactos laborales notificados oportunamente de Y contactos laborales totales',
  },
  {
    nombre: 'Efectividad de trazabilidad en Brotes',
    texto: 'Porcentaje de casos identificados en la trazabilidad inicial v/s la final',
    descripcion: 'N° contactos identificados en el Brote dentro de las 24 horas / N° contactos identificados en el Brote, durante y al cerrar el Brote',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' }
    ],
    propiedadSemaforo: 'SO_trazabilidadOportu',
    leyenda: 'X% de los contactos finales detectados en primeras 24 horas',
  },
]

export const obtenerValorIndicador = (codigoDivision, indicador, retroceso) => {
  const propiedad = indicador.propiedadSemaforo + '_datox'
  const datos = store.getState().datos.datos
  const valor = datos.series.find(s => s.codigoDivision === codigoDivision)[propiedad].slice(-1 + retroceso)[0]
  return isNaN(valor) ? (valor.trim() === 'NA' ? -1 : -2) : Number(valor)
}

export const obtenerSemaforoIndicador = (codigoDivision, indicador, retroceso) => {
  const propiedad = indicador.propiedadSemaforo
  const datos = store.getState().datos.datos
  let valor
  try {
    valor = datos.series.find(s => s.codigoDivision === codigoDivision)[propiedad].slice(-1 + retroceso)[0]

  }catch(e) {  }
  return isNaN(valor) ? (valor.trim() === 'NA' ? -1 : -2) : Number(valor)
}

export const obtenerTextoPopupIndicador = (codigoDivision, indicador, retroceso) => {
  const propiedad = indicador.propiedadSemaforo
  const datos = store.getState().datos.datos
  const serieDivision = datos.series.find(s => s.codigoDivision === codigoDivision)
  const valor = serieDivision[propiedad].slice(-1 + retroceso)[0]
  if (isNaN(valor)) {
    if (valor.trim() === 'NA') {
      return 'N/A'
    }
    else {
      return 'N/C'
    }
  }
  else {
    const propiedadDatoX = `${indicador.propiedadSemaforo}_datox`
    const propiedadDatoY = `${indicador.propiedadSemaforo}_datoy`
    return indicador.leyenda
      .replace('X', serieDivision[propiedadDatoX].slice(-1 + retroceso)[0].toLocaleString('de-DE'))
      .replace('Y', serieDivision[propiedadDatoY]?.slice(-1 + retroceso)[0].toLocaleString('de-DE'))
  }
}