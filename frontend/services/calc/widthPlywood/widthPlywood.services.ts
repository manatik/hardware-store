import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'
import { CalcData } from '@models/Calc'

const widthPlywoodEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.CalcWidth}`

export const widthPlywoodService = {
  add: async (dataWidthPlywood: CalcData) => {
    const { data } = await httpService.post(widthPlywoodEndpoint, dataWidthPlywood)
    return data
  },
  getAll: async () => {
    const { data } = await httpService.get(widthPlywoodEndpoint)
    return data
  },
  update: async (id: string, dataWidthPlywood: CalcData) => {
    const { data } = await httpService.patch(`${widthPlywoodEndpoint}/${id}`, dataWidthPlywood)
    return data
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete(`${widthPlywoodEndpoint}/${id}`)
    return data
  },
}
