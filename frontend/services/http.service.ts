import axios from 'axios'
import { baseApiEndpoints } from '@api'

axios.defaults.baseURL = baseApiEndpoints.baseEndpoint
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error?.response?.data || error),
)

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
}

export default httpService
