import db from './dexie-db'

export const addMaintenance = (maintenance) => db.table('maintenance').add(maintenance)
export const editMaintenance = addMaintenance(maintenance) // dexie does not have a edit document, add is basicaly and upsert document
export const getAllMaintenances = () => db.table('maintenance').toArray()

