const TOKEN_KEY = 'jwt-token'
const BASKET = 'plywood-basket'

function setTokens(accessToken: string) {
  try {
    localStorage.setItem(TOKEN_KEY, accessToken)
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

// eslint-disable-next-line consistent-return
function getAccessToken(): string | null | undefined {
  try {
    return localStorage.getItem(TOKEN_KEY)
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

function removeAuthData() {
  try {
    localStorage.removeItem(TOKEN_KEY)
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

function removeBasket() {
  try {
    localStorage.removeItem(BASKET)
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

function addBasketElement(items: any) {
  try {
    localStorage.setItem(BASKET, JSON.stringify(items))
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

// eslint-disable-next-line consistent-return
function getBasket() {
  try {
    return localStorage.getItem(BASKET)
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

const localStorageService = {
  setTokens,
  getAccessToken,
  removeAuthData,
  removeBasket,
  addBasketElement,
  getBasket,
}
export default localStorageService
