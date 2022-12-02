import React,{useState,useEffect} from 'react'
import { getRentedVehiclesByUserId ,getRentedVehicles } from '../../../utils/services/rentalEventUtils'
import { getVehicleById } from '../../../utils/services/vehiclesUtils';
import {VehicleList} from "../vehiclesList/VehicleList"
import { VehicleCard } from '../vehicleCard/VehicleCard';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';
export const RentedVehicles = () => {
  const loggedCustomer = getLoggedCustomer();
  const [currentVehicle,setCurrentVehicle] = useState([]);

  useEffect(()=>{localStorage.getItem('rentCars').split(',').forEach(x=>{
    if(x!= '' || x!= undefined || x!= null){
      getVehicleById(x).then(car=>{
        setCurrentVehicle(car.data)
      })}
  })},[]);

return (
  <div>
    {
      currentVehicle.map(vehicle=><VehicleCard key={vehicle.id} id={vehicle.id} img={vehicle.picture} brand={vehicle.brand} model={vehicle.model} constructionYear={vehicle.constructionYear} fuelType={vehicle.fuelType} NumberOfSeats={vehicle.NumberOfSeats} count={vehicle.count}/>)
    }
  </div>
)
}