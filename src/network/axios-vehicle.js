import axios from './axios'
// import errorHandler from './error-handler'
// import * as indexDB from '../store/indexdb/vehicle'
const VEHICLE_URL = '/vehicle'
export const fetchVehiclesFromServer = async () => {
    return await axios.get(VEHICLE_URL)
}

export const pushNewVehicleToServer = async (vehicle) => {
    return await axios.post(VEHICLE_URL, vehicle)
}

export const editVehicle = async (vehicle) => {
    return await axios.put(VEHICLE_URL, vehicle)
} 

export const deleteVehicle = async (vehicle) => {
    return await axios.delete(VEHICLE_URL + '?id=' + vehicle._id)
}