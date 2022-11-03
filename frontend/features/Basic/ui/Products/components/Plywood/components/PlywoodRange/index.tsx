import React, { useEffect } from 'react'
import ProductCards, { Links } from '@features/Basic/ui/ProductCards'

import { useAppSelector } from '@store/hooks'
import { getPlywood } from '@store/products/selector'
import scrollToAnchor from '@utils/scrollToAnchor'
import styles from './index.module.scss'

const PlywoodRange = () => {
  const products = useAppSelector(getPlywood)

  useEffect(() => {
    if (products) {
      scrollToAnchor()
    }
  }, [products])
  return (
    <div
      className={styles.range}
      id="range"
    >
      <div className={styles.range__title}>Ассортимент</div>
      <ProductCards
        products={products}
        link={Links.Plywood}
      />
    </div>
  )
}

export default PlywoodRange
