import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'

const formatEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Format}`

export const formatService = {
  formatAdd: async (formatData: any) => {
    const { data } = await httpService.post(formatEndpoint, formatData)
    return data
  },
  formats: async () => {
    const { data } = await httpService.get(formatEndpoint)
    return data
  },
  format: async (id: string) => {
    const { data } = await httpService.get(`${formatEndpoint}/${id}`)
    return data
  },
  formatUpdate: async (formatData :any) => {
    const { data } = await httpService.patch(`${formatEndpoint}/${formatData.id}`, formatData)
    return data
  },
  formatRemove: async (id: string) => {
    const { data } = await httpService.get(`${formatEndpoint}/${id}`)
    return data
  },
}
