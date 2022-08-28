import React from 'react'
import {
  Html, Head, Main, NextScript,
} from 'next/document'
import HeadDocument from '@features/Basic/common/HeadDocument'

const Document = () => {
  return (
    <Html>
      <Head>
        <HeadDocument />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="modal" />
      </body>
    </Html>
  )
}

export default Document
