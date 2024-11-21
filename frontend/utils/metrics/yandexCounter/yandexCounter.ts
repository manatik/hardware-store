import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const { REACT_APP_YANDEX_METRIKA_ID } = publicRuntimeConfig
const yandexMetrikaId = Math.trunc(REACT_APP_YANDEX_METRIKA_ID)

export const yandexCounter = {
  hit(url: string, params?: object): void {
    if (!window.ym) return
    if (!url) return

    window.ym(yandexMetrikaId, 'hit', url, params)
  },
  initReach(name: string, params?: object, callback?: () => void): void {
    if (!window.ym) return
    if (!name) return

    window.ym(yandexMetrikaId, 'reachGoal', name, params, callback)
  },
  initParams(name: string, params?: string | number | object): void {
    if (!window.ym) return
    if (!name) return

    window.ym(yandexMetrikaId, 'params', name, params || 1)
  },
}
