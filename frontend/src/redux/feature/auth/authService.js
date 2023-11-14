import axios from 'axios'

const BACKEND_URL  = process.env.REACT_APP_BACKEND_URL
console.log(BACKEND_URL)

export const API_URL = `${BACKEND_URL}/user/`


// Register User
const register = async (userData) => {
    // const response = await axios.post(API_URL+'register', userData, {
    const response = await axios.post('http://localhost:8001/user/register', userData, {
        withCredentials: true,
    })

    return response.data
};

// login User
const login = async (userData) => {
    // const response = await axios.post(API_URL+'register', userData, {
    const response = await axios.post('http://localhost:8001/user/login', userData)

    return response.data
}
// logout User
const logout = async () => {
    // const response = await axios.post(API_URL+'register', userData, {
    const response = await axios.get('http://localhost:8001/user/logout')

    return response.data.message
}


// get Login Status
const getLoginStatus = async () => {
    // const response = await axios.post(API_URL+'register', userData, {
    const response = await axios.get('http://localhost:8001/user/getLoginStatus')

    return response.data
}
// get User
const getUser = async () => {
    // const response = await axios.post(API_URL+'register', userData, {
    const response = await axios.get('http://localhost:8001/user/getUser')

    return response.data
}
// Update User Profile
const updateUser = async (userData) => {
    // const response = await axios.post(API_URL+'register', userData, {
    const response = await axios.put('http://localhost:8001/user/updateUser',userData)

    return response.data
}
// Update User Profile
const updatePhoto = async (userData) => {
    // const response = await axios.post(API_URL+'register', userData, {
    const response = await axios.put('http://localhost:8001/user/updatePhoto',userData)

    return response.data
}

const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    updatePhoto
}

export default authService