import * as actionTypes from './actionTypes';


export const dateStart = (dateStart) => {
    return {
        type: actionTypes.DATE_START,
        dateStart: dateStart
    }
}

export const dateEnd = (dateEnd) => {
    return {
        type: actionTypes.DATE_END,
        dateEnd: dateEnd
    }
}

export const genericDateRangeSelector = (ACTION_TYPE) => {
    return {
        type: ACTION_TYPE
    }
}

export const dateLast7Days = (dateLast7Days) => {
    return {
        type: actionTypes.DATE_LAST_7_DAYS,
        // dateLast7Days: dateLast7Days
    }
}

export const dateLast14Days = (dateLast14Days) => {
    return {
        type: actionTypes.DATE_LAST_14_DAYS,
        // dateLast14Days: dateLast14Days
    }
}

export const dateLast1Month = (dateLast1Month) => {
    return {
        type: actionTypes.DATE_LAST_1_MONTH,
        // dateLast1Month: dateLast1Month
    }
}

export const dateLast3Month = (dateLast3Month) => {
    return {
        type: actionTypes.DATE_LAST_3_MONTH,
        // dateLast3Month: dateLast3Month
    }
}

export const dateLast6Month = (dateLast6Month) => {
    return {
        type: actionTypes.DATE_LAST_6_MONTH,
        // dateLast6Month: dateLast6Month
    }
}

export const dateLast1Year = (dateLast1Year) => {
    return {
        type: actionTypes.DATE_LAST_1_YEAR,
        // dateLast1Year: dateLast1Year
    }
}

export const dateAllTime = (dateAllTime) => {
    return {
        type: actionTypes.DATE_ALL_TIME,
        // dateAllTime: dateAllTime
    }
}

