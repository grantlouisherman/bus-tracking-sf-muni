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
  return (
    <div className='container'>
    <div className='row'>
    <DataLayer>
      <MapContainer />
      <RouteFilter/>
      <div>CARDS WILL GO HERE</div>
    </DataLayer>
    </div>
    </div>
  );
};

export default App;
