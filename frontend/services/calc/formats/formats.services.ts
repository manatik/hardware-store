import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'
import { CalcData } from '@models/Calc'

const formatEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.CalcFormat}`

export const formatService = {
  add: async (dataFormat: CalcData) => {
    const { data } = await httpService.post(formatEndpoint, dataFormat)
    return data
  },
  getAll: async () => {
    const { data } = await httpService.get(formatEndpoint)
    return data
  },
  update: async (id: string, dataFormat: CalcData) => {
    const { data } = await httpService.patch(`${formatEndpoint}/${id}`, dataFormat)
    return data
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete(`${formatEndpoint}/${id}`)
    return data
  },
}
