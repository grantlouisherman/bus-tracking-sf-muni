import React from "react";
import { Marker } from "google-maps-react";
// import bus from './bus.jpg';
export const fetchRoutes = async () =>
  await fetch(
    "http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni"
  );
export const fetchVehicleLocation = async (routeTag) =>
  await fetch(
    `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=${routeTag}&t=0`
  );

export const getMarkersForVehicles = (vehicle) =>
  vehicle.map(({ id, lat, lon }) => (
    <Marker key={id} position={{ lat, lng: lon }} tracksViewChanges={false} />
  ));
