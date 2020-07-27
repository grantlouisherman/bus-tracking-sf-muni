import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import _ from 'lodash';

import { API_KEY } from '../credentials';
import { getMarkersForVehicles } from '../utils';

const mapStyles = {
  width: "70%",
  height: "50%",
};

export const MapContainer = ({markers, isMarkersUpdated, google }) => {
  useEffect(() => { }, [ markers, isMarkersUpdated ])
  const createMarkers = () => Object.keys(markers)
  .filter(markerKey => markers && markers[markerKey] && !markers[markerKey].isFilteredOut)
  .map((routeKey) => {
    const { vehicle, isFilteredOut } = markers[routeKey];
    // when there is only one vehicle vehicle returns plain Object
    // so must addd that to Array
    // TODO: need to handle this better
    if(vehicle && !Array.isArray(vehicle)){
      let vehicleData = [];
      vehicleData.push(vehicle);
      return getMarkersForVehicles(vehicleData);
    }
    return vehicle && getMarkersForVehicles(vehicle, google);
  });
  const throttleCreateMarkers = _.throttle(createMarkers, 15000);
  return (
    <Map
      google={google}
      zoom={11}
      style={mapStyles}
      className='col'
      initialCenter={{
        lat: 37.773972,
        lng: -122.431297,
      }}
    >
      { throttleCreateMarkers() }
    </Map>
  )
};

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(MapContainer);
