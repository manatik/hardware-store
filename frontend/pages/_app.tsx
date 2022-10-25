import React from 'react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { wrapper } from '@store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from 'react-redux'
import '@public/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore()

  return (
    <>
      <PersistGate
        // @ts-ignore
        persistor={store.__persistor}
      >
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>
    </>
  )
}

export default wrapper.withRedux(MyApp)
