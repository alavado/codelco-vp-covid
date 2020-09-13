const login = 'login/login'
const fijarError = 'login/fijarError'

const defaultState = {
  usuario: false,
  error: null
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case login: {
      return {
        ...state,
        usuario: true
      }
    }
    case fijarError: {
      return {
        ...state,
        error: 'Contraseña incorrecta'
      }
    }
    default: {
      return state
    }
  }
}

export const iniciaSesion = password => {
  if (password !== 'codelco') {
    return {
      type: fijarError,
      payload: 'Contraseña incorrecta'
    }
  }
  return {
    type: login
  }
}
