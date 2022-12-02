import React from 'react'
import { getRentedVehiclesByUserId ,getRentedVehicles } from '../../../utils/services/rentalEventUtils'
import { getVehicleById } from '../../../utils/services/vehiclesUtils';
import {VehicleList} from "../vehiclesList/VehicleList"
import { VehicleCard } from '../vehicleCard/VehicleCard';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';
export const RentedVehicles = () => {
  const loggedCustomer = getLoggedCustomer();
  const allCars = [];
  const renderVehicles = ()=>{

  };
return (
  <div>
    {localStorage.getItem('rentCars').split(',').forEach(x=>{
        if(x!= '' || x!= undefined || x!= null){
          getVehicleById(x).then(car=>{
            for(var i = 0;i<car.data.length;i++){
              {<VehicleCard key={car.data[i].id} id={car.data[i].id} img={car.data[i].picture} brand={car.data[i].brand} model={car.data[i].model} constructionYear={car.data[i].constructionYear} fuelType={car.data[i].fuelType} NumberOfSeats={car.data[i].NumberOfSeats} count={car.data[i].count}/>}
            }
          })
        }
      })
    }
  </div>
)
}