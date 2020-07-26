import React from 'react';

const Card = ({ title, routeName, vehicle }  ) => {
  return (
    <div class="card" >
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <ul class="list-group">
          {
            Array.isArray(vehicle) && vehicle.map(({ routeTag, lon, lat, heading}) => (
            <li class="list-item">
              lat: {lat}  long: {lon}
            </li>
          ))
          }
          </ul>
        </div>
      </div>
  )
}
export default Card;
