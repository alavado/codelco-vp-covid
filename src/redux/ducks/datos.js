import { procesarCSV } from "../../helpers/procesamiento"

const guardarDatos = 'datos/guardar'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case guardarDatos: {
      return {
        ...state,
        datos: action.payload
      }
    }
    default: return state
  }
}

export const guardaDatos = csv => ({
  type: guardarDatos,
  payload: procesarCSV(csv)
})