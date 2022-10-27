import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'
import { CalcData } from '@models/Calc'

const coatingDensityEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.CalcCoatingDensity}`

export const coatingDensityService = {
  add: async (dataCoatingDensity: CalcData) => {
    const { data } = await httpService.post(coatingDensityEndpoint, dataCoatingDensity)
    return data
  },
  getAll: async () => {
    const { data } = await httpService.get(coatingDensityEndpoint)
    return data
  },
  update: async (id: string, dataCoatingDensity: CalcData) => {
    const { data } = await httpService.patch(`${coatingDensityEndpoint}/${id}`, dataCoatingDensity)
    return data
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete(`${coatingDensityEndpoint}/${id}`)
    return data
  },
}
