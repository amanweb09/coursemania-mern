import axios from 'axios'
import { store } from '../store'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3100',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    }
})

export const register = async (data) => { return await instance.post('/api/register', data) }
export const loginUser = async (data) => { return await instance.post('/api/login', data) }
export const profile = async () => { return await instance.get('/api/profile') }
export const logout = async () => { return await instance.get('/api/logout') }
export const refreshAccessToken = async (data) => { return await instance.post('/api/refresh', data) }

export const getAllCourses = async () => { return await instance.get('/api/courses') }
export const getCourseById = async (_id) => { return await instance.get('/api/courses/' + _id) }

export const enrollUser = async (data) => { return await instance.post('/api/enroll', data) }

export const getStreamContent = async (_id) => {
    return await instance.get('/api/video/' + _id, {
        headers: { "Range": "bytes=200-1000" }
    })
}

instance
    .interceptors
    .response
    .use(
        (response) => { return response; },
        (err) => {
            if (err.response.status === 401 && !err.response.data.refreshed) {

                const request = err.config
                
                async function refresh() {
                    const { auth } = store.getState()

                    try {
                        await refreshAccessToken({ _id: auth.user._id })
                        return instance.request(request)  
                    } catch (error) {
                        console.log(error);
                        return error
                    }
                }
                refresh()
            }
        })