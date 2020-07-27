import React from "react";
import { Marker } from "google-maps-react";

import Card from "../components/Card";
import { API_KEY } from "../credentials";

export const fetchRoutes = async () =>
  await fetch(
    "http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni"
  );
export const fetchVehicleLocation = async (routeTag) =>
  await fetch(
    `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=${routeTag}&t=0`
  );

export const fetchReverseGeoCode = async (lat, long) =>
  await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`
  );

export const getMarkersForVehicles = (vehicle) =>
  vehicle.map(({ id, lat, lon }) => (
    <Marker key={id} position={{ lat, lng: lon }} tracksViewChanges={false} />
  ));

export const getCardsForRoutes = (markers, isMarkersUpdated) =>
  Object.keys(markers).map((markerKey) => (
    <Card
      title={markers[markerKey].title}
      routeName={markerKey}
      vehicle={markers[markerKey].vehicle}
      isMarkersUpdated={isMarkersUpdated}
    />
  ));

export const createRoutesFromTags = async (tags) =>
  await Promise.all(
    tags.map(async (tag) => {
      const routeData = await fetchVehicleLocation(tag, 0);
      return routeData.json();
    })
  );

export const createRoutesAndTitleLookUp = async () => {
  const routeConfigResponse = await fetchRoutes();
  const routeConfig = await routeConfigResponse.json();
  let titleLookUp = {};
  const titles = Object.keys(routeConfig.route).forEach((routeKey) => {
    const tag = routeConfig.route[routeKey].tag;
    const title = routeConfig.route[routeKey].title;
    titleLookUp[tag] = title;
  });
  const tags = Object.keys(routeConfig.route).map(
    (routeKey) => routeConfig.route[routeKey].tag
  );
  const routes = await createRoutesFromTags(tags);
  return { routes, titleLookUp, tags };
};

export const createRouteConfigTable = (routes, titleLookUp, tags) => {
  const routeConfigTable = {};
  routes.forEach((route, idx) => {
    const tag = tags[idx];
    routeConfigTable[tag] = {
      ...route,
      isFilteredOut: true,
      title: titleLookUp[tag],
    };
  });
  return routeConfigTable;
};
