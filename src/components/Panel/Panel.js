import React from 'react'
import divisiones from '../../data/csv/divisiones.json'
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

const hexagonosFalsos = [0, 3, 7]

const Panel = () => {
  return (
    <div className="Panel">
      <div className="Panel__encabezados">
        <div>Dimensión</div>
        <div className="Panel__encabezado_resultados">Resultados</div>
      </div>
      {indicadores.map(({ nombre }) => (
        <div className="Panel__contenedor_indicador">
          <div className="Panel__nombre_indicador">
            {nombre}
          </div>
          <div className="Panel__indicador_global">
            <div className="Panel__hexagono">
              Global
            </div>
          </div>
          <div className="Panel__indicadores_divisiones">
            <div className="Panel__indicadores_contenedor_hexagonos">
              {divisiones.filter(d => d.codigo !== 'Codelco').map((division, i) => (
                <>
                  {hexagonosFalsos.includes(i) &&
                    <div className="Panel__hexagono_pequeño Panel__hexagono_pequeño--relleno" />
                  }
                  <div className="Panel__hexagono_pequeño">
                    {division.codigoCorto}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Panel
