import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'
import { CalcData } from '@models/Calc'

const typeEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.CalcType}`

export const typeService = {
  add: async (dataType: CalcData) => {
    const { data } = await httpService.post(typeEndpoint, dataType)
    return data
  },
  getAll: async () => {
    const { data } = await httpService.get(typeEndpoint)
    return data
  },
  update: async (id: string, dataType: CalcData) => {
    const { data } = await httpService.patch(`${typeEndpoint}/${id}`, dataType)
    return data
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete(`${typeEndpoint}/${id}`)
    return data
  },
}
