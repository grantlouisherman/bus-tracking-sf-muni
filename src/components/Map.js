import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { API_KEY } from '../credentials';
import { getMarkersForVehicles } from '../utils';

const mapStyles = {
  width: "50%",
  height: "100%",
};

export const MapContainer = ({markers, isMarkersUpdated, google }) => {
  useEffect(() => {
  }, [ markers, isMarkersUpdated ])
  const createMarkers = () => Object.keys(markers)
  .filter(markerKey => !markers[markerKey].isFilteredOut)
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
    return vehicle && getMarkersForVehicles(vehicle);
  });
  return (
    <Map
      google={google}
      zoom={11}
      style={mapStyles}
      initialCenter={{
        lat: 37.773972,
        lng: -122.431297,
      }}
    >
      { createMarkers() }
    </Map>
  )
};

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(MapContainer);
