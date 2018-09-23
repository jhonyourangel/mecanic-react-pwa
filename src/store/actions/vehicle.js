import * as actionTypes from './actionTypes';
import * as dexieVehicle from '../indexdb/dexie-vehicle'

export const newVehicleSuccess = ( id, vehicleData ) => {
    return {
        type: actionTypes.NEW_VEHICLE_SUCCESS,
        vehicleId: id,
        vehicleData: vehicleData,
    };
};

export const newVehicleFail = error => {
    return {
        type: actionTypes.NEW_VEHICLE_FAIL,
        error: error
    };
}

export const newVehicleStart = () => {
    return {
        type: actionTypes.NEW_VEHICLE_START
    };
};

export const newVehicle = ( vehicleData ) => {
    return dispatch => {
        dispatch( newVehicleStart() );
        dexieVehicle.addVehicle(vehicleData)
        .then( response => {
            console.log(response);
            dispatch( newVehicleSuccess( vehicleData.plateNumber, vehicleData ) );
        })
        .catch( error => {
            console.log("vehicle fail :", error)
            dispatch( newVehicleFail( error ) );
        } );
    };
};

export const newVehicleInit = () => {
    return {
        type: actionTypes.NEW_VEHICLE_INIT
    };
};

/******************************** FETCH */

export const fetchVehiclesSuccess = ( vehicles ) => {    
    return {
        type: actionTypes.FETCH_VEHICLES_SUCCESS,
        vehicles: vehicles
    };
};

export const fetchVehiclesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_VEHICLES_FAIL,
        error: error
    };
};

export const fetchVehiclesStart = () => {
    return {
        type: actionTypes.FETCH_VEHICLES_START
    };
};

export const fetchVehicles = () => {
    
    return async dispatch => {
        try {     
            dispatch(fetchVehiclesStart());
            const vehicles = await dexieVehicle.getAllVehicles()
            dispatch(fetchVehiclesSuccess(vehicles));
        } catch (error) {
            console.log(error)
        }
    };
};

/******************************** FETCH */

export const fetchVehicleSuccess = ( vehicle ) => {    
    return {
        type: actionTypes.FETCH_VEHICLE_SUCCESS,
        vehicle: vehicle
    };
};

export const fetchVehicleFail = ( error ) => {
    return {  
        type: actionTypes.FETCH_VEHICLE_FAIL,
        error: error
    };
};

export const fetchVehicleStart = () => {
    return {
        type: actionTypes.FETCH_VEHICLE_START
    };
};

export const fetchVehicle = (plateNumber) => {
    console.log('fetchVehicle:', plateNumber)
    return async dispatch => {
        try {
            dispatch(fetchVehicleStart());
            const vehicle = await dexieVehicle.getVehicle(plateNumber)
            dispatch(fetchVehicleSuccess(vehicle || {})) // just send an empty object, this will avoid crushing app
        } catch (error) {
            console.log(error);   
        }
    };
};

/****************************** EDIT */

export const editVehicleSuccess = ( id, vehicleData ) => {
    return {
        type: actionTypes.EDIT_VEHICLE_SUCCESS,
        vehicleId: id,
        vehicleData: vehicleData,
    };
};

export const editVehicleFail = ( error ) => {
    return {
        type: actionTypes.EDIT_VEHICLE_FAIL,
        error: error
    };
}

export const editVehicleStart = () => {
    return {
        type: actionTypes.EDIT_VEHICLE_START
    };
};

export const editVehicle = ( vehicleData ) => {

    return dispatch => {
        dispatch( editVehicleStart() );
        dexieVehicle.editVehicle(vehicleData)
            .then( response => {
                console.log(response);
                dispatch( editVehicleSuccess( vehicleData.plateNumber, vehicleData ) );
            })
            .catch( error => {
                console.log("vehicle fail :", error)
                dispatch( editVehicleFail( error ) );
            } );
    };
};

/********************* DELETE */

export const deleteVehicleSuccess = ( id, vehicleData ) => {
    return {
        type: actionTypes.DELETE_VEHICLE_SUCCESS,
        vehicleId: id,
        vehicleData: vehicleData,
    };
};

export const deleteVehicleFail = ( error ) => {
    return {
        type: actionTypes.DELETE_VEHICLE_FAIL,
        error: error
    };
}

export const deleteVehicleStart = () => {
    return {
        type: actionTypes.DELETE_VEHICLE_START
    };
};

export const deleteVehicle = ( vehicleData ) => {

    return dispatch => {
        dispatch( deleteVehicleStart() );
        dexieVehicle.setDeleteSync(vehicleData)
        .then( response => {
            console.log(response);
            dispatch( deleteVehicleSuccess( vehicleData.plateNumber, vehicleData ) );
        })
        .catch( error => {
            console.log("vehicle fail :", error)
            dispatch( deleteVehicleFail( error ) );
        } );
    };
};


