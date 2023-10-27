import TIPOS_ACCIDENTE from '../../../Assets/tipos_accidente.json';

const getAccidentes = () => TIPOS_ACCIDENTE.map(item => ({ value: item, label: item }));

export default getAccidentes;