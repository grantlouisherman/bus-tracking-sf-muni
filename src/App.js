import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Marker } from "google-maps-react";
import { fetchRoutes, fetchVehicleLocation, getMarkersForVehicles } from './utils';

import MapContainer from './components/Map';

const App = () => {
  const [ markers, setMarkers ] = useState([]);
  const [ tags, setTags ] = useState([]);
  useEffect( async () => {
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
  }, []);

  setTimeout(async () => {
    const routes = await Promise.all(tags.map(async (tag) => {
      const routeData = await fetchVehicleLocation(tag, 0);
      return routeData.json();
    }));
    setMarkers(routes)
   }, 15000);
   
  return (
    <div className="App">
      <MapContainer>
      { markers && markers.map(({vehicle}) => vehicle && getMarkersForVehicles(vehicle))}
      </MapContainer>

    </div>
  )
}

export default App;

// {markers && markers.map(({ route: { latMin, lonMin, tag}}) => (
//   <Marker key={tag} position={{lat: latMin, lng: lonMin}} />
// ))}
// </MapContainer>
