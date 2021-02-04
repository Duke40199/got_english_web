import axios from 'axios';

let APIKit = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 10000
})

export default APIKit;