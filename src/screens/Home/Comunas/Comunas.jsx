import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";

import Filters from './Filters';
import GeoMap from '../../../components/GeoMap/GeoMap';
import getComunas from './getComunas';
import Loading from '../../../components/Loading';

const Comunas = ({ open, setOpen }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (query) => {
    setIsLoading(true);

    const res = await getComunas(query);

    setList(res);
    setIsLoading(false);

    return res;
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <GeoMap data={list} />
      <Filters
        open={open}
        setOpen={setOpen}
        getRawAccidents={getData}
      />
      <Loading open={isLoading} />
    </div>
  );
}

Comunas.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Comunas;
