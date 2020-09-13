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
        <h1 className="App__codelco">Dashboard CODELCO-COVID</h1>
        <nav className="App__navegacion">
          <NavLink
            className="App__link_navegacion"
            activeClassName="App__link_navegacion--activo"
            to="/mapa"
          >
            Mapa
          </NavLink>
          <NavLink
            className="App__link_navegacion"
            activeClassName="App__link_navegacion--activo"
            to="/graficos"
          >
            Gráficos
          </NavLink>
          <NavLink
            className="App__link_navegacion"
            activeClassName="App__link_navegacion--activo"
            to="/tabla"
          >
            Tabla de datos
          </NavLink>
        </nav>
      </div>
      <div className="App__contenedor">
        <Switch>
          <Route exact path="/" component={Mapa} />
          <Route path="/mapa" component={Mapa} />
          <Route path="/graficos" component={Graficos} />
          <Route path="/tabla" component={Tabla} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
