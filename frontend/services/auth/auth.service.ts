import httpService from '@services/http.service'
import { AuthModal, AuthResp } from '@models/Auth'
import { ApiEndpoints, baseApiEndpoints } from '@api'

/**
 * Эндпоинты для внутренних запросов к Next.js
 */
const loginEndpointNext = `${baseApiEndpoints.baseLocalEndpoint}${ApiEndpoints.LoginNext}`
const registerEndpointNext = `${baseApiEndpoints.baseLocalEndpoint}${ApiEndpoints.RegisterNext}`
const refreshEndpointNext = `${baseApiEndpoints.baseLocalEndpoint}${ApiEndpoints.RefreshNext}`

const internal = {
  login: async (userData: AuthModal) => {
    const resp = await httpService.post<AuthResp>(loginEndpointNext, userData)
    return resp
  },
  register: async (userData: AuthModal) => {
    const resp = await httpService.post<AuthResp>(registerEndpointNext, userData)
    return resp
  },
  refresh: async (cookie: any) => {
    const resp = await httpService.post<AuthResp>(refreshEndpointNext, cookie)
    return resp
  },
}

/**
 * Эндпоинты для стороннего API
 */
const loginEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Login}`
const registerEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Register}`
const refreshEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Refresh}`

const external = {
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

const authService = {
  internal,
  external,
}

export default authService
