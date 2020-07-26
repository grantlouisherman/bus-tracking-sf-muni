import React, { useEffect, useState, useRef } from "react";
import logo from "./logo.svg";
import { Marker } from "google-maps-react";
import _ from "lodash";

import {
  fetchRoutes,
  fetchVehicleLocation,
  getMarkersForVehicles,
} from "./utils";

import MapContainer from "./components/Map";
import RouteFilter from "./components/RouteFilter";

const App = () => {
  const markersRef = useRef({});
  const [markers, setMarkers] = useState([]);
  const [tags, setTags] = useState([]);
  const [isMarkersUpdated, setMarkerUpdate] = useState(false);

  useEffect(async () => {
    const fetchRouteData = async () => {
      const routeConfigResponse = await fetchRoutes();
      const routeConfig = await routeConfigResponse.json();

      const tags = Object.keys(routeConfig.route).map(
        (routeKey) => routeConfig.route[routeKey].tag
      );

      const routes = await Promise.all(
        tags.map(async (tag) => {
          const routeData = await fetchVehicleLocation(tag, 0);
          return routeData.json();
        })
      );
      const routeConfigTable = {};
      routes.forEach((route, idx) => {
        routeConfigTable[tags[idx]] = { ...route, isFilteredOut: true };
      });
      markersRef.current.markers = routeConfigTable;
      setTags(tags);
    };
    fetchRouteData();
  }, []);
  const style = { height: "500px" };
  const clickHandler = (evt) => {
    const tag = evt.target.innerText;
    const classList = evt.target.classList;
    const newMarkers = markersRef.current.markers;
    if (classList.contains("active")) {
      classList.remove("active");
      newMarkers[tag].isFilteredOut = false;
      markersRef.current.markers = newMarkers;
      setMarkerUpdate(!isMarkersUpdated);
    } else {
      classList.add("active");
      newMarkers[tag].isFilteredOut = true;
      markersRef.current.markers = newMarkers;
      setMarkerUpdate(!isMarkersUpdated);
    }
  };
  const fetchDataAtInterval = setInterval(async () => {
    console.log('hoi')
    const routes = await Promise.all(
      tags.map(async (tag) => {
        const routeData = await fetchVehicleLocation(tag, 0);
        return routeData.json();
      })
    );
    const routeConfigTable = {};
    routes.forEach((route, idx) => {
      routeConfigTable[tags[idx]] = { ...route };
    });
    Object.keys(routeConfigTable).forEach((routeKey) => {
      const { isFilteredOut } = markersRef.current.markers[routeKey];
      routeConfigTable[routeKey] = {
        ...routeConfigTable[routeKey],
        isFilteredOut
      };
    });
    if (Object.keys(routeConfigTable).length) {
      markersRef.current.markers = routeConfigTable;
      setMarkerUpdate(!isMarkersUpdated);
    }
  }, 1000);
  return [
    <MapContainer markers={markersRef.current.markers} isMarkersUpdated={isMarkersUpdated} />,
    <div style={style}>
      <RouteFilter tags={tags} clickHandler={clickHandler.bind(this)} />
    </div>,
  ];
};

export default App;

// {markers && markers.map(({ route: { latMin, lonMin, tag}}) => (
//   <Marker key={tag} position={{lat: latMin, lng: lonMin}} />
// ))}
// </MapContainer>
