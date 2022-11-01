import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'
import { PlywoodModal } from '@models/Products'

const plywoodEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.ProductPlywood}`

export const plywoodService = {
  plywoodAdd: async (plywoodData: any) => {
    const { data } = await httpService.post(plywoodEndpoint, plywoodData)
    return data
  },
  plywoodAll: async () => {
    const { data } = await httpService.get<PlywoodModal>(plywoodEndpoint)
    return data
  },
  plywood: async (id: string) => {
    const { data } = await httpService.get(`${plywoodEndpoint}/${id}`)
    return data
  },
  plywoodUpdate: async (plywoodData :any) => {
    const { data } = await httpService.patch(`${plywoodEndpoint}/${plywoodData.id}`, plywoodData)
    return data
  },
  plywoodRemove: async (id: string) => {
    const { data } = await httpService.delete(`${plywoodEndpoint}/${id}?hard=true`)
    return data
  },
}
