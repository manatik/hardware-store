import React from 'react'
import ProductCards from '@features/Basic/ui/ProductCards'

import styles from './index.module.scss'

const PlywoodRange = () => {
  return (
    <div
      className={styles.range}
      id="range"
    >
        <div className={styles.range__title}>Ассортимент</div>
        <div>
          <ProductCards />
        </div>
    </div>
  )
}

export default PlywoodRange
