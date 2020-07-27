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
  return (
    <div style={cardsStyle}>
    <h4>Current Cross Streets of Buses</h4>
    { markers && getCardsForRoutes(markers, isMarkersUpdated) }
    </div>
    );
};

export default Cards;
