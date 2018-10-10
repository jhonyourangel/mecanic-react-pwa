import axios from 'axios'

const PROD_URL = 'https://mecanic.herokuapp.com/api/pwa/'
const DEV_URL = 'http://localhost:8080/api/pwa/'

const instance = axios.create({
    baseURL: DEV_URL,
    headers: {
        common: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
    } 
})

export default instance 