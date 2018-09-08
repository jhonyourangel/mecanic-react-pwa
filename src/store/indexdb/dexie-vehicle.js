import db from './dexie-db'

export const addVehicle = (vehicle) => db.table('vehicle').add(vehicle)
export const editVehicle = (vehicle) => db.table('vehicle').add(vehicle) // add({}) === upsert
export const getAllVehicles = () => db.table('vehicle').toArray()

