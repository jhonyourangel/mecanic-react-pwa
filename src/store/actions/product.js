import * as actionTypes from './actionTypes';
import * as axiosProduct from '../../network/axios-product';

export const newProductSuccess = ( id, productData ) => {
    return {
        type: actionTypes.NEW_PRODUCT_SUCCESS,
        productId: id,
        productData: productData,
    };
};

export const newProductFail = error => {
    return {
        type: actionTypes.NEW_PRODUCT_FAIL,
        error: error
    };
}

export const newProductStart = () => {
    return {
        type: actionTypes.NEW_PRODUCT_START
    };
};

export const newProduct = ( productData ) => {
    return async dispatch => {
        dispatch( newProductStart() );
        try {
            const res = await axiosProduct.pushNewProductToServer(productData)
            dispatch( newProductSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( newProductFail( error ) );
        }        
    };
};

export const newProductInit = () => {
    return {
        type: actionTypes.NEW_PRODUCT_INIT
    };
};

/******************************** FETCH */

export const fetchProductsSuccess = ( products ) => {    
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: products
    };
};

export const fetchProductsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error: error
    };
};

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    };
};

export const fetchProducts = () => {
    
    return async dispatch => {
        dispatch(fetchProductsStart());
        try {     
            const res = await axiosProduct.fetchProductsFromServer()
            dispatch(fetchProductsSuccess(res.data));
        } catch (error) {
            fetchProductsFail(error)
        }
    };
};

/******************************** FETCH */

export const fetchProductSuccess = ( product ) => {    
    return {
        type: actionTypes.FETCH_PRODUCT_SUCCESS,
        product: product
    };
};

export const fetchProductFail = ( error ) => {
    return {  
        type: actionTypes.FETCH_PRODUCT_FAIL,
        error: error
    };
};

export const fetchProductStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_START
    };
};

export const fetchProduct = (plateNumber) => {
    return async dispatch => {
        try {
            dispatch(fetchProductStart());
            const res = await axiosProduct.getProduct(plateNumber)
            dispatch(fetchProductSuccess(res.data[0] || {})) // just send an empty object, this will avoid crushing app
        } catch (error) {
            fetchProductFail(error)
        }
    };
};

/****************************** EDIT */

export const editProductSuccess = ( id, productData ) => {
    return {
        type: actionTypes.EDIT_PRODUCT_SUCCESS,
        productId: id,
        productData: productData,
    };
};

export const editProductFail = ( error ) => {
    return {
        type: actionTypes.EDIT_PRODUCT_FAIL,
        error: error
    };
}

export const editProductStart = () => {
    return {
        type: actionTypes.EDIT_PRODUCT_START
    };
};

export const editProduct = ( productData ) => {
    return async dispatch => {
        dispatch( editProductStart() );
        try {
            const res = await axiosProduct.editProduct(productData)
            dispatch( editProductSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( editProductFail( error ) );
        }
    };
};

/********************* DELETE */

export const deleteProductSuccess = ( id, productData ) => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        productId: id,
        productData: productData,
    };
};

export const deleteProductFail = ( error ) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAIL,
        error: error
    };
}

export const deleteProductStart = () => {
    return {
        type: actionTypes.DELETE_PRODUCT_START
    };
};

export const deleteProduct = ( productData ) => {

    return async dispatch => {
        dispatch( deleteProductStart() );
        try {
            const res = await axiosProduct.deleteProduct(productData)
            dispatch( deleteProductSuccess( res.data.plateNumber, res.data ) );
        } catch (error) {
            dispatch( deleteProductFail( error ));
        }
    };
};
