import * as actionTypes from './actionTypes';
import * as axiosMaintenance from '../../network/axios-maintenance';

export const newMaintenanceSuccess = ( id, maintenanceData ) => {
    return {
        type: actionTypes.NEW_MAINTENANCE_SUCCESS,
        maintenanceId: id,
        maintenanceData: maintenanceData,
    };
};

export const newMaintenanceFail = error => {
    return {
        type: actionTypes.NEW_MAINTENANCE_FAIL,
        error: error
    };
}

export const newMaintenanceStart = () => {
    return {
        type: actionTypes.NEW_MAINTENANCE_START
    };
};

export const newMaintenance = ( maintenanceData ) => {
    return async dispatch => {
        dispatch( newMaintenanceStart() );
        try {
            const res = await axiosMaintenance.pushNewMaintenanceToServer(maintenanceData)
            dispatch( newMaintenanceSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( newMaintenanceFail( error ) );
        }        
    };
};

export const newMaintenanceInit = () => {
    return {
        type: actionTypes.NEW_MAINTENANCE_INIT
    };
};

/******************************** FETCH */

export const fetchMaintenancesSuccess = ( maintenances ) => {    
    return {
        type: actionTypes.FETCH_MAINTENANCES_SUCCESS,
        maintenances: maintenances
    };
};

export const fetchMaintenancesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_MAINTENANCES_FAIL,
        error: error
    };
};

export const fetchMaintenancesStart = () => {
    return {
        type: actionTypes.FETCH_MAINTENANCES_START
    };
};

export const fetchMaintenances = () => {
    
    return async dispatch => {
        dispatch(fetchMaintenancesStart());
        try {     
            const res = await axiosMaintenance.fetchMaintenancesFromServer()
            dispatch(fetchMaintenancesSuccess(res.data));
        } catch (error) {
            fetchMaintenancesFail(error)
        }
    };
};

/******************************** FETCH */

export const fetchMaintenanceSuccess = ( maintenance ) => {    
    return {
        type: actionTypes.FETCH_MAINTENANCE_SUCCESS,
        maintenance: maintenance
    };
};

export const fetchMaintenanceFail = ( error ) => {
    return {  
        type: actionTypes.FETCH_MAINTENANCE_FAIL,
        error: error
    };
};

export const fetchMaintenanceStart = () => {
    return {
        type: actionTypes.FETCH_MAINTENANCE_START
    };
};

export const fetchMaintenance = (plateNumber) => {
    return async dispatch => {
        try {
            dispatch(fetchMaintenanceStart());
            const res = await axiosMaintenance.getMaintenance(plateNumber)
            dispatch(fetchMaintenanceSuccess(res.data[0] || {})) // just send an empty object, this will avoid crushing app
        } catch (error) {
            fetchMaintenanceFail(error)
        }
    };
};

/****************************** EDIT */

export const editMaintenanceSuccess = ( id, maintenanceData ) => {
    return {
        type: actionTypes.EDIT_MAINTENANCE_SUCCESS,
        maintenanceId: id,
        maintenanceData: maintenanceData,
    };
};

export const editMaintenanceFail = ( error ) => {
    return {
        type: actionTypes.EDIT_MAINTENANCE_FAIL,
        error: error
    };
}

export const editMaintenanceStart = () => {
    return {
        type: actionTypes.EDIT_MAINTENANCE_START
    };
};

export const editMaintenance = ( maintenanceData ) => {
    return async dispatch => {
        dispatch( editMaintenanceStart() );
        try {
            const res = await axiosMaintenance.editMaintenance(maintenanceData)
            dispatch( editMaintenanceSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( editMaintenanceFail( error ) );
        }
    };
};

/********************* DELETE */

export const deleteMaintenanceSuccess = ( id, maintenanceData ) => {
    return {
        type: actionTypes.DELETE_MAINTENANCE_SUCCESS,
        maintenanceId: id,
        maintenanceData: maintenanceData,
    };
};

export const deleteMaintenanceFail = ( error ) => {
    return {
        type: actionTypes.DELETE_MAINTENANCE_FAIL,
        error: error
    };
}

export const deleteMaintenanceStart = () => {
    return {
        type: actionTypes.DELETE_MAINTENANCE_START
    };
};

export const deleteMaintenance = ( maintenanceData ) => {

    return async dispatch => {
        dispatch( deleteMaintenanceStart() );
        try {
            const res = await axiosMaintenance.deleteMaintenance(maintenanceData)
            dispatch( deleteMaintenanceSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( deleteMaintenanceFail( error ));
        }
    };
};
