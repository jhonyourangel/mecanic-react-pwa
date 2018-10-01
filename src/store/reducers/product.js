import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    products: [],
    product: {},
    loading: false,
};

const newProductStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const newProductSuccess = ( state, action ) => {
    const newProduct = updateObject( action.productData, { id: state.products.length } );
    state.products.unshift( newProduct ) 
    return updateObject( state, {
        loading: false,
        purchased: true,
        products: state.products
    } );
};

const newProductFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/************************* EDIT */

const editProductStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const editProductSuccess = ( state, action ) => {
    const editProduct = action.productData
    
    let list = [...state.products]
    const index = list.findIndex(item => item._id === editProduct._id)
    list.splice(index, 1, editProduct ) 

    return updateObject( state, {
        loading: false,
        purchased: true,
        products: list,
        product: editProduct
    } );
};

const editProductFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/*********************** DELETE */

const deleteProductStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const deleteProductSuccess = ( state, action ) => {
    const deleteProduct = {...action.productData}
    
    let list = [...state.products]
    const index = list.findIndex(item => item._id === deleteProduct._id)
    
    console.log("before splice",list.length);
    list.splice(index, 1 ) 
    console.log("after splice",list.length);

    return updateObject( state, {
        loading: false,
        products: list,
        product: deleteProduct
    } );
};

const deleteProductFail = ( state ) => {
    return updateObject( state, { loading: false } );
};

/******************* FETCH all  */


const fetchProductsStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const fetchProductsSuccess = ( state, action ) => {
    return updateObject( state, {
        products: action.products,
        loading: false
    } );
};

const fetchProductsFail = ( state ) => {
    return updateObject( state, { loading: false } );
};


/******************* FETCH by plate number  */
const fetchProductStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const fetchProductSuccess = ( state, action ) => {
    return updateObject( state, {
        product: action.product,
        loading: false
    } );
};

const fetchProductFail = ( state ) => {
    return updateObject( state, { loading: false } );
};


/************** Export Js */
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.NEW_PRODUCT_START: return newProductStart( state, action );
        case actionTypes.NEW_PRODUCT_SUCCESS: return newProductSuccess( state, action )
        case actionTypes.NEW_PRODUCT_FAIL: return newProductFail( state, action );

        case actionTypes.EDIT_PRODUCT_START: return editProductStart( state, action );
        case actionTypes.EDIT_PRODUCT_SUCCESS: return editProductSuccess( state, action )
        case actionTypes.EDIT_PRODUCT_FAIL: return editProductFail( state, action );

        case actionTypes.DELETE_PRODUCT_START: return deleteProductStart( state, action );
        case actionTypes.DELETE_PRODUCT_SUCCESS: return deleteProductSuccess( state, action )
        case actionTypes.DELETE_PRODUCT_FAIL: return deleteProductFail( state, action );

        case actionTypes.FETCH_PRODUCT_START: return fetchProductStart( state, action );
        case actionTypes.FETCH_PRODUCT_SUCCESS: return fetchProductSuccess( state, action );
        case actionTypes.FETCH_PRODUCT_FAIL: return fetchProductFail( state, action );

        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart( state, action );
        case actionTypes.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess( state, action );
        case actionTypes.FETCH_PRODUCTS_FAIL: return fetchProductsFail( state, action );
        default: return state;
    }
};

export default reducer;