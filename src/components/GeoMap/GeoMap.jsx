import Map, { Source, Layer } from 'react-map-gl';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

import './style.css';

import { dataLayer } from './map-style';

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVzdWdhdiIsImEiOiJjbGFxN28wc3YxZzl0M3JtaTUyb21wOGFtIn0.j5-unL3t1TDt11kCSI1_WA'; // Set your mapbox token here

const GeoMap = ({ data }) => {
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback(event => {
    const {
      features,
      point: { x, y }
    } = event;
    const hoveredFeature = features && features[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  return (
    <div className="map">
      <Map
        initialViewState={{
          latitude: 6.259500810537801,
          longitude: -75.61186834250292,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['data']}
        onMouseMove={onHover}
      >
        <Source
          type="geojson"
          data={{ type: 'FeatureCollection', features: data }}
        >
          <Layer {...dataLayer} />
        </Source>
        {hoverInfo && (
          <div className="tooltip" style={{ left: hoverInfo.x, top: hoverInfo.y }}>
            <div>Comuna: {hoverInfo.feature.properties.name}</div>
            <div>Cantidad: {hoverInfo.feature.properties.value}</div>
          </div>
        )}
      </Map>
    </div>
  );
};

GeoMap.propTypes = {
  data: PropTypes.array.isRequired,
};


export default GeoMap;