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
        // axios.post( '/addvehicle', vehicleData)
        //     .then( response => {
        //         dispatch( newVehicleSuccess( response.data.name, vehicleData ) );
        //     })
        //     .catch( error => {
        //         console.log("vehicle fail :", error)
        //         dispatch( newVehicleFail( error ) );
        //     } );
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
        dispatch(fetchVehiclesStart());
        const vehicles = await dexieVehicle.getAllVehicles()
        dispatch(fetchVehiclesSuccess(vehicles));
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
    
    return async dispatch => {
        dispatch(fetchVehicleStart());
        const vehicle = await dexieVehicle.getVehicle(plateNumber)
        dispatch(fetchVehicleSuccess(vehicle));
    };
};

/****************************** EDIT */

export const editvehicleSuccess = ( id, vehicleData ) => {
    return {
        type: actionTypes.EDIT_VEHICLE_SUCCESS,
        vehicleId: id,
        vehicleData: vehicleData,
    };
};

export const editvehicleFail = ( error ) => {
    return {
        type: actionTypes.EDIT_VEHICLE_FAIL,
        error: error
    };
}

export const editvehicleStart = () => {
    return {
        type: actionTypes.EDIT_VEHICLE_START
    };
};

export const editvehicle = ( vehicleData ) => {
    const editedVeh = {
        ...vehicleData
    }
    delete editedVeh.id
    return dispatch => {
        dispatch( editvehicleStart() );
        console.log(editedVeh, vehicleData)
        // axios.put( '/editvehicle', editedVeh)
        //     .then( response => {
        //         dispatch( editvehicleSuccess( response.data.name, vehicleData ) );
        //     })
        //     .catch( error => {
        //         console.log("vehicle fail :", error)
        //         dispatch( newVehicleFail( error ) );
        //     } );
    };
};

/********************* DELETE */

export const deletevehicleSuccess = ( id, vehicleData ) => {
    return {
        type: actionTypes.DELETE_VEHICLE_SUCCESS,
        vehicleId: id,
        vehicleData: vehicleData,
    };
};

export const deletevehicleFail = ( error ) => {
    return {
        type: actionTypes.DELETE_VEHICLE_FAIL,
        error: error
    };
}

export const deletevehicleStart = () => {
    return {
        type: actionTypes.DELETE_VEHICLE_START
    };
};

export const deletevehicle = ( vehicleData ) => {
    const editedVeh = {
        ...vehicleData
    }
    return dispatch => {
        dispatch( deletevehicleStart() );

        // axios.delete( '/deletevehicle?id=' + editedVeh._id)
        //     .then( response => {
        //         dispatch( deletevehicleSuccess( response.data.name, vehicleData ) );
        //     })
        //     .catch( error => {
        //         console.log("vehicle fail :", error)
        //         dispatch( newVehicleFail( error ) );
        //     } );
    };
};


