import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from "react";

import { updatePercentiles } from './predict';

import Filters from './Filters';
import GeoMap from '../../../components/GeoMap/GeoMap';
import getComunas from './getComunas';
import Loading from '../../../components/Loading';
import Tabla from './Tabla';

function classifySingleValue(singleValue, values) {
  // Step 1: Determine dynamic range boundaries
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // You can adjust these thresholds based on your specific criteria
  const lowThreshold = minValue + (maxValue - minValue) / 3;
  const highThreshold = maxValue - (maxValue - minValue) / 3;

  // Step 2: Classify the single value
  if (singleValue <= lowThreshold) {
      return "#17D401";
  } else if (lowThreshold < singleValue && singleValue <= highThreshold) {
      return "#FC9738";
  } else {
      return "#FF342D";
  }
}


const Comunas = ({ open, setOpen, tabla, setTabla }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accidentesPorDia, setAccidentesPorDia] = useState([]);

  const getData = async (query) => {
    setIsLoading(true);

    const res = await getComunas(query);

    setList(res.prediction || []);
    setIsLoading(false);

    return res;
  };

  const newList = useMemo(() => {
    const rawComunas = updatePercentiles();

    return list.map((item, index) => {
      const geometry = rawComunas.find(x => x?.name === item?.name);
      return {
        ...item,
        properties: {
          ...item.properties,
          index,
        },
        geometry: geometry?.geometry || {}
      };
    });
  }, [list]);

  // Define the 'fill-color' stops based on the calculated percentiles
  const fillColorStops = newList.map((feature, index) => [
    index,
    classifySingleValue(feature.properties.value, newList.map(x => x.properties.value)),
  ]);

  const stylesGeoMap = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': {
        property: 'index', // Use 'index' as a property to refer to the dynamic color stops
        stops: fillColorStops,
      },
      'fill-opacity': 0.7,
      'fill-outline-color': '#f0bba1',
    },
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <GeoMap data={newList} name="Comunas" styles={stylesGeoMap} />
      <Filters
        open={open}
        setOpen={setOpen}
        getRawAccidents={getData}
        setAccidentesPorDia={setAccidentesPorDia}
        setTabla={setTabla}
      />
      <Loading open={isLoading} />
      <Tabla
        data={accidentesPorDia}
        handleClose={() => setTabla(false)}
        open={tabla}
      />
    </div>
  );
}

Comunas.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  tabla: PropTypes.bool.isRequired,
  setTabla: PropTypes.func.isRequired,
};

export default Comunas;
