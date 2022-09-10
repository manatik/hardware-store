import localStorageService from '@services/localStorage/localStorage.service'
import authService from '@services/auth/auth.service'

export const refreshToken = async (code: number, cookie: string) => {
  if (code === 401) {
    const str = cookie.split('; ')

    const result: any = {}
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const i in str) {
      const cur = str[i].split('=')
      // @ts-ignore
      // eslint-disable-next-line prefer-destructuring
      result[cur[0]] = cur[1]
    }

    const { data } = await authService.refresh(result)
    localStorageService.removeAuthData()
    localStorageService.setTokens(data.accessToken)
  }
}
