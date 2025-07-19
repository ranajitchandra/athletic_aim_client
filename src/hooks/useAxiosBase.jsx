import axios from 'axios'
import { use } from 'react'
import UserAuthContext from './userAuth'

const axiosInstance = axios.create({
    baseURL: 'https://job-portal-server-beta-cyan.vercel.app',
    withCredentials: true,
})

export default function useAxiosBase() {
    const { user, logOutUser } = UserAuthContext()

    // const token = localStorage.getItem('token')
    const token = user?.accessToken

    //   intercept requests
    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    //   intercept responses
    // axiosInstance.interceptors.response.use(
    //     res => res,
    //     err => {
    //         if (err.status === 401 || err.status === 403) {
    //             logOutUser()
    //                 .then(() => {
    //                     console.log(
    //                         `You are logged out because of an error with ${err.status} code.`
    //                     )
    //                 })
    //                 .catch(err => console.log(err))
    //         }
    //         return Promise.reject(err)
    //     }
    // )

    return axiosInstance
}


