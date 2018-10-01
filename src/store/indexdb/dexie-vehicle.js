import db from './dexie-db'

const TABLE_NAME = 'vehicle'

export const addVehicle = (vehicle) => db.table(TABLE_NAME).add(vehicle)
export const getAllVehicles = () => db.table(TABLE_NAME).toArray()
export const getVehicle = (plateNumber) => db.table(TABLE_NAME).get({plateNumber: plateNumber})
export const deleteVehicle = (plateNumber) => db.table(TABLE_NAME).delete({plateNumber: plateNumber})

export const editVehicle = (vehicle) => { 
    return db.vehicle
    .where('plateNumber')
    .equals(vehicle.plateNumber)
    .modify({...vehicle})
} 

/**
 * this will edit the Vehicle, setting the sync property
 * to 'delete'
 * when sync with backend, and the backend returns
 * positive response then we will also delete it
 * @param {vehicle: Vehicle} vehicle 
 */
export const setDeleteSync = (vehicle) => { 
    return db.vehicle
    .where('plateNumber')
    .equals(vehicle.plateNumber)
    .modify({...vehicle})
} 
