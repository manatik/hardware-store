import React from 'react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { wrapper } from '@store/store'
import '@public/styles/index.scss'
import 'react-photoswipe/lib/photoswipe.css'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import Metrics from '@features/Basic/common/Metrics'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Metrics />
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
    </>
  )
}

export default wrapper.withRedux(MyApp)
