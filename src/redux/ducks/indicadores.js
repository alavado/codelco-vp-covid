const retrocederSemanas = 'indicadores/retrocederSemanas'

const defaultState = {
  retroceso: 0
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case retrocederSemanas: {
      console.log(action.payload)
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