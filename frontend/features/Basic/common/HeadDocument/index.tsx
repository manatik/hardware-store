import React from 'react'
import { YandexMetrica } from '@features/Basic/common/HeadDocument/components/YandexMetrica'

const HeadDocument = () => {
  return (
    <>
      <title>Plywood market</title>

      <meta charSet="utf-8" />
      <meta
        name="Description"
        content="Plywood Market - Гарантия своевременного и качественного выполнения услуг по обработке фанеры, изготовлению мебели и домов, разработке технических решений. Купить фанеру в городе Киров."
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta
        name="theme-color"
        content="#ffffff"
      />
      <link
        rel="frontend"
        href="https://github.com/ZedByl"
      />
      <link
        rel="backend"
        href="https://github.com/manatik"
      />
      <YandexMetrica />
    </>
  )
}

export default HeadDocument
