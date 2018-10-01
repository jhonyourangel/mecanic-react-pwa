import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    vehicles: [],
    vehicle: {},
    loading: false,
};

const newVehicleStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const newVehicleSuccess = ( state, action ) => {
    const newVehicle = updateObject( action.vehicleData, { id: state.vehicles.length } );
    state.vehicles.unshift( newVehicle ) 
    return updateObject( state, {
        loading: false,
        purchased: true,
        vehicles: state.vehicles
    } );
};

const newVehicleFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/************************* EDIT */

const editVehicleStart = ( state) => {
    return updateObject( state, { loading: true } );
};

const editVehicleSuccess = ( state, action ) => {
    const editVehicle = action.vehicleData
    
    let list = [...state.vehicles]
    const index = list.findIndex(item => item._id === editVehicle._id)
    list.splice(index, 1, editVehicle ) 

    return updateObject( state, {
        loading: false,
        purchased: true,
        vehicles: list,
        vehicle: editVehicle
    } );
};

const editVehicleFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/*********************** DELETE */

const deleteVehicleStart = ( state) => {
    return updateObject( state, { loading: true } );
};

const deleteVehicleSuccess = ( state, action ) => {
    const deleteVehicle = {...action.vehicleData}
    
    let list = [...state.vehicles]
    const index = list.findIndex(item => item._id === deleteVehicle._id)
    
    console.log("before splice",list.length);
    list.splice(index, 1 ) 
    console.log("after splice",list.length);

    return updateObject( state, {
        loading: false,
        vehicles: list,
        vehicle: deleteVehicle
    } );
};

const deleteVehicleFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/******************* FETCH all  */


const fetchVehiclesStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const fetchVehiclesSuccess = ( state, action ) => {
    return updateObject( state, {
        vehicles: action.vehicles,
        loading: false
    } );
};

const fetchVehiclesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


/******************* FETCH by plate number  */
const fetchVehicleStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchVehicleSuccess = ( state, action ) => {
    return updateObject( state, {
        vehicle: action.vehicle,
        loading: false
    } );
};

const fetchVehicleFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


/************** Export Js */
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.NEW_VEHICLE_START: return newVehicleStart( state, action );
        case actionTypes.NEW_VEHICLE_SUCCESS: return newVehicleSuccess( state, action )
        case actionTypes.NEW_VEHICLE_FAIL: return newVehicleFail( state, action );

        case actionTypes.EDIT_VEHICLE_START: return editVehicleStart( state, action );
        case actionTypes.EDIT_VEHICLE_SUCCESS: return editVehicleSuccess( state, action )
        case actionTypes.EDIT_VEHICLE_FAIL: return editVehicleFail( state, action );

        case actionTypes.DELETE_VEHICLE_START: return deleteVehicleStart( state, action );
        case actionTypes.DELETE_VEHICLE_SUCCESS: return deleteVehicleSuccess( state, action )
        case actionTypes.DELETE_VEHICLE_FAIL: return deleteVehicleFail( state, action );

        case actionTypes.FETCH_VEHICLE_START: return fetchVehicleStart( state, action );
        case actionTypes.FETCH_VEHICLE_SUCCESS: return fetchVehicleSuccess( state, action );
        case actionTypes.FETCH_VEHICLE_FAIL: return fetchVehicleFail( state, action );

        case actionTypes.FETCH_VEHICLES_START: return fetchVehiclesStart( state, action );
        case actionTypes.FETCH_VEHICLES_SUCCESS: return fetchVehiclesSuccess( state, action );
        case actionTypes.FETCH_VEHICLES_FAIL: return fetchVehiclesFail( state, action );
        default: return state;
    }
};

export default reducer;