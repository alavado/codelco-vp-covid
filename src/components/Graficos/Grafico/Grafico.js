import React, { useMemo, useState } from 'react'
import './Grafico.css'
import { Bar } from 'react-chartjs-2'
import 'moment/locale/es'
import classNames from 'classnames'
import { colorTrabajadoresContratistas, colorTrabajadoresPropios } from '../../../helpers/colores'
import TotalCasos from '../../Mapa/VisionGeneral/TotalCasos/TotalCasos'
import semanasEpidemiologicas from '../../../data/minsal/semanas.json'
import { useSelector } from 'react-redux'

const Grafico = ({ division }) => {

  const [acumulados, setAcumulados] = useState(false)
  const { datos } = useSelector(state => state.datos)

  const [semanas, series, total] = useMemo(() => {
    const datosDivision = datos.series.find(d => d.codigoDivision === division.codigo)
    return [
      datos.semanas,
      {
        propios: acumulados ? datosDivision.propiosAcum : datosDivision.nuevosPropios,
        externos: acumulados ? datosDivision.externosAcum : datosDivision.nuevosExternos
      },
      datosDivision.propiosAcum.slice(-1)[0] + datosDivision.externosAcum.slice(-1)[0]
    ]
  }, [acumulados, division, datos])

  return (
    <div className="Grafico">
      <div className="Grafico__superior">
        <div>
          <h2 className="Grafico__titulo">{division.nombre}</h2>
          <h3 className="Grafico__subtitulo">Semana {semanas[0]} a la {semanas.slice(-1)[0]}</h3>
        </div>
        <div>
          <button
            className={classNames({
              'Grafico__selector_acumulados': true,
              'Grafico__selector_acumulados--izquierda': true,
              'Grafico__selector_acumulados--activo': !acumulados
            })}
            onClick={() => setAcumulados(false)}
          >
            Nuevos casos
          </button>
          <button
            className={classNames({
              'Grafico__selector_acumulados': true,
              'Grafico__selector_acumulados--derecha': true,
              'Grafico__selector_acumulados--activo': acumulados
            })}
            onClick={() => setAcumulados(true)}
          >
            Acumulados
          </button>
        </div>
      </div>
      <div className="Grafico__contenedor_grafico">
        <div className="Grafico__descripcion">
          <p className="Grafico__total_acumulado">{total.toLocaleString('de-DE')}</p>
          <p>Casos confirmados</p>
          <TotalCasos codigo={division.codigo} />
        </div>
        <div className="Grafico__grafico">
          <Bar
            data={{
              labels: semanas.slice(-53),
              datasets: [
                {
                  data: series.propios.slice(-53),
                  backgroundColor: colorTrabajadoresPropios,
                  label: `Casos propios`
                },
                {
                  data: series.externos.slice(-53),
                  backgroundColor: colorTrabajadoresContratistas,
                  label: `Casos externos`
                }
              ]
            }}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: true,
                position: 'bottom',
                align: 'end'
              },
              tooltips: {
                callbacks: {
                  title: items => `Semana ${semanasEpidemiologicas[items[0].xLabel].semanaEnAño}`,
                  afterTitle: items => semanasEpidemiologicas[items[0].xLabel].texto
                }
              },
              scales: {
                xAxes: [{
                  ticks: {
                    maxRotation: 0,
                    autoSkip: false,
                    callback: v => `${semanasEpidemiologicas[+v].semanaEnAño}`,
                  },
                  gridLines: {
                    display: false
                  }
                }],
                yAxes: [{
                  gridLines: {
                    display: false
                  },
                  position: 'right',
                  ticks: {
                    suggestedMax: 10,
                    callback: v => v.toLocaleString('de-DE')
                  }
                }]
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Grafico
