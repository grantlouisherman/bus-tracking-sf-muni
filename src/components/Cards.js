import React, { useEffect } from "react";
import Card from './Card';

import { getCardsForRoutes } from '../utils';

const cardsStyle = {
  padding: 0,
  position: "absolute",
  top: "70%",
  "margin-right": "-50%,"
}
const Cards = (props) => {
  const { markers, isMarkersUpdated } = props;
  useEffect(() => {}, [isMarkersUpdated])
  const filteredOutMarkers = {};
  for( const markerKey in markers){
    const { isFilteredOut } = markers[markerKey];
    if(!isFilteredOut){
      filteredOutMarkers[markerKey] = markers[markerKey];
    }
  }
  return (
    <div style={cardsStyle}>
    <h4>Current Cross of Active Lines</h4>
    {
      Object.keys(filteredOutMarkers).length ?
      getCardsForRoutes(filteredOutMarkers, isMarkersUpdated) :
      <div>No active lines at this time</div>
    }
    </div>
    );
};

export default Cards;
