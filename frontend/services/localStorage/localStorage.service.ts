const TOKEN_KEY = 'jwt-token'

function setTokens(accessToken: string) {
  try {
    localStorage.setItem(TOKEN_KEY, accessToken)
  } catch (e) {}
}

// eslint-disable-next-line consistent-return
function getAccessToken(): string | null | undefined {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch (e) {}
}

function removeAuthData() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch (e) {}
}

const localStorageService = {
  setTokens,
  getAccessToken,
  removeAuthData,
}
export default localStorageService
