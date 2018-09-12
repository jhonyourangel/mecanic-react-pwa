import db from './dexie-db'

export const addVehicle = (vehicle) => db.table('vehicle').add(vehicle)
export const editVehicle = (vehicle) => db.table('vehicle').add(vehicle) // add({}) === upsert
export const getAllVehicles = () => db.table('vehicle').toArray()
export const getVehicle = (plateNumber) => db.table('vehicle').get({plateNumber: plateNumber})


// db.table('vehicle').get({plateNumber: "SV10RCB"}).then(console.log).catch(console.log)