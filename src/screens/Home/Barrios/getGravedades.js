import TIPOS_GRAVEDAD from '../../../Assets/gravedad_accidente.json';

const getGravedades = () => TIPOS_GRAVEDAD.map(item => ({ value: item, label: item }));

export default getGravedades;