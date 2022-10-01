import React from 'react'
import Slider from '@features/Basic/ui/Products/components/Slider'
import { plywood, plywoodLinks, ProductLinks } from '@features/Basic/ui/Products/mockData'
import Links from '@features/Basic/ui/Products/components/Links'
import PlywoodInfo from '@features/Basic/ui/Products/components/Plywood/components/PlywoodInfo'
import Service from '@features/Basic/ui/Service'
import PlywoodProduction from '@features/Basic/ui/Products/components/Plywood/components/PlywoodProduction'

import PlywoodRange from '@features/Basic/ui/Products/components/Plywood/components/PlywoodRange'
import PlywoodCalculator from '@features/Basic/ui/Products/components/Plywood/components/PlywoodСalculator'
import styles from './index.module.scss'

const Plywood = () => {
  return (
    <>
      <Slider sliders={plywood} />
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
      <Service />

      <PlywoodProduction />
    </>
  )
}

export default Plywood
