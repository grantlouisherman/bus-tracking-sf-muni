import React, { useEffect, useState, cloneElement } from 'react';
import {
  fetchRoutes,
  fetchVehicleLocation,
  getMarkersForVehicles,
  createRoutesAndTags,
  createRoutesFromTags,
  createRouteConfigTable,
  updateOldDataWithNewVehicleLocations,
  updateMapWithFilter
} from "../utils";
const DataLayer = ({ children }) => {
  const [markers, setMarkers] = useState([]);
  const [tags, setTags] = useState([]);
  const [isMarkersUpdated, setMarkerUpdate] = useState(false);
  const [dataFetchingInterval, setDataFetchingInterval ] = useState(15000);
  const MAX_DELAY = 2147483647;
  const fetchDataAtInterval = async () => {
    const routes = await createRoutesFromTags(tags);
    const updatedRouteConfigTable = updateOldDataWithNewVehicleLocations(routes, markers);
    setMarkers(updatedRouteConfigTable);
    setMarkerUpdate(!isMarkersUpdated)
    setDataFetchingInterval(15000);
  }
  const timer = setInterval(() => {
    fetchDataAtInterval();
  }, dataFetchingInterval);

  useEffect(() => {
    const fetchRouteData = async () => {
      const { routes, titleLookUp, tags } = await createRoutesAndTags();
      const routeConfigTable = await createRouteConfigTable(routes, titleLookUp, tags);
      setMarkers(routeConfigTable);
      setMarkerUpdate(!isMarkersUpdated);
      setTags(tags);
    };
    fetchRouteData();
  }, []);

  useEffect(() => {
    clearInterval(timer);
  }, [dataFetchingInterval])

  const clickHandler = (evt) => {
    const tag = evt.target.id;
    const classList = evt.target.classList;
    let newMarkers = updateMapWithFilter(classList, markers, tag);
    setMarkers(newMarkers);
    setMarkerUpdate(!isMarkersUpdated);
  };

  const childrenWithProps = children.map(child =>
    cloneElement(child, { markers, tags, isMarkersUpdated, clickHandler:clickHandler.bind(this) } ));
  return (
    <div>
    { childrenWithProps }
    </div>
  )
}

export default DataLayer;
