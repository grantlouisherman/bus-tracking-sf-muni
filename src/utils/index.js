import React from "react";
import { Marker } from "google-maps-react";

import Card from "../components/Card";
import { API_KEY } from '../credentials';

export const fetchRoutes = async () =>
  await fetch(
    "http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni"
  );
export const fetchVehicleLocation = async (routeTag) =>
  await fetch(
    `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=${routeTag}&t=0`
  );

// https://maps.googleapis.com/maps/api/geocode/json?latlng=37.795361,-122.397301&key=AIzaSyCxuukMo4pelCWyisxp5OrdrtbQCAk0Izg
export const fetchReverseGeoCode = async (lat, long) =>
await fetch(
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`
);

export const getMarkersForVehicles = (vehicle) =>
  vehicle.map(({ id, lat, lon }) => (
    <Marker key={id} position={{ lat, lng: lon }} tracksViewChanges={false} />
  ));

export const getCardsForRoutes = (markers) =>
  Object.keys(markers).map((markerKey) => (
    <Card
      title={markers[markerKey].title}
      routeName={markerKey}
      vehicle={markers[markerKey].vehicle}
    />
  ));
