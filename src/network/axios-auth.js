import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://mecanic.herokuapp.com/api/',
    timeout: 10000,
})

export default instance
