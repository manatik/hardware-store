import httpService from '@services/http.service'
import { AuthModal, AuthResp } from '@models/Auth'
import { ApiEndpoints, baseApiEndpoints } from '@api'

/**
 * Эндпоинты для стороннего API
 */
const loginEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Login}`
const registerEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Register}`
const refreshEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Refresh}`

const authService = {
  login: async (userData: AuthModal) => {
    const resp = await httpService.post<AuthResp>(loginEndpoint, userData)
    return resp
  },
  register: async (userData: AuthModal) => {
    const resp = await httpService.post<AuthResp>(registerEndpoint, userData)
    return resp
  },
  refresh: async (cookie: any) => {
    const resp = await httpService.post<AuthResp>(refreshEndpoint, cookie)
    return resp
  },
}

export default authService
