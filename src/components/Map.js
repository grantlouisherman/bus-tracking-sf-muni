import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Polyline } from "google-maps-react";
import _ from 'lodash';

import { API_KEY } from '../credentials';
import { getMarkersForVehicles, getPolylinesForRoutes, getMostUpToDateMarkerData } from '../utils';

const mapStyles = {
  width: "70%",
  height: "50%",
};

export const MapContainer = ({markers, isMarkersUpdated, google, intervalDataRef }) => {
  useEffect(() => { }, [ markers, isMarkersUpdated, intervalDataRef.current.isMarkersUpdated ])
  const data = getMostUpToDateMarkerData(intervalDataRef, markers);
  const createMarkers = () => data && Object.keys(data)
  .filter(markerKey => markers && markers[markerKey] && !markers[markerKey].isFilteredOut)
  .map((routeKey) => {
    const { vehicle, isFilteredOut, stops } = markers[routeKey];
    // when there is only one vehicle vehicle returns plain Object
    // so must addd that to Array
    // TODO: need to handle this better
    if(vehicle && !Array.isArray(vehicle)){
      let vehicleData = [];
      vehicleData.push(vehicle);
      return [ getMarkersForVehicles(vehicleData), getPolylinesForRoutes(stops, google)]
    }
    return vehicle && [ getMarkersForVehicles(vehicle, google), getPolylinesForRoutes(stops, google)];
  });
  const throttleCreateMarkers = _.throttle(createMarkers, 1000);
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
      layerTypes={["TrafficLayer"]}
    >
      { throttleCreateMarkers() }
    </Map>
  )
};

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(MapContainer);
