import React, { useState, useEffect, useRef } from 'react'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { iniciaSesion } from '../../redux/ducks/login'

const Login = () => {

  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.login)
  const inputRef = useRef()

  useEffect(() => inputRef.current.focus(), [])

  const login = e => {
    e.preventDefault()
    setTimeout(() => dispatch(iniciaSesion(password)), 200 + Math.random() * 800)
  }

  return (
    <div className="Login">
      <h1 className="Login__titulo">Ingreso a Dashboard CODELCO-COVID</h1>
      <form className="Login__formulario" onSubmit={login}>
        <label className="Login__label">Contraseña</label>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          className="Login__input"
          ref={inputRef}
        />
        <button
          type="submit"
          className="Login__boton"
        >
          Ingresar
        </button>
        <p className="Login__error">{error}</p>
      </form>
      {window.location.href.indexOf('dev') > 0 &&
        <div className="Login__mensaje">
          <p>¡Estás visitando la versión de desarrollo!</p>
          <p>Por favor dirígete a: <a className="Login__link" href="https://codelco-covid.netlify.app/">Dashboard CODELCO-COVID 19</a></p>
        </div>
      }
    </div>
  )
}

export default Login
