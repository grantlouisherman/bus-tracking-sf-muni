import React, { useEffect, useState, cloneElement } from 'react';
import {
  fetchRoutes,
  fetchVehicleLocation,
  getMarkersForVehicles,
  createRoutesAndTitleLookUp,
  createRoutesFromTags,
  createRouteConfigTable,
} from "../utils";
const DataLayer = ({ children }) => {
  const [markers, setMarkers] = useState([]);
  const [tags, setTags] = useState([]);
  const [isMarkersUpdated, setMarkerUpdate] = useState(false);
  const [dataFetchingInterval, setDataFetchingInterval ] = useState(15000);
  const MAX_DELAY = 2147483647;
  const fetchDataAtInterval = async () => {
    const routes = await createRoutesFromTags(tags);
    const routeConfigTable = routes.map(route => {
      if(Array.isArray(route.vehicle)){
        const vehicle = route.vehicle;
        const { routeTag } = vehicle[0];
        return { routeTag, vehicle };
      }
    });
    const currentMarkers = markers;

    for(const routeKey in currentMarkers){
      const { vehicle } = currentMarkers[routeKey];
      const updatedData = routeConfigTable[routeKey];
      if(updatedData && updatedData.vehicle){
        currentMarkers[routeKey].vehicle = updatedData.vehicle;
      }
    }

    if (Object.keys(currentMarkers).length) {
      setMarkers(currentMarkers);
      setMarkerUpdate(!isMarkersUpdated)
    }
    if(dataFetchingInterval*2 <= MAX_DELAY){
      setDataFetchingInterval(dataFetchingInterval*2);
    }else {
      setDataFetchingInterval(15000);
    }
  }
  const timer = setInterval(() => {
    fetchDataAtInterval();
  }, dataFetchingInterval);
  useEffect(() => {
    const fetchRouteData = async () => {
      const { routes, titleLookUp, tags } = await createRoutesAndTitleLookUp();
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
    let newMarkers = markers;
    if (classList.contains("active")) {
      classList.remove("active");
      newMarkers[tag].isFilteredOut = false;
      setMarkers(newMarkers);
      setMarkerUpdate(!isMarkersUpdated);
    } else {
      classList.add("active");
      newMarkers[tag].isFilteredOut = true;
      setMarkers(newMarkers);
      setMarkerUpdate(!isMarkersUpdated);
    }
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
