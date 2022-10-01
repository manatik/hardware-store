import React, { createContext, useEffect, useState } from 'react'

export const SmoothScrollContext = createContext({
  scroll: null,
})

export const SmoothScrollProvider = ({ children, options }: any) => {
  const [scroll, setScroll] = useState(null)

  useEffect(() => {
    if (!scroll) {
      (async () => {
        try {
          // @ts-ignore
          const LocomotiveScroll = (await import('locomotive-scroll')).default

          setScroll(
            new LocomotiveScroll({
              el: document.querySelector('[data-scroll-container]') ?? undefined,
              ...options,
            }),
          )
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`)
        }
      })()
    }

    return () => {
      // @ts-ignore
      // eslint-disable-next-line no-unused-expressions
      scroll && scroll.destroy()
    }
  }, [scroll])

  return <SmoothScrollContext.Provider value={{ scroll }}>{children}</SmoothScrollContext.Provider>
}

SmoothScrollContext.displayName = 'SmoothScrollContext'
SmoothScrollProvider.displayName = 'SmoothScrollProvider'
