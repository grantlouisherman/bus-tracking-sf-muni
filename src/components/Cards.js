import React, { useEffect } from "react";
import Card from './Card';

import { getCardsForRoutes, getMostUpToDateMarkerData } from '../utils';

const cardsStyle = {
  padding: 0,
  position: "absolute",
  top: "70%",
  "margin-right": "-50%,"
}
const Cards = (props) => {
  const { markers, isMarkersUpdated, intervalDataRef } = props;
  useEffect(() => {}, [isMarkersUpdated, intervalDataRef.current.isMarkersUpdated]);
  const data = getMostUpToDateMarkerData(intervalDataRef, markers);
  const filteredOutMarkers = {};
  for( const markerKey in data){
    const { isFilteredOut } = data[markerKey];
    if(!isFilteredOut){
      filteredOutMarkers[markerKey] = data[markerKey];
    }
  }
  return (
    <div style={cardsStyle}>
    <h4>Current Cross of Active Lines</h4>
    {
      Object.keys(filteredOutMarkers).length ?
      getCardsForRoutes(filteredOutMarkers, intervalDataRef.current.isMarkersUpdated) :
      <div>No active lines at this time</div>
    }
    </div>
    );
};

export default Cards;
