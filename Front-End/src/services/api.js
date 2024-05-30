import axios from 'axios'

export const api = axios.create({
    // vercel --prod
    // baseURL: 'http://localhost:3000/',
    baseURL: 'https://metafisic.onrender.com/',
    timeout: 20000,
})