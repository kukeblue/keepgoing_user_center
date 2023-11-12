import axios from 'axios'
import useAuthStore from '@/store/authStore'

const service = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
})

service.interceptors.request.use(
  (config) => {
    let token = '131309e84a7d3a14c7e4b9e4770503629591c95b18e2f617bb171422f3e77e8bac77b21ea64f1c6ed55d8a35471266d0ca358ac5675c76f9625461e31caa350850959ea553efb0fbec5a523d43a4e09a4dea4a23ca13b2b28904fcbbc2a1c0b4ff94b16cc9e8277e285bb70104148971587feb70a7385b836b1f93969ceed725'
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response) => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
