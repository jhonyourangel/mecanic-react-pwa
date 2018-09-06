import * as actionTypes from './actionTypes';
import axios from '../../network/axios';

export const newProjectSuccess = ( id, projectData ) => {
    return {
        type: actionTypes.NEW_PROJECT_SUCCESS,
        projectId: id,
        projectData: projectData,
    };
};

export const newProjectFail = ( error ) => {
    return {
        type: actionTypes.NEW_PROJECT_FAIL,
        error: error
    };
}

export const newProjectStart = () => {
    return {
        type: actionTypes.NEW_PROJECT_START
    };
};

export const newProject = ( projectData ) => {
    return dispatch => {
        dispatch( newProjectStart() );
        axios.post( '/addproject', projectData)
            .then( response => {
                dispatch( newProjectSuccess( response.data.name, projectData ) );
            })
            .catch( error => {
                console.log("project fail :", error)
                dispatch( newProjectFail( error ) );
            } );
    };
};

/******************************** FETCH */

export const fetchProjectsSuccess = ( projects ) => {    
    return {
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        projects: projects
    };
};

export const fetchProjectsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PROJECTS_FAIL,
        error: error
    };
};

export const fetchProjectsStart = () => {
    return {
        type: actionTypes.FETCH_PROJECTS_START
    };
};

export const fetchProjects = () => {
    return dispatch => {
        dispatch(fetchProjectsStart());
        // const queryParams = '?auth=' + token + '&projectBy="userId"&equalTo="' + userId + '"';
        axios.get( '/projects')
            .then( res => {
                
                const fetchProjects = res.data
                .map((item, index) => { 
                    return {
                        ...item,
                        id: index
                    }});
                // idb.saveProjects(fetchProjects)
                dispatch(fetchProjectsSuccess(fetchProjects));
            } )
            .catch( err => {
                dispatch(fetchProjectsFail(err));
            } );
    };
};


/****************************** EDIT */

export const editProjectSuccess = ( id, projectData ) => {
    return {
        type: actionTypes.EDIT_PROJECT_SUCCESS,
        projectId: id,
        projectData: projectData,
    };
};

export const editProjectFail = ( error ) => {
    return {
        type: actionTypes.EDIT_PROJECT_FAIL,
        error: error
    };
}

export const editProjectStart = () => {
    return {
        type: actionTypes.EDIT_PROJECT_START
    };
};

export const editProject = ( projectData ) => {
    const editedProj = {
        ...projectData
    }
    delete editedProj.id
    return dispatch => {
        dispatch( editProjectStart() );
        console.log(editedProj, projectData)
        axios.put( '/editproject', editedProj)
            .then( response => {
                dispatch( editProjectSuccess( response.data.name, projectData ) );
            })
            .catch( error => {
                console.log("project fail :", error)
                dispatch( newProjectFail( error ) );
            } );
    };
};

/********************* DELETE */

export const deleteProjectSuccess = ( id, projectData ) => {
    return {
        type: actionTypes.DELETE_PROJECT_SUCCESS,
        projectId: id,
        projectData: projectData,
    };
};

export const deleteProjectFail = ( error ) => {
    return {
        type: actionTypes.DELETE_PROJECT_FAIL,
        error: error
    };
}

export const deleteProjectStart = () => {
    return {
        type: actionTypes.DELETE_PROJECT_START
    };
};

export const deleteProject = ( projectData ) => {
    const editedProj = {
        ...projectData
    }
    return dispatch => {
        dispatch( deleteProjectStart() );

        axios.delete( '/deleteproject?id=' + editedProj._id)
            .then( response => {
                dispatch( deleteProjectSuccess( response.data.name, projectData ) );
            })
            .catch( error => {
                console.log("delete project fail :", error)
                dispatch( newProjectFail( error ) );
            } );
    };
};


