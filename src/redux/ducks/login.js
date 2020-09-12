const login = 'login/login'

const defaultState = {
  usuario: false
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case login: {
      return {
        ...state,
        usuario: true
      }
    }
    default: {
      return state
    }
  }
}

export const iniciaSesion = password => {
  if (password !== 'codelco') {
    return null
  }
  return {
    type: login
  }
}
