import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'
import { Users } from '@models/Users'

const usersEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Users}`

export const usersService = {
  users: async () => {
    const { data } = await httpService.get<Users>(usersEndpoint)
    return data
  },
}
