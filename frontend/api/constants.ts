import getConfig from 'next/config'
import { isSSR } from '@utils/isSSR'
import { isDev } from '@utils/env'

const { publicRuntimeConfig } = getConfig()

export const baseApiEndpoints = {
  baseEndpoint: (isSSR() && !isDev) ? 'http://localhost:3000' : publicRuntimeConfig?.REACT_APP_API_URL,
}

export enum ApiEndpoints {
  Register = '/api/auth/register',
  Login = '/api/auth/login',
  Refresh = '/api/auth/refresh',
  Users = '/api/user/all',
  UserInfo = '/api/user/info',
  Categories = '/api/category',
  Email = '/api/email/send',
  ProductOrder = '/api/products/order',
  ProductPlywood = '/api/products/plywood',
  ProductFurniture = '/api/products/furniture',
  ProductFeature = '/api/products/furniture-feature',
  ProductParams = '/api/products/furniture-parameters',
  ProductFeaturePhoto = '/api/products/furniture-photos',
  CalcPlywoodPhotos = '/api/products/plywood-photos',
  CalcCoatingDensity = '/api/products/plywood-coating-density',
  CalcType = '/api/products/plywood-type',
  CalcWidth = '/api/products/plywood-width',
  CalcSort = '/api/products/plywood-sort',
  CalcFormat = '/api/products/plywood-format',
}
