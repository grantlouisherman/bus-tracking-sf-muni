import React from 'react';

const Card = ({ routeName, vehicle }  ) => {
  console.log(routeName, vehicle)
  return (
    <div class="card" >
        <div class="card-body">
          <h5 class="card-title">{routeName}</h5>
          <ul class="list-group">
          {
            Array.isArray(vehicle) && vehicle.map(({ id, lon, lat, heading}) => (
            <li class="list-item">
              ID: {id}   lat: {lat}  long: {lon}
            </li>
          ))
          }
          </ul>
        </div>
      </div>
  )
}
export default Card;
