const retrocederSemanas = 'indicadores/retrocederSemanas'

const defaultState = {
  retroceso: 0
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case retrocederSemanas: {
      const { retroceso, maximo } = action.payload
      if (retroceso < -maximo || retroceso > 0) {
        return state
      }
      return {
        ...state,
        retroceso
      }
    }
    default:
      return state
  }
}

export const retrocedeSemanas = (retroceso, maximo) => ({
  type: retrocederSemanas,
  payload: {
    retroceso,
    maximo
  }
})