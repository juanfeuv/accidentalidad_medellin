import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from "react";

import Filters from './Filters';
import GeoMap from '../../../components/GeoMap/GeoMap';
import getBarrios from './getBarrios';
import Loading from '../../../components/Loading';
import GruposInfo from './GruposInfo';


function classifySingleValue(singleValue, values) {
  // Step 1: Determine dynamic range boundaries
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // You can adjust these thresholds based on your specific criteria
  const lowThreshold = minValue + (maxValue - minValue) / 3;
  const highThreshold = maxValue - (maxValue - minValue) / 3;

  // Step 2: Classify the single value
  if (singleValue <= lowThreshold) {
      return "#17D401"; // Low
  } else if (lowThreshold < singleValue && singleValue <= highThreshold) {
      return "#FC9738"; // Middle
  } else {
      return "#FF342D"; // High
  }
}


const Barrios = ({ open, setOpen, grupos, setGrupos }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = (query) => {
    setIsLoading(true);

    const res = getBarrios(query);

    setList(res);
    setIsLoading(false);
  };

  const newList = useMemo(() => {
    return list.map((item, index) => {
      return {
        ...item,
        properties: {
          ...item.properties,
          index,
        },
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
      <GeoMap data={newList} name="Barrios" styles={stylesGeoMap}/>
      <Filters
        open={open}
        setOpen={setOpen}
        getRawAccidents={getData}
      />
      <Loading open={isLoading} />
      <GruposInfo open={grupos} setOpen={setGrupos} />
    </div>
  );
}

Barrios.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};


export default Barrios;
