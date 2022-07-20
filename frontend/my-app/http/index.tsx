import axios from 'axios';
// import {AuthResponse} from "../models/response/AuthResponse";


export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    console.log(config.headers)
    if(config.headers){
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config;

})



export default $api;