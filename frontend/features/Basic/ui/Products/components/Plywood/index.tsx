import React from 'react'
import {
  plywoodLinks, ProductLinks, serviceSlide,
} from '@features/Basic/ui/Products/mockData'
import Links from '@features/Basic/ui/Products/components/Links'
import PlywoodInfo from '@features/Basic/ui/Products/components/Plywood/components/PlywoodInfo'
import Service from '@features/Basic/ui/Service'
import PlywoodProduction from '@features/Basic/ui/Products/components/Plywood/components/PlywoodProduction'
import PlywoodRange from '@features/Basic/ui/Products/components/Plywood/components/PlywoodRange'
import PlywoodCalculator from '@features/Basic/ui/Products/components/Plywood/components/PlywoodСalculator'
import PlywoodSlider from '@features/Basic/ui/Products/components/Plywood/components/PlywoodSlider'

import styles from './index.module.scss'

const Plywood = () => {
  return (
    <>
      <Links
        links={plywoodLinks}
        defaultLink={ProductLinks.Plywood}
      />
      <PlywoodInfo />

      <PlywoodRange />
      <PlywoodCalculator />

      <div
        className={styles.plywood__title}
        id="service"
      >
        Сервис
      </div>
      <div className={styles.plywood__service_desktop}>
        <Service />
      </div>

      <div className={styles.plywood__service_mobile}>
        <PlywoodSlider cards={serviceSlide} />
      </div>

      <PlywoodProduction />
    </>
  )
}

export default Plywood
