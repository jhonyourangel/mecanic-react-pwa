import * as actionTypes from './actionTypes';
import axios from '../../network/axios';

export const newTransactionSuccess = ( id, transactionData ) => {
    return {
        type: actionTypes.NEW_TRANSACTION_SUCCESS,
        transactionId: id,
        transactionData: transactionData,
    };
};

export const newTransactionFail = ( error ) => {
    return {
        type: actionTypes.NEW_TRANSACTION_FAIL,
        error: error
    };
}

export const newTransactionStart = () => {
    return {
        type: actionTypes.NEW_TRANSACTION_START
    };
};

export const newTransaction = ( transactionData ) => {
    return dispatch => {
        dispatch( newTransactionStart() );
        axios.post( '/addtransaction', transactionData)
            .then( response => {
                dispatch( newTransactionSuccess( response.data.name, transactionData ) );
            })
            .catch( error => {
                console.log("transaction fail :", error)
                dispatch( newTransactionFail( error ) );
            } );
    };
};

export const newTransactionInit = () => {
    return {
        type: actionTypes.NEW_TRANSACTION_INIT
    };
};

/******************************** FETCH */

export const fetchTransactionsSuccess = ( transactions ) => {    
    return {
        type: actionTypes.FETCH_TRANSACTIONS_SUCCESS,
        transactions: transactions
    };
};

export const fetchTransactionsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_TRANSACTIONS_FAIL,
        error: error
    };
};

export const fetchTransactionsStart = () => {
    return {
        type: actionTypes.FETCH_TRANSACTIONS_START
    };
};

export const fetchTransactions = () => {
    return dispatch => {
        dispatch(fetchTransactionsStart());
        // const queryParams = '?auth=' + token + '&transactionBy="userId"&equalTo="' + userId + '"';
        axios.get( '/transactions')
            .then( res => {
                
                const fetchTransactions = res.data
                .map((item, index) => { 
                    return {
                        ...item,
                        id: index
                    }});
            
                dispatch(fetchTransactionsSuccess(fetchTransactions));
            } )
            .catch( err => {
                dispatch(fetchTransactionsFail(err));
            } );
    };
};


/****************************** EDIT */

export const editTransactionSuccess = ( id, transactionData ) => {
    return {
        type: actionTypes.EDIT_TRANSACTION_SUCCESS,
        transactionId: id,
        transactionData: transactionData,
    };
};

export const editTransactionFail = ( error ) => {
    return {
        type: actionTypes.EDIT_TRANSACTION_FAIL,
        error: error
    };
}

export const editTransactionStart = () => {
    return {
        type: actionTypes.EDIT_TRANSACTION_START
    };
};

export const editTransaction = ( transactionData ) => {
    const editedTran = {
        ...transactionData
    }
    delete editedTran.id
    return dispatch => {
        dispatch( editTransactionStart() );
        console.log(editedTran, transactionData)
        axios.put( '/edittransaction', editedTran)
            .then( response => {
                dispatch( editTransactionSuccess( response.data.name, transactionData ) );
            })
            .catch( error => {
                console.log("transaction fail :", error)
                dispatch( newTransactionFail( error ) );
            } );
    };
};

/********************* DELETE */

export const deleteTransactionSuccess = ( id, transactionData ) => {
    return {
        type: actionTypes.DELETE_TRANSACTION_SUCCESS,
        transactionId: id,
        transactionData: transactionData,
    };
};

export const deleteTransactionFail = ( error ) => {
    return {
        type: actionTypes.DELETE_TRANSACTION_FAIL,
        error: error
    };
}

export const deleteTransactionStart = () => {
    return {
        type: actionTypes.DELETE_TRANSACTION_START
    };
};

export const deleteTransaction = ( transactionData ) => {
    const editedTran = {
        ...transactionData
    }
    return dispatch => {
        dispatch( deleteTransactionStart() );

        axios.delete( '/deletetransaction?id=' + editedTran._id)
            .then( response => {
                dispatch( deleteTransactionSuccess( response.data.name, transactionData ) );
            })
            .catch( error => {
                console.log("transaction fail :", error)
                dispatch( newTransactionFail( error ) );
            } );
    };
};


