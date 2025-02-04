import axios from "axios";


const user = "user";
const password = "1084e30b-d7e0-48bd-9ae9-ef5024439b39"

const client = axios.create({
    baseURL: `http://localhost:8080`,
    headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Basic ${btoa(`${user} : ${password}`)}`
    }
})


export default client;