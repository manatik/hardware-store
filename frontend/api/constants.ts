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
  Users = '/api/user/all',
  UserInfo = '/api/user/info',
  Categories = '/api/category',
  ProductPlywood = '/api/products/plywood',
}
