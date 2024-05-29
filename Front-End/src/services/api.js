import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://metafisic.onrender.com/',
    // vercel --prod
    // baseURL: 'http://localhost:3000/',
    timeout: 10000,
})

