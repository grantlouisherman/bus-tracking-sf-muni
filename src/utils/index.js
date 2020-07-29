import React from "react";
import { Marker, Polyline } from "google-maps-react";

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

export const fetchRouteStops = async (routeTag) =>
  await fetch(
    `http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni&r=${routeTag}`
  );

export const getMarkersForVehicles = (vehicle, google, printRef) =>
  vehicle.map(({ id, lat, lon }) => (
    <Marker
      key={id}
      position={{ lat, lng: lon }}
      animation={google.maps.Animation.DROP}
      ref={printRef}
    />
  ));

export const getPolylinesForRoutes = (stops, google) => {
  const firstStop = stops[0];
  const lastStop = stops[stops.length - 2];
  const updatedStops = stops.map(({ lat, lon }) => ({ lat: parseFloat(lat), lng: parseFloat(lon) }));
  return (
    <Polyline
      maps={google.maps}
      geodesic={true}
      path={updatedStops}
      strokeColor="#0000FF"
      strokeOpacity={0.8}
      strokeWeight={2} />
  );
};

export const getCardsForRoutes = (markers, isMarkersUpdated) =>
  Object.keys(markers).map((markerKey) => (
    <Card
      key={markerKey}
      title={markers[markerKey].title}
      routeName={markerKey}
      vehicle={markers[markerKey].vehicle}
      isMarkersUpdated={isMarkersUpdated}
    />
  ));

export const createRoutesFromTags = async (tags) =>
  await Promise.all(
    tags.map(async (tag) => {
      const routeData = await fetchVehicleLocation(tag);
      return routeData.json();
    })
  );

export const createStopsFromTags = async (tags) =>
  await Promise.all(
    tags.map(async (tag) => {
      const routeData = await fetchRouteStops(tag);
      return routeData.json();
    })
  );

export const createRouteConfig = async () => {
  const routeConfigResponse = await fetchRoutes();
  const routeConfig = await routeConfigResponse.json();
  return routeConfig;
};
export const createTagsAndTitles = ({ route }) => {
  let titleLookUp = {};
  const titles = Object.keys(route).forEach((routeKey) => {
    const tag = route[routeKey].tag;
    const title = route[routeKey].title;
    titleLookUp[tag] = title;
  });
  const tags = Object.keys(route).map((routeKey) => route[routeKey].tag);
  return { titleLookUp, tags };
};
export const createRoutesAndTags = async () => {
  const routeConfigResponse = await createRouteConfig();
  const { title, tags, titleLookUp } = createTagsAndTitles(routeConfigResponse);
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

export const updateOldDataWithNewVehicleLocations = (newRoutes, markers) => {
  const routeConfigTable = newRoutes.map((newRoute) => {
    if (Array.isArray(newRoute.vehicle)) {
      const vehicle = newRoute.vehicle;
      const { routeTag } = vehicle[0];
      return { routeTag, vehicle };
    }
  });
  const newMarkers = markers;

  for (const routeKey in markers) {
    const { vehicle } = newMarkers[routeKey];
    const updatedData = routeConfigTable[routeKey];
    if (updatedData && updatedData.vehicle) {
      newMarkers[routeKey].vehicle = updatedData.vehicle;
    }
  }
  return newMarkers;
};

export const updateMapWithFilter = (domClassList, markers, routeTag) => {
  const shouldShowMarkers = () => {
    domClassList.remove("active");
    markers[routeTag].isFilteredOut = false;
    return markers;
  };
  const shouldFilterOutMarkers = () => {
    domClassList.add("active");
    markers[routeTag].isFilteredOut = true;
    return markers;
  };
  return domClassList.contains("active")
    ? shouldShowMarkers()
    : shouldFilterOutMarkers();
};

export const createStops = (stops) => {
  const stopTable = {};
  stops.forEach((s) => {
    const { tag, stop } = s.route;
    stopTable[tag] = stop;
  });
  return stopTable;
};
