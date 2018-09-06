import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://mecanic.herokuapp.com/api/pwa/',
    headers: {
        common: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
    } 
})

export default instance