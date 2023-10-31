import _ from 'lodash';

import DATA_TRATADA from '../../../Assets/dataTratada.json';
import Barrios from '../../../Assets/barrios.json';

const grouped = _.groupBy(DATA_TRATADA, item => item.code);

const mapearBarrios = (featureCollection) => {
  const { features = [] } = featureCollection;

  return features.map((f) => {
    return {
      name: f.properties.NOMBRE,
      type: "Feature",
      code: f.properties.CODIGO,
      properties: {
        name: f.properties.NOMBRE,
      },
      geometry: f.geometry,
    };
  });
}

const getBarrios = (query = {}) => {
  const data = mapearBarrios(Barrios);

  if (_.isEmpty(query)) {
    return [];
  }

  const { fechaInicial, fechaFinal, clase, gravedad } = query;

  return data.map(item => {
    const { properties } = item;

    const accd = (grouped[Number(item.code) || item.code] || [])
      .filter(acc => acc.clase === _.lowerCase(clase?.value)
        && acc.day >= fechaInicial
        && acc.day <= fechaFinal
        && acc.gravedad_accidente === gravedad?.value);
        
    const cantidad = accd.length || 0;

    return {
      ...item,
      properties: {
        ...properties,
        percentile: cantidad,
        value: cantidad,
      }
    };
  });
}

export default getBarrios;