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
  const [ isMarkersUpdated, setMarkerUpdate ] = useState(false);
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

      const routeConfigTable = {};
      routes.forEach((route, idx) => {
        routeConfigTable[tags[idx]] = { ...route, isFilteredOut:false};
      })
      setMarkers(routeConfigTable)
      setTags(tags);
      setInitialRender(true);
    }
    fetchRouteData();
  }, []);
  const style = { height: "500px"}

  const clickHandler = evt => {
    const tag = evt.target.innerText;
    const classList = evt.target.classList;
    if(classList.contains('active')){
      classList.remove('active');
      const newMarkers = markers;
      newMarkers[tag].isFilteredOut = false;
      setMarkers(newMarkers);
      setMarkerUpdate(!isMarkersUpdated);
    }else{
      classList.add('active');
      const newMarkers = markers;
      newMarkers[tag].isFilteredOut = true;
      setMarkers(newMarkers);
      setMarkerUpdate(!isMarkersUpdated);
    }
  }
  console.log(markers)
  // const fetchDataAtInterval = setInterval(async () => {
  //     const routes = await Promise.all(tags.map(async (tag) => {
  //       const routeData = await fetchVehicleLocation(tag, 0);
  //       return routeData.json();
  //     }));
  //     setMarkers(routes)
  //   }, 15000)

  // const fnDeterminer = initialRender ? _.throttle(createMarkers, 1000) : createMarkers();
  return (
    [
      <MapContainer markers={markers} isMarkersUpdated={isMarkersUpdated} />,
      <div style={style}>
        <RouteFilter tags={tags} clickHandler={clickHandler.bind(this)}/>
      </div>
    ]
  )
}

export default App;

// {markers && markers.map(({ route: { latMin, lonMin, tag}}) => (
//   <Marker key={tag} position={{lat: latMin, lng: lonMin}} />
// ))}
// </MapContainer>
