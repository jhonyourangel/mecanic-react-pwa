import axios from './axios'
// import errorHandler from './error-handler'
// import * as indexDB from '../store/indexdb/Product'
const PRODUCT_URL = '/product'
export const fetchProductsFromServer = async () => {
    return await axios.get(PRODUCT_URL)
}

export const pushNewProductToServer = async (Product) => {
    return await axios.post(PRODUCT_URL, Product)
}

export const editProduct = async (Product) => {
    return await axios.put(PRODUCT_URL, Product)
} 

export const deleteProduct = async (Product) => {
    return await axios.delete(PRODUCT_URL + '?id=' + Product._id)
}

/**
 * this structure is correct
 * the return promise is what we want 
 * this way we will handle the errors in the controller
 * this way (again) we can show a banner with some mapped errors
 */