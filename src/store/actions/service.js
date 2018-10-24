import * as actionTypes from './actionTypes';
import * as axiosService from '../../network/axios-service';

export const newServiceSuccess = ( id, serviceData ) => {
    return {
        type: actionTypes.NEW_SERVICE_SUCCESS,
        serviceId: id,
        serviceData: serviceData,
    };
};

export const newServiceFail = error => {
    return {
        type: actionTypes.NEW_SERVICE_FAIL,
        error: error
    };
}

export const newServiceStart = () => {
    return {
        type: actionTypes.NEW_SERVICE_START
    };
};

export const newService = ( serviceData ) => {
    return async dispatch => {
        dispatch( newServiceStart() );
        try {
            const res = await axiosService.pushNewServiceToServer(serviceData)
            dispatch( newServiceSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( newServiceFail( error ) );
        }        
    };
};

export const newServiceInit = () => {
    return {
        type: actionTypes.NEW_SERVICE_INIT
    };
};

/******************************** FETCH */

export const fetchServicesSuccess = ( services ) => {    
    return {
        type: actionTypes.FETCH_SERVICES_SUCCESS,
        services: services
    };
};

export const fetchServicesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_SERVICES_FAIL,
        error: error
    };
};

export const fetchServicesStart = () => {
    return {
        type: actionTypes.FETCH_SERVICES_START
    };
};

export const fetchServices = () => {
    
    return async dispatch => {
        dispatch(fetchServicesStart());
        try {     
            const res = await axiosService.fetchServicesFromServer()
            dispatch(fetchServicesSuccess(res.data));
        } catch (error) {
            fetchServicesFail(error)
        }
    };
};

/******************************** FETCH */

export const fetchServiceSuccess = ( service ) => {    
    return {
        type: actionTypes.FETCH_SERVICE_SUCCESS,
        service: service
    };
};

export const fetchServiceFail = ( error ) => {
    return {  
        type: actionTypes.FETCH_SERVICE_FAIL,
        error: error
    };
};

export const fetchServiceStart = () => {
    return {
        type: actionTypes.FETCH_SERVICE_START
    };
};

export const fetchService = (plateNumber) => {
    return async dispatch => {
        try {
            dispatch(fetchServiceStart());
            const res = await axiosService.getService(plateNumber)
            dispatch(fetchServiceSuccess(res.data[0] || {})) // just send an empty object, this will avoid crushing app
        } catch (error) {
            fetchServiceFail(error)
        }
    };
};

/****************************** EDIT */

export const editServiceSuccess = ( id, serviceData ) => {
    return {
        type: actionTypes.EDIT_SERVICE_SUCCESS,
        serviceId: id,
        serviceData: serviceData,
    };
};

export const editServiceFail = ( error ) => {
    return {
        type: actionTypes.EDIT_SERVICE_FAIL,
        error: error
    };
}

export const editServiceStart = () => {
    return {
        type: actionTypes.EDIT_SERVICE_START
    };
};

export const editService = ( serviceData ) => {
    return async dispatch => {
        dispatch( editServiceStart() );
        try {
            const res = await axiosService.editService(serviceData)
            dispatch( editServiceSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( editServiceFail( error ) );
        }
    };
};

/********************* DELETE */

export const deleteServiceSuccess = ( id, serviceData ) => {
    return {
        type: actionTypes.DELETE_SERVICE_SUCCESS,
        serviceId: id,
        serviceData: serviceData,
    };
};

export const deleteServiceFail = ( error ) => {
    return {
        type: actionTypes.DELETE_SERVICE_FAIL,
        error: error
    };
}

export const deleteServiceStart = () => {
    return {
        type: actionTypes.DELETE_SERVICE_START
    };
};

export const deleteService = ( serviceData ) => {

    return async dispatch => {
        dispatch( deleteServiceStart() );
        try {
            const res = await axiosService.deleteService(serviceData)
            dispatch( deleteServiceSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( deleteServiceFail( error ));
        }
    };
};
