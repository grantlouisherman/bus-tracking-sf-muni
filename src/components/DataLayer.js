import React, { useEffect, useState, cloneElement, useRef } from 'react';
import _ from 'lodash';
import {
  fetchRoutes,
  fetchVehicleLocation,
  getMarkersForVehicles,
  createRoutesAndTags,
  createRoutesFromTags,
  createRouteConfigTable,
  updateOldDataWithNewVehicleLocations,
  updateMapWithFilter,
  createStopsFromTags,
  createStops
} from "../utils";
const DataLayer = ({ children }) => {
  const intervalDataRef = useRef({});
  const [markers, setMarkers] = useState([]);
  const [stops, setStops] = useState([]);
  const [tags, setTags] = useState([]);
  const [isMarkersUpdated, setMarkerUpdate] = useState(false);
  const [dataFetchingInterval, setDataFetchingInterval ] = useState(15000);
  const MAX_DELAY = 2147483647;
  const fetchDataAtInterval = async () => {
    const routes = await createRoutesFromTags(tags);
    const updatedRouteConfigTable = updateOldDataWithNewVehicleLocations(routes, markers);
    intervalDataRef.current.markers = updatedRouteConfigTable;
    setMarkerUpdate(!isMarkersUpdated)
    intervalDataRef.current.isIntervalStarted = true;
  }
  const timer = setInterval(() => {
    fetchDataAtInterval();
    clearInterval(timer);
  }, dataFetchingInterval);

  useEffect(() => {
    const fetchRouteData = async () => {
      const { routes, titleLookUp, tags } = await createRoutesAndTags();
      const routeConfigTable = await createRouteConfigTable(routes, titleLookUp, tags);
      const stops = await createStopsFromTags(tags);
      const formattedStops = createStops(stops);
      for(const stopKey  in formattedStops){
        routeConfigTable[stopKey].stops = formattedStops[stopKey];
      }
      setMarkers(routeConfigTable);
      setMarkerUpdate(!isMarkersUpdated);
      setTags(tags);
    };
    fetchRouteData();
  }, []);


  const clickHandler = (evt) => {
    const tag = evt.target.id;
    const classList = evt.target.classList;
    let newMarkers = updateMapWithFilter(classList, markers, tag);
    setMarkers(newMarkers);
    setMarkerUpdate(!isMarkersUpdated);
  };

  const childrenWithProps = children.map(child =>
    cloneElement(child, { intervalDataRef, markers , tags, isMarkersUpdated, clickHandler:clickHandler.bind(this) } ));
  return (
    <div>
    { childrenWithProps }
    </div>
  )
}

export default DataLayer;
