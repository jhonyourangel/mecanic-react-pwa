import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    transactions: [],
    loading: false,
};

const newTransactionStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const newTransactionSuccess = ( state, action ) => {
    const newTransaction = updateObject( action.transactionData, { id: state.transactions.length } );
    state.transactions.unshift( newTransaction ) 
    return updateObject( state, {
        loading: false,
        purchased: true,
        transactions: state.transactions
    } );
};

const newTransactionFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

/************************* EDIT */

const editTransactionStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const editTransactionSuccess = ( state, action ) => {
    const editTransaction = action.transactionData
    
    let transArray = [...state.transactions]
    const index = transArray.findIndex(tran => tran._id === editTransaction._id)
    transArray.splice(index, 1, editTransaction ) 

    return updateObject( state, {
        loading: false,
        purchased: true,
        transactions: transArray
    } );
};

const editTransactionFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

/*********************** DELETE */

const deleteTransactionStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const deleteTransactionSuccess = ( state, action ) => {
    const deleteTransaction = action.transactionData
    
    let transArray = [...state.transactions]
    const index = transArray.findIndex(tran => tran._id === deleteTransaction._id)
    
    console.log("before splice",transArray.length);
    transArray.splice(index, 1 ) 
    console.log("after splice",transArray.length);

    return updateObject( state, {
        loading: false,
        purchased: true,
        transactions: transArray
    } );
};

const deleteTransactionFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

/******************* FETCH  */


const fetchTransactionsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchTransactionsSuccess = ( state, action ) => {
    return updateObject( state, {
        transactions: action.transactions,
        loading: false
    } );
};

const fetchTransactionsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.NEW_TRANSACTION_START: return newTransactionStart( state, action );
        case actionTypes.NEW_TRANSACTION_SUCCESS: return newTransactionSuccess( state, action )
        case actionTypes.NEW_TRANSACTION_FAIL: return newTransactionFail( state, action );

        case actionTypes.EDIT_TRANSACTION_START: return editTransactionStart( state, action );
        case actionTypes.EDIT_TRANSACTION_SUCCESS: return editTransactionSuccess( state, action )
        case actionTypes.EDIT_TRANSACTION_FAIL: return editTransactionFail( state, action );

        case actionTypes.DELETE_TRANSACTION_START: return deleteTransactionStart( state, action );
        case actionTypes.DELETE_TRANSACTION_SUCCESS: return deleteTransactionSuccess( state, action )
        case actionTypes.DELETE_TRANSACTION_FAIL: return deleteTransactionFail( state, action );

        case actionTypes.FETCH_TRANSACTIONS_START: return fetchTransactionsStart( state, action );
        case actionTypes.FETCH_TRANSACTIONS_SUCCESS: return fetchTransactionsSuccess( state, action );
        case actionTypes.FETCH_TRANSACTIONS_FAIL: return fetchTransactionsFail( state, action );
        default: return state;
    }
};

export default reducer;