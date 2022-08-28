import axios from 'axios'
import { baseApiEndpoints } from '@api'
import localStorageService from '@services/localStorage/localStorage.service'

axios.defaults.baseURL = baseApiEndpoints.baseEndpoint
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers = { ...config.headers, authorization: `Bearer ${accessToken}` }
    }
    return config
  },
  (error) => Promise.reject(error?.response?.data || error),
)

axios.interceptors.response.use(
  async (config) => config,
  async (error) => Promise.reject(error?.response?.data || error),
)

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
}

export default httpService
