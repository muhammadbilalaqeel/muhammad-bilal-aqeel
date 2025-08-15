import axios from "axios";


const api = axios.create({
    baseURL:"https://day3server.vercel.app/api"
})



export default api;