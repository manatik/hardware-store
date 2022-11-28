import React from 'react'
import getConfig from 'next/config'

/** Счетчик Yandex Metrica */
export const YandexMetrica = (): React.ReactElement => {
  const { publicRuntimeConfig } = getConfig()
  const id = Math.trunc(publicRuntimeConfig.REACT_APP_YANDEX_METRIKA_ID)
  const YandexMetrica = `
    <script type="text/javascript" >
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      window.ym("${id}", "init", {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt=""/></div></noscript>
  `
  return <div dangerouslySetInnerHTML={{ __html: YandexMetrica }}></div>
}
