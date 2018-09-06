import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import moment from 'moment'

const initialState = {
    dateStart: moment().utc().subtract(1, 'days'),
    dataEnd: moment().utc()
}

const dateStart = (state, action) => {
    return updateObject(state, {dateStart: action.dateStart})
}

const dateEnd = (state, action) => {
    return updateObject(state, {dateEnd: action.dateEnd})
}

const last7Days = (state, action) => {
    return updateObject(state, {
        dateStart: moment().utc().subtract(7, 'days'),
        dataEnd: moment().utc()
    })
}

const last14Days = (state, action) => {
    return updateObject(state, {
        dateStart: moment().utc().subtract(14, 'days'),
        dataEnd: moment().utc()
    })
}

const last1Month = (state, action) => {
    return updateObject(state, {
        dateStart: moment().utc().subtract(1, 'months'),
        dataEnd: moment().utc()
    })
}

const last3Month = (state, action) => {
    return updateObject(state, {
        dateStart: moment().utc().subtract(3, 'months'),
        dataEnd: moment().utc()
    })
}

const last6Month = (state, action) => {
    return updateObject(state, {
        dateStart: moment().utc().subtract(6, 'months'),
        dataEnd: moment().utc()
    })
}

const last1Year = (state, action) => {
    return updateObject(state, {
        dateStart: moment().utc().subtract(1, 'years'),
        dataEnd: moment().utc()
    })
}

const allTime = (state, action) => {
    return updateObject(state, {
        dateStart: moment.utc('01/01/1970', 'DD/MM/YYYY'),
        dataEnd: moment().utc()
    })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.DATE_START: return dateStart(state, action);
        case actionTypes.DATE_END: return dateEnd(state, action);
        //Preset Date Range
        case actionTypes.DATE_LAST_7_DAYS: return last7Days(state, action);
        case actionTypes.DATE_LAST_14_DAYS: return last14Days(state, action);
        case actionTypes.DATE_LAST_1_MONTH: return last1Month(state, action);
        case actionTypes.DATE_LAST_3_MONTH: return last3Month(state, action);
        case actionTypes.DATE_LAST_6_MONTH: return last6Month(state, action);
        case actionTypes.DATE_LAST_1_YEAR: return last1Year(state, action);
        case actionTypes.DATE_ALL_TIME: return allTime(state, action);

        // default last 1 day
        default:
            return state;
    }
};

export default reducer;