import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Marker } from "google-maps-react";
import _ from 'lodash';

import { fetchRoutes, fetchVehicleLocation, getMarkersForVehicles } from './utils';

import MapContainer from './components/Map';
import RouteFilter from './components/RouteFilter';

const App = () => {
  const [ markers, setMarkers ] = useState([]);
  const [ tags, setTags ] = useState([]);
  const [ initialRender, setInitialRender ] = useState(false);
  useEffect( async () => {
    const fetchRouteData = async () => {
      const routeConfigResponse = await fetchRoutes();
      const routeConfig = await routeConfigResponse.json();
      const tags = Object.keys(routeConfig.route)
      .map(routeKey => routeConfig.route[routeKey].tag);
      const routes = await Promise.all(tags.map(async (tag) => {
        const routeData = await fetchVehicleLocation(tag, 0);
        return routeData.json();
      }));
      setMarkers(routes)
      setTags(tags);
      setInitialRender(true);
    }
    fetchRouteData();
  }, []);
  const style = { height: "500px"}
  // const fetchDataAtInterval = setInterval(async () => {
  //     const routes = await Promise.all(tags.map(async (tag) => {
  //       const routeData = await fetchVehicleLocation(tag, 0);
  //       return routeData.json();
  //     }));
  //     setMarkers(routes)
  //   }, 15000)
   const routeConfigTable = {};
   Object.keys(markers).forEach((markerKey, idx) => {
     routeConfigTable[tags[idx]] = markers[markerKey];
   })
   const routes = Object.keys(routeConfigTable);

  const createMarkers = () => routes.map((routeKey) => {
    const { vehicle } = routeConfigTable[routeKey];
    return vehicle && getMarkersForVehicles(vehicle);
  });

  const fnDeterminer = initialRender ? _.throttle(createMarkers, 1000) : createMarkers();
  return (
    [
      <MapContainer>
      { markers && createMarkers()}
      </MapContainer>,
      <div style={style}>
        <RouteFilter tags={tags} />
      </div>
    ]
  )
}

export default App;

// {markers && markers.map(({ route: { latMin, lonMin, tag}}) => (
//   <Marker key={tag} position={{lat: latMin, lng: lonMin}} />
// ))}
// </MapContainer>
