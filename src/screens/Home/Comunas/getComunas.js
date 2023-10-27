import _ from 'lodash';

import predict from './predict';

const getComunas = async (query = {}) => {
  if (_.isEmpty(query)) {
    return [];
  }

  const res = await predict(query);

  return res;
}

export default getComunas;