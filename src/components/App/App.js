import React from 'react'
import './App.css'
import Mapa from '../Mapa'
import { NavLink, Switch, Route } from 'react-router-dom'
import Graficos from '../Graficos'
import Tabla from '../Tabla'
import { useSelector } from 'react-redux'
import Login from '../Login'

const App = () => {

  const { usuario } = useSelector(state => state.login)

  if (!usuario) {
    return <Login />
  }

  return (
    <div className="App">
      <div className="App__header">
        <h1>CODELCO</h1>
        <nav>
          <NavLink to="/mapa">Mapa</NavLink>
          <NavLink to="/graficos">Gráficos</NavLink>
          <NavLink to="/tabla">Tabla de datos</NavLink>
        </nav>
      </div>
      <Switch>
        <Route exact path="/" component={Mapa} />
        <Route path="/mapa" component={Mapa} />
        <Route path="/graficos" component={Graficos} />
        <Route path="/tabla" component={Tabla} />
      </Switch>
    </div>
  );
}

export default App;
