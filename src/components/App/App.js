import React from 'react'
import './App.css'
import Mapa from '../Mapa'
import { NavLink, Switch, Route } from 'react-router-dom'
import Graficos from '../Graficos'
import Tabla from '../Panel'
import { useSelector } from 'react-redux'
import Login from '../Login'
import logo from '../../assets/Codelco_logo.svg'

const App = () => {

  const { usuario } = useSelector(state => state.login)
  
  if (!usuario) {
    return <Login />
  }

  return (
    <div className="App">
      <div className="App__header">
        <h1 className="App__codelco">
          <img src={logo} alt="Logo CODELCO" className="App__logo" />
          Dashboard CODELCO COVID-19
        </h1>
        <nav className="App__navegacion">
          <NavLink
            className="App__link_navegacion"
            activeClassName="App__link_navegacion--activo"
            exact
            to="/"
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
            Panel de indicadores
          </NavLink>
        </nav>
      </div>
      <div className="App__contenedor">
        <Switch>
          <Route exact path="/" component={Mapa} />
          <Route path="/graficos" component={Graficos} />
          <Route path="/tabla" component={Tabla} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
