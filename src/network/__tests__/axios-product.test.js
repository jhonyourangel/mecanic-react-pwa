import {
    fetchProductsFromServer,
    pushNewProductToServer,
    editProduct,
    deleteProduct
} from '../axios-product';

import axios from '../axios';

describe('axios product', () => {
    let product = {
        name: 'Oil',
        brand: 'Castrol',
        type: '5w-30',
        details: 'some details',
        quantity: '5',
        cost: 45 
    }
    const testAccount = {
        email: 'testAcount@gmail.com',
        password: 'qwerty'
    }
    let token = ''

    it('should login and get the token', async ()=>{
        const response = await axios.post('../login', testAccount)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        token = response.data.token
        expect(token).not.toBe('')
    })

    it('should create a new product ', async ()=> {
        const res = await pushNewProductToServer(product)
        product = {
            ...product,
            _id: res.data._id
        }
        console.log('the _id:', res.data._id, product._id);
        
        expect(res).not.toBe(undefined)
        expect(res.data).toMatchObject(product)
    })

    /**  
    * this one may create confusion
    * test for this one only if necessary
    it('should fail on creating a new product with the same Plate Number', async ()=> {
        try {
            const res = await pushNewProductToServer(product)
        } catch (error) {
            console.log("error:", error.response.status, error.response.statusText)
            expect(error).not.toBe(undefined)
            expect(error.response.status).toBe(400)
            expect(error.response.statusText).toBe('Bad Request')
        }
    }) 
    */

    it('should edit the product data', async ()=>{
        product = {
            ...product,
            name: 'Oil Filter',
            brand: 'Castor',
            type: 'paper',
            details: 'some oil filter details',
            quantity: '1',
            cost: 14 
        }
        const res = await editProduct(product)
        expect(res.data).toMatchObject(product)
    })
        

    it('should delete the product that you create earlier ', async ()=> {
        console.log('delete:', product._id)
        const res = await deleteProduct(product)
        expect(res).not.toBe(undefined)
        expect(res.data).toMatchObject(product)
    })
})