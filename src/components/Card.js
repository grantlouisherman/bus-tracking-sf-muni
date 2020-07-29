import React, { useEffect, useState } from 'react';

import { fetchReverseGeoCode } from '../utils';

const Card = ({ title, routeName, vehicle }  ) => {
  const [ currVehicleLocation, setVehicleLocations ] = useState([]);
  useEffect(() => {
    const fetchVehicleCrossStreets = async () => {
      if(vehicle && Array.isArray(vehicle)){
        const { lat, lon } = vehicle[0];
        const vehicles = await Promise.all(vehicle.map(async ({ lon, lat, id}) => {
          const getReverseData = await fetchReverseGeoCode(lat, lon);
          const getReverseDataJson = await getReverseData.json();
          return { ...getReverseDataJson, id};
        }));
        setVehicleLocations(vehicles);
      }
    }
    fetchVehicleCrossStreets();
  }, [title])
  return (
    <div class="card" >
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <ul class="list-group">
          {
            Array.isArray(vehicle) && currVehicleLocation.map(({ id, results }) => {
            return (
              <li class="list-item">
                Bus { id } is currently at { Array.isArray(results) && results[0] && results[0].formatted_address }
              </li>
            )
          })
        }
          </ul>
        </div>
      </div>
  )
}
export default Card;
