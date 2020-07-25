import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Marker } from "google-maps-react";
import { fetchRoutes, fetchRouteTag } from './utils';

import MapContainer from './components/Map';

const App = () => {
  const [ markers, setMarkers ] = useState([]);
  useEffect( async () => {
    const routeConfigResponse = await fetchRoutes();
    const routeConfig = await routeConfigResponse.json();
    const tags = Object.keys(routeConfig.route)
    .map(routeKey => routeConfig.route[routeKey].tag);
    const routes = await Promise.all(tags.map(async (tag) => {
      const routeData = await fetchRouteTag(tag);
      return routeData.json();
    }));
    setMarkers(routes)
  }, [])

  console.log(markers)
  return (
    <div className="App">
      <MapContainer>
      {markers && markers.map(({ route: { latMin, lonMin, tag}}) => (
        <Marker key={tag} position={{lat: latMin, lng: lonMin}} />
      ))}
      </MapContainer>
    </div>
  )
}

export default App;
