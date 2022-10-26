import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'

const orderEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.ProductOrder}`
const orderEmailEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Email}`

export const orderService = {
  orderAdd: async (orderData: any) => {
    const { data } = await httpService.post(orderEndpoint, orderData)
    return data
  },
  orderAll: async () => {
    const { data } = await httpService.get(orderEndpoint)
    return data
  },
  order: async (id: string) => {
    const { data } = await httpService.get(`${orderEndpoint}/${id}`)
    return data
  },
  orderRemove: async (id: string) => {
    const { data } = await httpService.delete(`${orderEndpoint}/${id}`)
    return data
  },
  orderEmail: async (orderData: any) => {
    const { data } = await httpService.post(orderEmailEndpoint, orderData)
    return data
  },
}
