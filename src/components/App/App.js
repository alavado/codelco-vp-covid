import React from 'react'
import './App.css'
import Mapa from '../Mapa'
import { NavLink, Switch, Route } from 'react-router-dom'
import Graficos from '../Graficos'
import Panel from '../Panel'
import { useSelector } from 'react-redux'
import Login from '../Login'
import logo from '../../assets/Codelco_logo.svg'
import { InlineIcon } from '@iconify/react'
import chartScatterPlotHexbin from  '@iconify/icons-mdi/chart-scatter-plot-hexbin'
import chartBox from  '@iconify/icons-mdi/chart-bar'
import mapLegend from '@iconify/icons-mdi/map-legend'

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
            to="/"
            exact
          >
            <InlineIcon className="App__icono" icon={chartScatterPlotHexbin} /> Panel de indicadores 
          </NavLink>
          <NavLink
            className="App__link_navegacion"
            activeClassName="App__link_navegacion--activo"
            to="/graficos"
          >
            <InlineIcon className="App__icono" icon={chartBox} /> Gráficos 
          </NavLink>
          <NavLink
            className="App__link_navegacion"
            activeClassName="App__link_navegacion--activo"
            exact
            to="/mapa"
          >
            <InlineIcon className="App__icono" icon={mapLegend} /> Mapa 
          </NavLink>
        </nav>
      </div>
      <div className="App__contenedor">
        <Switch>
          <Route exact path="/" component={Panel} />
          <Route path="/graficos/:codigo" component={Graficos} />
          <Route path="/graficos" component={Graficos} />
          <Route path="/mapa" component={Mapa} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
