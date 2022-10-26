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
  Email = '/api/email',
  ProductOrder = '/api/products/order',
  ProductPlywood = '/api/products/plywood',
  ProductFurniture = '/api/products/furniture',
  ProductFeature = '/api/products/furniture-feature',
  ProductFeaturePhoto = '/api/products/furniture-photos',
  CalcPlywoodPhotos = '/api/products/plywood-photos',
  CalcCoatingDensity = '/api/products/plywood-coating-density',
  CalcType = '/api/products/plywood-type',
  CalcWidth = '/api/products/plywood-width',
  CalcSort = '/api/products/plywood-sort',
  CalcFormat = '/api/products/plywood-format',
}
