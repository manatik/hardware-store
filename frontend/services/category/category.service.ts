import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'
import { Categories, Category } from '@models/Category'

const categoriesEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Categories}`
const categoryEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Categories}`

export const categoryService = {
  categories: async () => {
    const { data } = await httpService.get<Categories>(categoriesEndpoint)
    return data
  },
  categoryUpdate: async (catData: Category) => {
    const { data } = await httpService.patch(`${categoryEndpoint}/${catData.id}`, catData)
    return data
  },
  category: async (id: string) => {
    const { data } = await httpService.get(`${categoryEndpoint}/${id}`)
    return data
  },
}
