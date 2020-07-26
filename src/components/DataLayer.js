import React, { useEffect, useState, cloneElement } from 'react';
import {
  fetchRoutes,
  fetchVehicleLocation,
  getMarkersForVehicles,
} from "../utils";
const DataLayer = ({ children }) => {
  const [markers, setMarkers] = useState([]);
  const [tags, setTags] = useState([]);
  const [isMarkersUpdated, setMarkerUpdate] = useState(false);
  const [dataFetchingInterval, setDataFetchingInterval ] = useState(15000);
  const MAX_DELAY = 2147483647;
  useEffect(() => {
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

      setMarkers(routeConfigTable);
      setMarkerUpdate(!isMarkersUpdated);
      setTags(tags);
    };
    fetchRouteData();
  }, []);
  const clickHandler = (evt) => {
    const tag = evt.target.innerText;
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
  const fetchDataAtInterval = async () => {
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
      const { isFilteredOut } = markers[routeKey];
      routeConfigTable[routeKey] = {
        ...routeConfigTable[routeKey],
        isFilteredOut
      };
    });
    if (Object.keys(routeConfigTable).length) {
      setMarkers(routeConfigTable);
      setMarkerUpdate(!isMarkersUpdated)
    }
    if(dataFetchingInterval*2 <= MAX_DELAY){
      setDataFetchingInterval(dataFetchingInterval*2);
    }else {
      setDataFetchingInterval(15000);
    }

  }
  const timer = setInterval(() => {
    // fetchDataAtInterval();
  }, dataFetchingInterval);
  const childrenWithProps = children.map(child =>
    cloneElement(child, { markers, tags, isMarkersUpdated, clickHandler:clickHandler.bind(this) } ));
  return (
    <div>
    { childrenWithProps }
    </div>
  )
}

export default DataLayer;
