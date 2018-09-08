import axios from './axios'
const MAINTENANCE_URL = '/maintenance'
export const fetchMaintenancesFromServer = async () => {
    return await axios.get(MAINTENANCE_URL)
}

export const pushNewMaintenanceToServer = async (Maintenance) => {
    return await axios.post(MAINTENANCE_URL, Maintenance)
}

export const editMaintenance = async (Maintenance) => {
    return await axios.put(MAINTENANCE_URL, Maintenance)
} 

export const deleteMaintenance = async (Maintenance) => {
    return await axios.delete(MAINTENANCE_URL + '?id=' + Maintenance._id)
}

/**
 * this structure is correct
 * the return promise is what we want 
 * this way we will handle the errors in the controller
 * this way (again) we can show a banner with some mapped errors
 */