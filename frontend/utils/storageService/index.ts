export const storageService = {
  setItem: (name: string, value: string) => {
    try {
      localStorage.setItem(name, value)
      // eslint-disable-next-line
    } catch (e) {}
  },
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name)
      // eslint-disable-next-line
    } catch (e) {}

    return null
  },
  removeItem: (name: string) => {
    try {
      return localStorage.removeItem(name)
      // eslint-disable-next-line
    } catch (e) {}

    return null
  },
}
