import React from 'react'
import './Panel.css'

const indicadores = [
  {
    nombre: 'Evolución de casos'
  },
  {
    nombre: 'Testeo/positividad/Desempeño testeo (casos asintomáticos)'
  },
  {
    nombre: 'Notificación y seguimiento oportuno casos'
  },
  {
    nombre: 'Investigación y trazabilidad de contactos (N° contactos/caso; seguimiento oportuno)'
  },
  {
    nombre: 'Desempeño trazabilidad (casos nuevos Provenientes de contactos)'
  }
]

const Panel = () => {
  return (
    <div className="Panel">
      {indicadores.map(({ nombre }) => (
        <div className="Panel__contenedor_indicador">
          <div className="Panel__nombre_indicador">
            {nombre}
          </div>
          <div className="Panel__indicador_global">
          </div>
          <div className="Panel__indicadores_divisiones">
          </div>
        </div>
      ))}
    </div>
  )
}

export default Panel
