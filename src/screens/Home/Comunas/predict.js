import _ from 'lodash';

import * as tf from '@tensorflow/tfjs';
import Holidays from 'date-holidays';
import moment from 'moment';

import Comunas from '../../../Assets/comunas.json';

const INITIAL_DATE = moment('2014-07-04', "YYYY-MM-DD");

const fixDayWeek = (day) => {
  const subs = day - 1;

  return subs === -1 ? 6 : subs;
};

const generateComunaArray = (comuna) => {
  const dataSet = ['NUMCOMUNA_10', 'NUMCOMUNA_11',
    'NUMCOMUNA_12', 'NUMCOMUNA_13', 'NUMCOMUNA_14', 'NUMCOMUNA_15',
    'NUMCOMUNA_16', 'NUMCOMUNA_2', 'NUMCOMUNA_3', 'NUMCOMUNA_4',
    'NUMCOMUNA_5', 'NUMCOMUNA_6', 'NUMCOMUNA_7', 'NUMCOMUNA_8',
    'NUMCOMUNA_9'];

  const index = dataSet.findIndex(item => item === `NUMCOMUNA_${comuna}`);
  const initialArray = _.fill(Array(dataSet.length), 0);

  if (index === -1) {
    return initialArray;
  }

  initialArray[index] = 1;

  return initialArray;
}

const generateAccidenteArray = (clase) => {
  const dataSet = ['CLASE_ACCIDENTE_caida ocupante', 'CLASE_ACCIDENTE_choque',
    'CLASE_ACCIDENTE_incendio', 'CLASE_ACCIDENTE_otro',
    'CLASE_ACCIDENTE_volcamiento'];

  const index = dataSet.findIndex(item => item === `CLASE_ACCIDENTE_${_.lowerCase(clase)}`);
  const initialArray = _.fill(Array(dataSet.length), 0);

  if (index === -1) {
    return initialArray;
  }

  initialArray[index] = 1;

  return initialArray;
}

const generateDayOfWeek = (day) => {
  const dataSet = ['DIA_DE_LA_SEMANA_1',
    'DIA_DE_LA_SEMANA_2', 'DIA_DE_LA_SEMANA_3', 'DIA_DE_LA_SEMANA_4',
    'DIA_DE_LA_SEMANA_5', 'DIA_DE_LA_SEMANA_6'];

  const index = dataSet.findIndex(item => item === `DIA_DE_LA_SEMANA_${day}`);
  const initialArray = _.fill(Array(dataSet.length), 0);

  if (index === -1) {
    return initialArray;
  }

  initialArray[index] = 1;

  return initialArray;
};

const generateMonth = (month) => {
  const dataSet = ['MES_10', 'MES_11',
    'MES_12', 'MES_2', 'MES_3', 'MES_4', 'MES_5', 'MES_6', 'MES_7', 'MES_8',
    'MES_9'];

  const index = dataSet.findIndex(item => item === `MES_${month}`);
  const initialArray = _.fill(Array(dataSet.length), 0);

  if (index === -1) {
    return initialArray;
  }

  initialArray[index] = 1;

  return initialArray;
};

const generateDay = (day) => {
  const dataSet = ['DIA_DEL_MES_10', 'DIA_DEL_MES_11', 'DIA_DEL_MES_12',
    'DIA_DEL_MES_13', 'DIA_DEL_MES_14', 'DIA_DEL_MES_15', 'DIA_DEL_MES_16',
    'DIA_DEL_MES_17', 'DIA_DEL_MES_18', 'DIA_DEL_MES_19', 'DIA_DEL_MES_2',
    'DIA_DEL_MES_20', 'DIA_DEL_MES_21', 'DIA_DEL_MES_22', 'DIA_DEL_MES_23',
    'DIA_DEL_MES_24', 'DIA_DEL_MES_25', 'DIA_DEL_MES_26', 'DIA_DEL_MES_27',
    'DIA_DEL_MES_28', 'DIA_DEL_MES_29', 'DIA_DEL_MES_3', 'DIA_DEL_MES_30',
    'DIA_DEL_MES_31', 'DIA_DEL_MES_4', 'DIA_DEL_MES_5', 'DIA_DEL_MES_6',
    'DIA_DEL_MES_7', 'DIA_DEL_MES_8', 'DIA_DEL_MES_9'];

  const index = dataSet.findIndex(item => item === `DIA_DEL_MES_${day}`);
  const initialArray = _.fill(Array(dataSet.length), 0);

  if (index === -1) {
    return initialArray;
  }

  initialArray[index] = 1;

  return initialArray;
};

const updatePercentiles = (featureCollection) => {
  const { features = [] } = featureCollection;

  return features.map((f) => {
    return {
      name: f.name,
      type: "Feature",
      code: f.code,
      properties: {
        name: f.name,
      },
      geometry: {
        type: f.type,
        coordinates: f.coordinates,
      },
    };
  });
}

const predict = async (query) => {
  const { clase, fecha } = query;

  // load model
  const model = await tf.loadLayersModel('/model.json');

  const date = moment(fecha, "YYYY-MM-DD");
  const hd = new Holidays('CO');
  const holiday = Number(hd.isHoliday(fecha));
  const rawComunas = updatePercentiles(Comunas);
  const dayWeek = fixDayWeek(date.day());
  const dateSplited = fecha.split('-');

  const tensorData = rawComunas.map(item => [
    date.diff(INITIAL_DATE, 'months', false),
    ...generateAccidenteArray(clase?.value),
    ...generateComunaArray(item.code),
    holiday,
    ...generateDayOfWeek(dayWeek),
    ...generateMonth(Number(dateSplited[1])),
    ...generateDay(Number(dateSplited[2]))
  ]);

  const data = tf.tensor(tensorData);

  // prediction
  const prediction = await model.predict(data).array();


  return rawComunas.map((item, index) => {
    const { properties, ...rest } = item;

    const cantidad = _.round(prediction[index][0], 0);

    return {
      ...rest,
      properties: {
        ...properties,
        percentile: cantidad,
        value: cantidad,
      }
    };
  })
};


export default predict;