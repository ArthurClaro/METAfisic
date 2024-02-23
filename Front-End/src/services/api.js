import axios from 'axios'

export const api = axios.create({
    // baseURL: 'https://m6-fullstack.onrender.com/',
    // baseURL: "https://fruit-fake-api.onrender.com/",

    baseURL: 'http://localhost:3000/',
    // baseURL: 'http://localhost:5173/',
    //  <--- Rodar local : PORT : 3000
    
    // baseURL: 'https://metafisic.onrender.com/',

    timeout: 10000,
})