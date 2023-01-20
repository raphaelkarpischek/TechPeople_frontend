import axios from 'axios'

export default axios.create({
    baseURL: 'https://techpeoplebackend-production.up.railway.app' //or http://localhost:5000/
})
