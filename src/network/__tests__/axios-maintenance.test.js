import {
    fetchMaintenancesFromServer,
    pushNewMaintenanceToServer,
    editMaintenance,
    deleteMaintenance
} from '../axios-maintenance';

import axios from '../axios';

describe('axios maintenance', () => {
    let maintenance = {
        "createdBy": "a user _id ",
        "products": ["oil", "air filter", "oil filter", "ac filter"],
        "category": "full maintanance/breaks/tires",
        "plateNumber": "SV10RCE",
        "vin": "THIS_SHOULD_BE_THE_VIN",
        "carKm": 229000
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

    it('should create a new maintenance ', async ()=> {
        const res = await pushNewMaintenanceToServer(maintenance)
        maintenance = {
            ...maintenance,
            _id: res.data._id
        }
        maintenance['createdBy'] = res.data.createdBy
        expect(res).not.toBe(undefined)
        expect(res.data).toMatchObject(maintenance)
    })

    /**  
    * this one may create confusion
    * test for this one only if necessary
    it('should fail on creating a new maintenance with the same Plate Number', async ()=> {
        try {
            const res = await pushNewMaintenanceToServer(maintenance)
        } catch (error) {
            console.log("error:", error.response.status, error.response.statusText)
            expect(error).not.toBe(undefined)
            expect(error.response.status).toBe(400)
            expect(error.response.statusText).toBe('Bad Request')
        }
    }) 
    */

    it('should edit the maintenance data', async ()=>{
        maintenance = {
            ...maintenance,
            products: ['oil', 'breaks'],
        }
        
        const res = await editMaintenance(maintenance)
        expect(res.data).toMatchObject(maintenance)
    })
        

    it('should delete the maintenance that you create earlier ', async ()=> {
        const res = await deleteMaintenance(maintenance)
        maintenance = {
            ...maintenance,
            plateNumber: 'SV10RCE',
        }
        delete maintenance.categories
        delete maintenance.owner
        
        expect(res).not.toBe(undefined)
        expect(res.data).toMatchObject(maintenance)
    })
})