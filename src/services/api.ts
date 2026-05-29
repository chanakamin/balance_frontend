import axios, { AxiosInstance, AxiosError } from 'axios'
import { ApiResponse } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - typically redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
