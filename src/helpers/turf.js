import area from '@turf/area'
import polygon from 'turf-polygon'
import polylabel from 'polylabel'

export const calcularPoloDeInaccesibilidad = feature => {
  let poligono = feature.geometry.coordinates
  if (feature.geometry.type === 'MultiPolygon') {
    poligono = feature.geometry.coordinates
      .reduce((x, y) => area(polygon(x)) > area(polygon(y)) ? x : y)
  }
  const [longitude, latitude] = polylabel(poligono)
  return { longitude: longitude, latitude: latitude }
}