import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { API_KEY } from '../credentials';
const mapStyles = {
  width: "50%",
  height: "100%",
};

export const MapContainer = ({ children, google }) => (
  <Map
    google={google}
    zoom={14}
    style={mapStyles}
    initialCenter={{
      lat: 37.773972,
      lng: -122.431297,
    }}
  >
    {children}
  </Map>
);

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(MapContainer);
