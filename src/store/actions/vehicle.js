import * as actionTypes from './actionTypes';
import * as axiosVehicle from '../../network/axios-vehicle';

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
    return async dispatch => {
        dispatch( newVehicleStart() );
        try {
            const res = await axiosVehicle.pushNewVehicleToServer(vehicleData)
            dispatch( newVehicleSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( newVehicleFail( error ) );
        }        
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
        try {     
            const vehicles = await axiosVehicle.fetchVehiclesFromServer()
            dispatch(fetchVehiclesSuccess(vehicles));
        } catch (error) {
            fetchVehiclesFail(error)
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
    return async dispatch => {
        try {
            dispatch(fetchVehicleStart());
            const vehicle = await axiosVehicle.getVehicle(plateNumber)
            dispatch(fetchVehicleSuccess(vehicle || {})) // just send an empty object, this will avoid crushing app
        } catch (error) {
            fetchVehicleFail(error)
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
    return async dispatch => {
        dispatch( editVehicleStart() );
        try {
            const res = await axiosVehicle.editVehicle(vehicleData)
            dispatch( editVehicleSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( editVehicleFail( error ) );
        }
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

    return async dispatch => {
        dispatch( deleteVehicleStart() );
        try {
            const res = await axiosVehicle.deleteVehicle(vehicleData)
            dispatch( deleteVehicleSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( deleteVehicleFail( error ));
        }
    };
};


