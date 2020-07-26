import React from "react";
import Card from './Card';

import { getCardsForRoutes } from '../utils';

const Cards = (props) => {
  const { markers } = props;
  console.log(markers)
  return (
    <div>
    { markers && getCardsForRoutes(markers) }
    </div>
    );
};

export default Cards;
