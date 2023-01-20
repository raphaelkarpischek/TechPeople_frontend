import axios from 'axios'

export default axios.create({
    baseURL: 'https://techpeoplebackend-production.up.railway.app' //ou http://localhost:5000/
})
