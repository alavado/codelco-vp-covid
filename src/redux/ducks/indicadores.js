import { primeraSemana, ultimaSemana } from "../../config/semanas"

const retrocederSemanas = 'indicadores/retrocederSemanas'

const defaultState = {
  retroceso: 0
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case retrocederSemanas: {
      const retroceso = action.payload
      if (retroceso < (primeraSemana - ultimaSemana) || retroceso > 0) {
        return state
      }
      return {
        ...state,
        retroceso: action.payload
      }
    }
    default:
      return state
  }
}

export const retrocedeSemanas = retroceso => ({
  type: retrocederSemanas,
  payload: retroceso
})