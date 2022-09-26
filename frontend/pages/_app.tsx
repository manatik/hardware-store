import React from 'react'
import type { AppProps } from 'next/app'
import { wrapper } from '@store/store'
import { ToastContainer } from 'react-toastify'
import '../public/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
    </>
  )
}

export default wrapper.withRedux(MyApp)
