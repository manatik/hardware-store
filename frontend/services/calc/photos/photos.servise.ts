import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'

const photosEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.CalcPlywoodPhotos}`

export const photosService = {
  add: async (dataType: any) => {
    const { data } = await httpService.post(photosEndpoint, dataType)
    return data
  },
  getAll: async () => {
    const { data } = await httpService.get(photosEndpoint)
    return data
  },
  update: async (id: string, dataType: any) => {
    const { data } = await httpService.patch(`${photosEndpoint}/${id}`, dataType)
    return data
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete(`${photosEndpoint}/${id}`)
    return data
  },
}
