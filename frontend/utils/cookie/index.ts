import jsCookie from 'js-cookie'

export const getCookie = (key: string) => {
  let result = []
  if (key) {
    const localData = jsCookie.get(key)
    if (localData && localData.length > 0) {
      result = JSON.parse(localData)
    }
  }

  return result
}

export const setCookie = (key: string, value: any) => {
  jsCookie.set(key, JSON.stringify(value))
}
