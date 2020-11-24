import { procesarCSV } from "../../helpers/procesamiento"

const guardarDatos = 'datos/guardar'

const defaultState = {
  primeraSemana: 1
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case guardarDatos: {
      return {
        ...state,
        datos: action.payload,
        ultimaSemana: action.payload.semanas.length + state.primeraSemana - 1
      }
    }
    default: return state
  }
}

export const guardaDatos = csv => ({
  type: guardarDatos,
  payload: procesarCSV(csv)
})