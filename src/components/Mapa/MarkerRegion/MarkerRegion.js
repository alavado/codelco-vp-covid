import React from 'react'
import { Marker } from 'react-map-gl'
import './MarkerRegion.css'
import { useSelector } from 'react-redux'
import { colorTrabajadoresContratistas, colorTrabajadoresPropios } from '../../../helpers/colores'

const MarkerRegion = ({ latitude, longitude }) => {

  const { titulo, casosContratistas, casosPropios, visible } = useSelector(state => state.marcador)

  if (!visible || casosPropios === 0) {
    return null
  }

  const total = casosContratistas + casosPropios

  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      captureDrag={false}
    >
      <div className="MarkerRegion">
        <div className="MarkerRegion__nombre_region">
          {titulo}
        </div>
        <div className="MarkerRegion__total_casos">
          {total.toLocaleString('de-DE')} casos
        </div>
        <div className="MarkerRegion__contenedor_casos">
          <div className="MarkerRegion__casos" style={{ backgroundColor: colorTrabajadoresPropios }}>
            <div className="MarkerRegion__numero_casos">
              {casosPropios.toLocaleString('de-DE')}
            </div>
            <div className="MarkerRegion__etiqueta_casos">
              propios
            </div>
          </div>
          <div className="MarkerRegion__casos" style={{ backgroundColor: colorTrabajadoresContratistas }}>
            <div className="MarkerRegion__numero_casos">
              {casosContratistas.toLocaleString('de-DE')}
            </div>
            <div className="MarkerRegion__etiqueta_casos">
              externos
            </div>
          </div>
        </div>
      </div>
    </Marker>
  )
}

export default MarkerRegion
