// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'index',
      stops: []
    },
    'fill-opacity': 0.7,
    'fill-outline-color': '#f0bba1'
  }
};