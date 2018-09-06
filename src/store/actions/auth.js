// import axios from  '../../network/axios-auth'
import axios from  '../../network/axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => { 
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        };
        // 'http://192.168.1.220:8080/api/', 
        // 'https://personel.herokuapp.com/api/',
        let url = 'https://personel.herokuapp.com/api/register';
        if (!isSignup) {
            url = 'https://personel.herokuapp.com/api/login';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(Number(response.data.expiresIn));

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data._id);

                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                dispatch(authSuccess(response.data.token, response.data._id));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())));

                console.log("axios.defaults.headers:", axios.defaults.headers)
            })
            .catch(err => {
                console.log(err.response)
                if ( err.response === undefined ) {
                    dispatch(authFail(err));
                } else {
                    dispatch(authFail(err.response.data.error));
                }
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())));
            }   
        }
    };
};
