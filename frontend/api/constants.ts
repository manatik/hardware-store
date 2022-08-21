import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const baseApiEndpoints = {
  baseEndpoint: publicRuntimeConfig?.REACT_APP_API_URL,
  baseLocalEndpoint: typeof window !== 'undefined' && window.location.origin,
}

export enum ApiEndpoints {
  Register = '/api/auth/register',
  Login = '/api/auth/login',
  RegisterNext = '/api/v1/register',
  LoginNext = '/api/v1/login',
}
