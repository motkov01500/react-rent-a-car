import axios from 'axios';
import { getLoggedCustomer } from './auth-http-utils';

const apiUrl = 'http://localhost:3005/rentalEvent';

export function getRentedVehicles(){
    const loggedCustomer = getLoggedCustomer();
    return axios.get(`${apiUrl}?customerID${loggedCustomer.id}`);
}

export async function getRentedVehiclesByUserId(){
    const loggedCustomer = getLoggedCustomer();
    const data = (await getRentedVehicles()).data;
    return [...data].filter(x=>x.customer == loggedCustomer.id);
}

export async function postRentalEvent(RentalEventObj) {
    return axios.post(apiUrl, RentalEventObj);
}