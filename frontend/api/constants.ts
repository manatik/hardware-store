import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const baseApiEndpoints = {
  baseEndpoint: publicRuntimeConfig?.REACT_APP_API_URL,
  baseLocalEndpoint: publicRuntimeConfig?.API_SSR_BASE_URL,
}

export enum ApiEndpoints {
  Register = '/api/auth/register',
  Login = '/api/auth/login',
  Refresh = '/api/auth/refresh',
  RegisterNext = '/api/v1/register',
  LoginNext = '/api/v1/login',
  RefreshNext = '/api/v1/refresh',
  Categories = '/api/category',
  Users = '/api/user/all',
  UserInfo = '/api/user/info'
}
