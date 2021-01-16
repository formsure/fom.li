import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.formsure.co/api',
    //baseURL: 'http://127.0.0.1:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
