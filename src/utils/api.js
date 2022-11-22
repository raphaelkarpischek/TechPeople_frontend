import axios from 'axios'

export default axios.create({
    baseURL: 'https://techpeople-backend.herokuapp.com/' //ou http://localhost:5000/
})
