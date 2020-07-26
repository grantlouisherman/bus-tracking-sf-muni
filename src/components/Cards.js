import React, { useEffect } from "react";
import Card from './Card';

import { getCardsForRoutes } from '../utils';

const Cards = (props) => {
  const { markers } = props;
  return (
    <div>
    <h4>Current Cross Streets of Buses</h4>
    { markers && getCardsForRoutes(markers) }
    </div>
    );
};

export default Cards;
