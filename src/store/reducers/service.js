
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    services: [],
    service: {},
    loading: false,
};

const newServiceStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const newServiceSuccess = ( state, action ) => {
    const newService = updateObject( action.serviceData, { id: state.services.length } );
    state.services.unshift( newService ) 
    return updateObject( state, {
        loading: false,
        purchased: true,
        services: state.services
    } );
};

const newServiceFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/************************* EDIT */

const editServiceStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const editServiceSuccess = ( state, action ) => {
    const editService = action.serviceData
    
    let list = [...state.services]
    const index = list.findIndex(item => item._id === editService._id)
    list.splice(index, 1, editService ) 

    return updateObject( state, {
        loading: false,
        purchased: true,
        services: list,
        service: editService
    } );
};

const editServiceFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/*********************** DELETE */

const deleteServiceStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const deleteServiceSuccess = ( state, action ) => {
    const deleteService = {...action.serviceData}
    
    let list = [...state.services]
    const index = list.findIndex(item => item._id === deleteService._id)
    list.splice(index, 1 ) 
    return updateObject( state, {
        loading: false,
        services: list,
        service: deleteService
    } );
};

const deleteServiceFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/******************* FETCH all  */


const fetchServicesStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const fetchServicesSuccess = ( state, action ) => {
    return updateObject( state, {
        services: action.services,
        loading: false
    } );
};

const fetchServicesFail = ( state ) => {
    return updateObject( state, { loading: false } );
};


/******************* FETCH by plate number  */
const fetchServiceStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const fetchServiceSuccess = ( state, action ) => {
    return updateObject( state, {
        service: action.service,
        loading: false
    } );
};

const fetchServiceFail = ( state ) => {
    return updateObject( state, { loading: false } );
};


/************** Export Js */
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.NEW_SERVICE_START: return newServiceStart( state, action );
        case actionTypes.NEW_SERVICE_SUCCESS: return newServiceSuccess( state, action )
        case actionTypes.NEW_SERVICE_FAIL: return newServiceFail( state, action );

        case actionTypes.EDIT_SERVICE_START: return editServiceStart( state, action );
        case actionTypes.EDIT_SERVICE_SUCCESS: return editServiceSuccess( state, action )
        case actionTypes.EDIT_SERVICE_FAIL: return editServiceFail( state, action );

        case actionTypes.DELETE_SERVICE_START: return deleteServiceStart( state, action );
        case actionTypes.DELETE_SERVICE_SUCCESS: return deleteServiceSuccess( state, action )
        case actionTypes.DELETE_SERVICE_FAIL: return deleteServiceFail( state, action );

        case actionTypes.FETCH_SERVICE_START: return fetchServiceStart( state, action );
        case actionTypes.FETCH_SERVICE_SUCCESS: return fetchServiceSuccess( state, action );
        case actionTypes.FETCH_SERVICE_FAIL: return fetchServiceFail( state, action );

        case actionTypes.FETCH_SERVICES_START: return fetchServicesStart( state, action );
        case actionTypes.FETCH_SERVICES_SUCCESS: return fetchServicesSuccess( state, action );
        case actionTypes.FETCH_SERVICES_FAIL: return fetchServicesFail( state, action );
        default: return state;
    }
};

export default reducer;