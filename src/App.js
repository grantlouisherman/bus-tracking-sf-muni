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
import DataLayer from "./components/DataLayer";
const App = () => {
  // const markersRef = useRef({});
  // const [markers, setMarkers] = useState([]);
  // const [tags, setTags] = useState([]);
  // const [isMarkersUpdated, setMarkerUpdate] = useState(false);
  // useEffect(() => {
  //   const fetchRouteData = async () => {
  //     const routeConfigResponse = await fetchRoutes();
  //     const routeConfig = await routeConfigResponse.json();
  //
  //     const tags = Object.keys(routeConfig.route).map(
  //       (routeKey) => routeConfig.route[routeKey].tag
  //     );
  //
  //     const routes = await Promise.all(
  //       tags.map(async (tag) => {
  //         const routeData = await fetchVehicleLocation(tag, 0);
  //         return routeData.json();
  //       })
  //     );
  //     const routeConfigTable = {};
  //     routes.forEach((route, idx) => {
  //       routeConfigTable[tags[idx]] = { ...route, isFilteredOut: true };
  //     });
  //
  //     setMarkers(routeConfigTable);
  //     setMarkerUpdate(!isMarkersUpdated);
  //     setTags(tags);
  //   };
  //   fetchRouteData();
  // }, []);
  // const style = { height: "500px" };
  // const clickHandler = (evt) => {
  //   const tag = evt.target.innerText;
  //   const classList = evt.target.classList;
  //   let newMarkers = markers;
  //   if (classList.contains("active")) {
  //     classList.remove("active");
  //     newMarkers[tag].isFilteredOut = false;
  //     setMarkers(newMarkers);
  //     setMarkerUpdate(!isMarkersUpdated);
  //   } else {
  //     classList.add("active");
  //     newMarkers[tag].isFilteredOut = true;
  //     setMarkers(newMarkers);
  //     setMarkerUpdate(!isMarkersUpdated);
  //   }
  // };
  // const fetchDataAtInterval = setInterval(async () => {
  //   const routes = await Promise.all(
  //     tags.map(async (tag) => {
  //       const routeData = await fetchVehicleLocation(tag, 0);
  //       return routeData.json();
  //     })
  //   );
  //   const routeConfigTable = {};
  //   routes.forEach((route, idx) => {
  //     routeConfigTable[tags[idx]] = { ...route };
  //   });
  //   Object.keys(routeConfigTable).forEach((routeKey) => {
  //     const { isFilteredOut } = markers[routeKey];
  //     routeConfigTable[routeKey] = {
  //       ...routeConfigTable[routeKey],
  //       isFilteredOut
  //     };
  //   });
  //   if (Object.keys(routeConfigTable).length) {
  //     console.log(routeConfigTable)
  //     setMarkers(routeConfigTable);
  //     setMarkerUpdate(!isMarkersUpdated)
  //   }
  // }, 1000);

  return (
    <DataLayer>
      <MapContainer />
      <RouteFilter/>
    </DataLayer>
  );
};

export default App;

// {markers && markers.map(({ route: { latMin, lonMin, tag}}) => (
//   <Marker key={tag} position={{lat: latMin, lng: lonMin}} />
// ))}
// </MapContainer>
