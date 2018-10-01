
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    maintenances: [],
    maintenance: {},
    loading: false,
};

const newMaintenanceStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const newMaintenanceSuccess = ( state, action ) => {
    const newMaintenance = updateObject( action.maintenanceData, { id: state.maintenances.length } );
    state.maintenances.unshift( newMaintenance ) 
    return updateObject( state, {
        loading: false,
        purchased: true,
        maintenances: state.maintenances
    } );
};

const newMaintenanceFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/************************* EDIT */

const editMaintenanceStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const editMaintenanceSuccess = ( state, action ) => {
    const editMaintenance = action.maintenanceData
    
    let list = [...state.maintenances]
    const index = list.findIndex(item => item._id === editMaintenance._id)
    list.splice(index, 1, editMaintenance ) 

    return updateObject( state, {
        loading: false,
        purchased: true,
        maintenances: list,
        maintenance: editMaintenance
    } );
};

const editMaintenanceFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/*********************** DELETE */

const deleteMaintenanceStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const deleteMaintenanceSuccess = ( state, action ) => {
    const deleteMaintenance = {...action.maintenanceData}
    
    let list = [...state.maintenances]
    const index = list.findIndex(item => item._id === deleteMaintenance._id)
    
    console.log("before splice",list.length);
    list.splice(index, 1 ) 
    console.log("after splice",list.length);

    return updateObject( state, {
        loading: false,
        maintenances: list,
        maintenance: deleteMaintenance
    } );
};

const deleteMaintenanceFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/******************* FETCH all  */


const fetchMaintenancesStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const fetchMaintenancesSuccess = ( state, action ) => {
    return updateObject( state, {
        maintenances: action.maintenances,
        loading: false
    } );
};

const fetchMaintenancesFail = ( state ) => {
    return updateObject( state, { loading: false } );
};


/******************* FETCH by plate number  */
const fetchMaintenanceStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const fetchMaintenanceSuccess = ( state, action ) => {
    return updateObject( state, {
        maintenance: action.maintenance,
        loading: false
    } );
};

const fetchMaintenanceFail = ( state ) => {
    return updateObject( state, { loading: false } );
};


/************** Export Js */
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.NEW_MAINTENANCE_START: return newMaintenanceStart( state, action );
        case actionTypes.NEW_MAINTENANCE_SUCCESS: return newMaintenanceSuccess( state, action )
        case actionTypes.NEW_MAINTENANCE_FAIL: return newMaintenanceFail( state, action );

        case actionTypes.EDIT_MAINTENANCE_START: return editMaintenanceStart( state, action );
        case actionTypes.EDIT_MAINTENANCE_SUCCESS: return editMaintenanceSuccess( state, action )
        case actionTypes.EDIT_MAINTENANCE_FAIL: return editMaintenanceFail( state, action );

        case actionTypes.DELETE_MAINTENANCE_START: return deleteMaintenanceStart( state, action );
        case actionTypes.DELETE_MAINTENANCE_SUCCESS: return deleteMaintenanceSuccess( state, action )
        case actionTypes.DELETE_MAINTENANCE_FAIL: return deleteMaintenanceFail( state, action );

        case actionTypes.FETCH_MAINTENANCE_START: return fetchMaintenanceStart( state, action );
        case actionTypes.FETCH_MAINTENANCE_SUCCESS: return fetchMaintenanceSuccess( state, action );
        case actionTypes.FETCH_MAINTENANCE_FAIL: return fetchMaintenanceFail( state, action );

        case actionTypes.FETCH_MAINTENANCES_START: return fetchMaintenancesStart( state, action );
        case actionTypes.FETCH_MAINTENANCES_SUCCESS: return fetchMaintenancesSuccess( state, action );
        case actionTypes.FETCH_MAINTENANCES_FAIL: return fetchMaintenancesFail( state, action );
        default: return state;
    }
};

export default reducer;