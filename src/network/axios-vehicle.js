import axios from './axios'
// import errorHandler from './error-handler'
// import * as indexDB from '../store/indexdb/vehicle'
const VEHICLE_URL = '/vehicle'
export const fetchVehiclesFromServer = async () => {
    return await axios.get(VEHICLE_URL)
}

export const getVehicle = async plateNumber => {
    return await axios.get(`${VEHICLE_URL}/${plateNumber}`)
}

export const pushNewVehicleToServer = async (vehicle) => {
    return await axios.post(VEHICLE_URL, vehicle)
}

export const editVehicle = async (vehicle) => {
    return await axios.put(VEHICLE_URL, vehicle)
} 

export const deleteVehicle = async (vehicle) => {
    return await axios.delete(VEHICLE_URL + '?_id=' + vehicle._id)
}

/**
 * this structure is correct
 * the return promise is what we want 
 * this way we will handle the errors in the controller
 * this way (again) we can show a banner with some mapped errors
 */