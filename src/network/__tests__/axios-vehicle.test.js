import {
    fetchVehiclesFromServer,
    pushNewVehicleToServer,
    editVehicle,
    deleteVehicle
} from '../axios-vehicle';

import axios from '../axios';

describe('axios vehicle', () => {
    let vehicle = {
        category: 'masina mica test',
        plateNumber: 'TEST',
        plateNationality: 'EE',
        carKm: 9999999,
        owner: 'Pinco Palino',
        email: 'pinco.palino@gmail.com',
        phoneNumber: '555-555-5462',
        brand: 'brand-test',
        model: 'passat-test',
        year: '9999',
        VIN: 'EFDECASDFASDCASEDFASD'
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

    it('should create a new vehicle ', async ()=> {
        const res = await pushNewVehicleToServer(vehicle)
        vehicle['_id'] = res.data._id
        expect(res).not.toBe(undefined)
        expect(res.data).toMatchObject(vehicle)
    })

    /**  
    * this one may create confusion
    * test for this one only if necessary
    it('should fail on creating a new vehicle with the same Plate Number', async ()=> {
        try {
            const res = await pushNewVehicleToServer(vehicle)
        } catch (error) {
            console.log("error:", error.response.status, error.response.statusText)
            expect(error).not.toBe(undefined)
            expect(error.response.status).toBe(400)
            expect(error.response.statusText).toBe('Bad Request')
        }
    }) 
    */

    it('should edit the vehicle data', async ()=>{
        vehicle = {
            ...vehicle,
            plateNumber: 'EDITED PLATE NUMBER',
            owner: 'new owner to the vehicle'
        }
        
        const res = await editVehicle(vehicle)
        expect(res.data).toMatchObject(vehicle)
    })
        

    it('should delete the vehicle that you create earlier ', async ()=> {
        const res = await deleteVehicle(vehicle)
        expect(res).not.toBe(undefined)
        expect(res.data).toMatchObject(vehicle)
    })
})