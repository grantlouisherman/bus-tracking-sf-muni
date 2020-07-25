import React, { useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { API_KEY } from '../credentials';
import { getMarkersForVehicles } from '../utils';

const mapStyles = {
  width: "50%",
  height: "100%",
};

export const MapContainer = ({ markers, google, isMarkersUpdated }) => {
  useEffect(() => { console.log('') }, [isMarkersUpdated])
  const createMarkers = () => Object.keys(markers)
  .filter(markerKey => !markers[markerKey].isFilteredOut)
  .map((routeKey) => {
    const { vehicle, isFilteredOut } = markers[routeKey];
    if(vehicle && !isFilteredOut){
      return getMarkersForVehicles(vehicle);
    }
  });
  return (
    <Map
      google={google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: 37.773972,
        lng: -122.431297,
      }}
    >
      { markers && createMarkers() }
    </Map>
  )
};

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(MapContainer);
