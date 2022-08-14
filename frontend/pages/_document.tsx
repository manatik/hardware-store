import React from 'react'
import {
  Html, Head, Main, NextScript,
} from 'next/document'
import HeadDocument from '@features/HeadDocument'

const Document = () => {
  return (
    <Html>
      <Head>
        <HeadDocument />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
