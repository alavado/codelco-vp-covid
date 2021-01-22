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
    descripcion: '[casos confirmados + casos probables] / [dotación]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '0' },
      { color: coloresIndicadores.amarillo, nombre: '< 1' },
      { color: coloresIndicadores.rojo, nombre: '> 1' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SE_incidencia',
    leyenda: 'X caso(s) por 1000 trabajadore(s)'
  },
  {
    nombre: 'Positividad',
    texto: 'Tests positivos (test rápido o búsqueda activa)',
    descripcion: '% de test positivos (antígeno, anticuerpo o PCR de búsqueda activa)',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '< 1' },
      { color: coloresIndicadores.amarillo, nombre: '1 a 3' },
      { color: coloresIndicadores.rojo, nombre: '> 3' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SE_positividad',
    leyenda: 'X% de tests positivos',
  },
  {
    nombre: 'Inicio de seguimiento oportuno',
    texto: 'Días desde la confirmación al inicio del seguimiento',
    descripcion: '[casos confirmados + probables, a los que se les inicia el seguimiento dentro de los DOS dias desde la confirmacion] / [total casos confirmados + probables]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador, menos de 8 casos' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SE_seguimientoInicio',
    leyenda: 'X de Y caso(s) nuevo(s)',
  },
  {
    nombre: 'Desempeño de seguimiento de casos',
    texto: 'Caso, todos los días, Contacto 2 veces en el período',
    descripcion: '[casos confirmados + probables con contacto CADA 48 HORAS desde el inicio de seguimiento] / [total casos confirmados + probables]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador, menos de 8 casos' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SE_seguimientoDesempeno',
    leyenda: 'X seguimiento(s) oportuno(s) de Y seguimiento(s)',
  },
  {
    nombre: 'Desempeño seguimiento de contactos',
    texto: 'Caso, todos los días, Contacto 2 veces en el período',
    descripcion: '[contactos estrechos y operacionales con al menos CUATRO seguimientos dentro de su período de cuarentena de 14 días, o su proporción correspondiente a la semana] / [total contactos estrechos y operacionales]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador, menos de 8 casos' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SE_seguimientoDesempeno_contactos',
    leyenda: 'X seguimiento(s) oportuno(s) de Y seguimiento(s)',
  },
  {
    nombre: 'Oportunidad de Notificación (Confirmación)',
    texto: 'Dias DESDE inicio de síntomas a clasificación del caso',
    descripcion: '[casos confirmados con exámen confirmatorio dentro de los TRES días del inicio de síntomas] / [casos confirmados]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador, menos de 8 casos' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SE_notificacionOportunidad',
    leyenda: 'X notificacion(es) oportuna(s) de Y caso(s) nuevo(s)',
  },
  {
    nombre: 'Detección de contactos',
    texto: 'Numero de contactos de un caso índice',
    descripcion: '[casos confirmados o probables con TRES o más contactos estrechos u operacionales] / [casos confirmados + probables]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador, menos de 8 casos' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SE_contactosDeteccion',
    leyenda: 'X caso(s) con suficientes contactos de Y caso(s) nuevo(s)',
  },
  {
    nombre: 'Trazabilidad oportuna',
    texto: 'Dias DESDE inicio de síntomas o PCR + HASTA fin de investigación de contactos',
    descripcion: '[contactos estrechos + operacionales contactados durante los TRES primeros días desde la confirmación del caso o inicio de los síntomas] / [total contactos estrechos + operacionales]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador, menos de 8 casos' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SE_trazabilidadOportu',
    leyenda: 'X% de contactos trazados oportunamente',
  },
  {
    nombre: 'Desempeño de trazabilidad',
    texto: 'Casos nuevos provenientes de contactos',
    descripcion: '[casos confirmados + probables provenientes de contactos operacionales o estrechos que se encontraban en seguimiento] / [casos confirmados + probables]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 60%' },
      { color: coloresIndicadores.amarillo, nombre: '30% a 60%' },
      { color: coloresIndicadores.rojo, nombre: '< 30%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador, menos de 8 casos' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SE_trazabilidadDesempeno',
    leyenda: 'X caso(s) proveniente(s) de contactos de Y caso(s) nuevo(s)',
  },
  // SO
  {
    nombre: 'Búsqueda antes de faena',
    texto: 'Casos detectados antes de faena',
    descripcion: '[casos confirmados detectados por busqueda preventiva antes de ingresar a faena] / [casos confirmados]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 30%' },
      { color: coloresIndicadores.amarillo, nombre: '10% a 30%' },
      { color: coloresIndicadores.rojo, nombre: 'menor a 10%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador, menos de 8 casos' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SO_busqueda',
    leyenda: 'X% de los casos totales detectados antes de faena',
  },
  {
    nombre: 'Detección preventiva',
    texto: 'Casos detectados antes de ingresar a faena (todos los medios utilizados)',
    descripcion: '[casos confirmados  + probables detectados antes de ingresar a faena por cualquier método usado] / [casos confirmados + probables]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 40%' },
      { color: coloresIndicadores.amarillo, nombre: '20% a 40%' },
      { color: coloresIndicadores.rojo, nombre: '< 20%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador, menos de 8 casos' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SO_preventiva',
    leyenda: 'X caso(s) detectado(s) antes de entrar a faena de Y caso(s) total(es)',
  },
  {
    nombre: 'Detección casos asintomáticos',
    texto: 'Proporción de casos asintomáticos',
    descripcion: '[casos confirmados asintomáticos al momento de su detección o confirmación] / [casos confirmados + probables] (%)',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 40%' },
      { color: coloresIndicadores.amarillo, nombre: '25% a 40%' },
      { color: coloresIndicadores.rojo, nombre: '< 25%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador, menos de 8 casos' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SO_asintomaticos',
    leyenda: 'X% de casos asintomáticos',
  },
  {
    nombre: 'Identificación de Brotes alerta amarilla',
    texto: 'Identificación de Brotes (Alerta Amarilla)',
    descripcion: 'N° de brotes con alerta AMARILLA en el periodo',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '0' },
      { color: coloresIndicadores.amarillo, nombre: '1' },
      { color: coloresIndicadores.rojo, nombre: '>= 2 alertas amarillas' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SO_brotes_amarillos',
    leyenda: 'X brote(s) amarillo(s)',
  },
  {
    nombre: 'Identificación de Brotes alerta roja',
    texto: 'Identificación de Brotes (Alerta Roja)',
    descripcion: 'N° de brotes con alerta ROJA en el periodo',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '0 alertas rojas' },
      { color: coloresIndicadores.rojo, nombre: '>= 1 alertas rojas' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SO_brotes_rojos',
    leyenda: 'X brote(s) rojo(s)',
  },
  {
    nombre: 'Contactos notificados a tiempo',
    texto: 'Contactos notificados antes de 24 horas',
    descripcion: '[contactos operacionales notificados dentro de primeras 24 horas] / [total contactos operacionales]',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
    ],
    propiedadSemaforo: 'SO_notificacionOportu',
    leyenda: 'X contacto(s) laboral(es) notificado(s) oportunamente de Y contacto(s) laboral(es) total(es)',
  },
  {
    nombre: 'Efectividad de trazabilidad en Brotes',
    texto: 'Porcentaje de casos identificados en la trazabilidad inicial v/s la final',
    descripcion: '% casos identificados en la trazabilidad inicial v/s la final',
    sufijo: '',
    niveles: [
      { color: coloresIndicadores.verde, nombre: '> 80%' },
      { color: coloresIndicadores.amarillo, nombre: '60% a 80%' },
      { color: coloresIndicadores.rojo, nombre: '< 60%' },
      { color: coloresIndicadores.celeste, nombre: 'No se calculó indicador' },
      { color: coloresIndicadores.gris, nombre: 'No hay datos' }
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

  } catch(e) { console.log(e) }
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