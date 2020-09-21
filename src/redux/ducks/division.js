const fijar = 'division/fijar'

const defaultState = {
  codigo: 'Codelco'
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case fijar: {
      return {
        ...state,
        codigo: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const muestraDivision = codigo => ({
  type: fijar,
  payload: codigo
})
