import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'
import { UserInfo, Users } from '@models/Users'

const usersEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.Users}`
const userInfoEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.UserInfo}?roles=true`

export const usersService = {
  users: async (cookie: string) => {
    const { data } = await httpService.get<Users>(usersEndpoint, {
      data: { accessToken: cookie, auth: true },
    })
    return data
  },
  userinfo: async (cookie: string) => {
    const { data } = await httpService.get<UserInfo>(userInfoEndpoint, {
      data: { accessToken: cookie, auth: true },
    })
    return data
  },
}
