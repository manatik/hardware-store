import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'
import { CalcData } from '@models/Calc'

const sortEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.CalcSort}`

export const sortService = {
  add: async (dataSort: CalcData) => {
    const { data } = await httpService.post(sortEndpoint, dataSort)
    return data
  },
  getAll: async () => {
    const { data } = await httpService.get(sortEndpoint)
    return data
  },
  update: async (id: string, dataSort: CalcData) => {
    const { data } = await httpService.patch(`${sortEndpoint}/${id}`, dataSort)
    return data
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete(`${sortEndpoint}/${id}`)
    return data
  },
}
