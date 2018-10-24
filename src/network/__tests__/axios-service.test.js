import {
    fetchServicesFromServer,
    pushNewServiceToServer,
    editService,
    deleteService
} from '../axios-service';

import axios from '../axios';

describe('axios service', () => {
    let service = {
        name: 'oil change',
        brand: 'castrol',
        type: '5-30',
        quantity: 6,
        cost: 65,
        note: 'some notes'
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

    it('should create a new service ', async ()=> {
        const res = await pushNewServiceToServer(service)
        service = {
            ...service,
            _id: res.data._id
        }
        service['createdBy'] = res.data.createdBy
        expect(res).not.toBe(undefined)
        expect(res.data).toMatchObject(service)
    })

    /**  
    * this one may create confusion
    * test for this one only if necessary
    it('should fail on creating a new service with the same Plate Number', async ()=> {
        try {
            const res = await pushNewServiceToServer(service)
        } catch (error) {
            console.log("error:", error.response.status, error.response.statusText)
            expect(error).not.toBe(undefined)
            expect(error.response.status).toBe(400)
            expect(error.response.statusText).toBe('Bad Request')
        }
    }) 
    */

    it('should edit the service data and return an exact copy ', async ()=>{
        service = {
            ...service,
            note: 'edited notes'
        }
        
        const res = await editService(service)
        expect(res.data).toMatchObject(service)
    })
        

    it('should delete the service that you create earlier ', async ()=> {
        const res = await deleteService(service)
        service = {
            ...service,
        }
        delete service.categories
        delete service.owner
        
        expect(res).not.toBe(undefined)
        expect(res.data).toMatchObject(service)
    })
})