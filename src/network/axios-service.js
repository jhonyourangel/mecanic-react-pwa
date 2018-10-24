import axios from './axios'
const SERVICE_URL = '/service'
export const fetchServicesFromServer = async () => {
    return await axios.get(SERVICE_URL)
}

export const getService = async identifier => {
    return await axios.get(`${SERVICE_URL}/${identifier}`)
}

export const pushNewServiceToServer = async (Service) => {
    return await axios.post(SERVICE_URL, Service)
}

export const editService = async (Service) => {
    return await axios.put(SERVICE_URL, Service)
} 

export const deleteService = async (Service) => {
    return await axios.delete(SERVICE_URL + '?_id=' + Service._id)
}

/**
 * this structure is correct
 * the return promise is what we want 
 * this way we will handle the errors in the controller
 * this way (again) we can show a banner with some mapped errors
 */