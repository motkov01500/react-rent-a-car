import { useState } from "react";
import { useEffect } from "react";
import { getVehicles,deleteVehicle } from "../../../utils/services/vehiclesUtils";
import { getLoggedCustomer } from "../../../utils/services/auth-http-utils";
import { postRentalEvent } from "../../../utils/services/rentalEventUtils";
import './VehicleList.scss';
import { useNavigate } from "react-router";
import { VehicleCard } from "../vehicleCard/VehicleCard";

const wrapperStyles = {
    margin: '20px'
};

export function VehicleList() {
    const navigate = useNavigate();
    const [vehicles, setVehicle] = useState([]);
    const [rentevent, SetRentEvent] = useState({});

    useEffect(() => {
        getVehicles().then((response) => {
            setVehicle(response.data);
        });
    }, [])

    const rentACarHandle = (event)=>{
        event.preventDefault();
        var date = new Date();
        var loggedCustomer = getLoggedCustomer();
        var alreadyRent = localStorage.getItem('rentCars');
        console.log(alreadyRent);
        localStorage.setItem('rentCars',[...alreadyRent,event.target.closest('#fluid-container').attributes["data-vehicle-id"].value])

        postRentalEvent({
            startDateAndTime: date,
            endDateAndTime: date.setDate(date.getDate() + 2).toLocaleString(),
            vehicle: event.target.closest('#fluid-container').attributes["data-vehicle-id"].value,
            customer: JSON.parse(localStorage.getItem("loggedUser")).id
        }).then(response=>{
            navigate('/vehicles')
        });
    }

    const renderCards = () => {
        return vehicles.map(vehicle => {
            const onEdit = () => {
                const loggedCustomer = getLoggedCustomer();
                if(loggedCustomer.isAdmin){
                    navigate(`/vehicles/edit/${vehicle.id}`);
                }else{
                    alert("only admins could edit");
                }
            }

            const onDelete = () => {
                deleteVehicle(vehicle.id).then(() => {
                    setVehicle((allVehicles) => {
                        return allVehicles.filter(v => v.id !== vehicle.id);
                    });
                });
            }

            return
            <VehicleCard key={vehicle.id} img={vehicle.picture} brand={vehicle.brand} model={vehicle.model} constructionYear={vehicle.constructionYear} fuelType={vehicle.fuelType} NumberOfSeats={vehicle.NumberOfSeats} count={vehicle.count}/>
        })
    }

    return (
        <div className="vehicleCards">
            {vehicles.map(vehicle=><VehicleCard key={vehicle.id} id={vehicle.id} img={vehicle.picture} brand={vehicle.brand} model={vehicle.model} constructionYear={vehicle.constructionYear} fuelType={vehicle.fuelType} NumberOfSeats={vehicle.NumberOfSeats} count={vehicle.count} clickDelete={()=>{
                const loggedCustomer = getLoggedCustomer();
                if(loggedCustomer.isAdmin){
                deleteVehicle(vehicle.id).then(() => {
                    setVehicle((allVehicles) => {
                        return allVehicles.filter(v => v.id !== vehicle.id);
                    });
                });
            }
            else{
                alert("only admins could delete");
            }
            }} clickUpdate={()=>{
                const loggedCustomer = getLoggedCustomer();
                if(loggedCustomer.isAdmin){
                    navigate(`/vehicles/edit/${vehicle.id}`);
                }else{
                    alert("only admins could update");
                }
            }}  clickRent={rentACarHandle}/>)
            }
        </div>
    );
}