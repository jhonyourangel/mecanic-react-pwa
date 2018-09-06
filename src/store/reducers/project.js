import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    projects: [],
    loading: false,
};

const newProjectStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const newProjectSuccess = ( state, action ) => {
    const newProject = updateObject( action.projectData, { id: state.projects.length } );
    state.projects.unshift( newProject ) 
    return updateObject( state, {
        loading: false,
        purchased: true,
        projects: state.projects
    } );
};

const newProjectFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

/************************* EDIT */

const editProjectStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const editProjectSuccess = ( state, action ) => {
    const editProject = action.projectData
    
    let projsArray = [...state.projects]
    const index = projsArray.findIndex(proj => proj._id === editProject._id)
    projsArray.splice(index, 1, editProject ) 

    return updateObject( state, {
        loading: false,
        purchased: true,
        projects: projsArray
    } );
};

const editProjectFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

/*********************** DELETE */

const deleteProjectStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const deleteProjectSuccess = ( state, action ) => {
    const deleteProject = action.projectData
    
    let projsArray = [...state.projects]
    const index = projsArray.findIndex(proj => proj._id === deleteProject._id)
    projsArray.splice(index, 1 ) 

    return updateObject( state, {
        loading: false,
        purchased: true,
        projects: projsArray
    } );
};

const deleteProjectFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

/******************* FETCH  */


const fetchProjectsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchProjectsSuccess = ( state, action ) => {
    return updateObject( state, {
        projects: action.projects,
        loading: false
    } );
};

const fetchProjectsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.NEW_PROJECT_START: return newProjectStart( state, action );
        case actionTypes.NEW_PROJECT_SUCCESS: return newProjectSuccess( state, action )
        case actionTypes.NEW_PROJECT_FAIL: return newProjectFail( state, action );

        case actionTypes.EDIT_PROJECT_START: return editProjectStart( state, action );
        case actionTypes.EDIT_PROJECT_SUCCESS: return editProjectSuccess( state, action )
        case actionTypes.EDIT_PROJECT_FAIL: return editProjectFail( state, action );

        case actionTypes.DELETE_PROJECT_START: return deleteProjectStart( state, action );
        case actionTypes.DELETE_PROJECT_SUCCESS: return deleteProjectSuccess( state, action )
        case actionTypes.DELETE_PROJECT_FAIL: return deleteProjectFail( state, action );

        case actionTypes.FETCH_PROJECTS_START: return fetchProjectsStart( state, action );
        case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess( state, action );
        case actionTypes.FETCH_PROJECTS_FAIL: return fetchProjectsFail( state, action );
        default: return state;
    }
};

export default reducer;