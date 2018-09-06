import idb from 'idb';


const dbPromise = idb.open('mecanic', 1, upgradeDB => {
    let vehicleStore = upgradeDB.createObjectStore('vehicle', {
        keyPath: 'plateNumber'
    })
    vehicleStore.createIndex('syncStatus', 'syncStatus')
})

// this does an upsert 
// so no need to create an edit vehicle method
export const createVehicle = (vehicle, index) => {
    return dbPromise.then(db => {
        const tx = db.transaction('vehicle', 'readwrite');

        if (index < 5) {
            vehicle.syncStatus = 'new'
        } else if (index < 10) {
            vehicle.syncStatus = 'edit'
        } else if (index < 15) {
            vehicle.syncStatus = 'delete'
        } else {
            vehicle.syncStatus = undefined
        }

        tx.objectStore('vehicle').put({ ...vehicle,
            syncStatus: vehicle.syncStatus || 'synced'
        });
        return tx.complete;
    })
}

export const getAllVehicle = (filterValue) => {
    return dbPromise.then(db => {
        const syncStatusIndex = db.transaction('vehicle', 'readwrite')
            .objectStore('vehicle').index('syncStatus')
            return syncStatusIndex.getAll(filterValue === '' ? undefined : filterValue )
        })
}