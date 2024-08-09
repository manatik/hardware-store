import axios from 'axios'
import { baseApiEndpoints } from '@api'
import localStorageService from '@services/localStorage/localStorage.service'
import { isSSR } from '@utils/isSSR'

const axiosInstance = axios.create({
  baseURL: baseApiEndpoints.baseEndpoint,
  withCredentials: true,
})

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axiosInstance.interceptors.request.use(
  async (config) => {
    // @ts-ignore
    const requireAuth = config.headers.common.cookie
    const authToken = localStorageService.getAccessToken()
    if (requireAuth || authToken) {
      const token = requireAuth?.split('a_t=')[1]?.split(';')[0] || authToken
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      }
    }

    return config
  },
  (error) => Promise.reject(error?.response?.data || error),
)

axiosInstance.interceptors.response.use(
  async (config) => {
    if (isSSR()) {
      // eslint-disable-next-line no-console
      // console.log('response', {
      //   data: config.data,
      //   headers: config.headers,
      //   req: config.request,
      //   status: config.status,
      // })
    }
    return config
  },
  async (error) => {
    return Promise.reject(error?.response?.data || error)
  },
)

export const setCookieHeader = (cookie: string) => {
  axiosInstance.defaults.headers.common.cookie = cookie
}

const httpService = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  patch: axiosInstance.patch,
}

export default httpService
