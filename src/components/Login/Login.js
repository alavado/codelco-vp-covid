import React, { useState } from 'react'
import './Login.css'
import { useDispatch } from 'react-redux'
import { iniciaSesion } from '../../redux/ducks/login'

const Login = () => {

  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const login = e => {
    e.preventDefault()
    setTimeout(() => dispatch(iniciaSesion(password), 200 + Math.random() * 800))
  }

  return (
    <div className="Login">
      <h1>Ingreso a Dashboard CODELCO-COVID</h1>
      <form className="Login__formulario" onSubmit={login}>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}

export default Login
