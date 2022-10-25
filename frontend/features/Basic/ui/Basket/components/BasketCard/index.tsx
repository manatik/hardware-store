import React from 'react'

import Image from 'next/image'
import img from 'assets/slider/slide-3.webp'
import Desktop from '@features/Basic/ui/Basket/components/BasketCard/components/Desktop'
import Tablet from '@features/Basic/ui/Basket/components/BasketCard/components/Tablet'
import Mobile from '@features/Basic/ui/Basket/components/BasketCard/components/Mobile'
import styles from './index.module.scss'

const BasketCard = () => {
  const handleIncrementProduct = (id: string) => {
    console.log(id)
  }
  const handleDecrementProduct = (id: string) => {
    console.log(id)
  }
  return (
    <div className={styles.basketCard}>
      <div className={styles.basketCard__image}>
        <Image
          src={img}
          height={95}
          layout="fill"
        />
      </div>
      <div className={styles.basketCard__right}>
        <Desktop
          increment={handleIncrementProduct}
          decrement={handleDecrementProduct}
        />
        <Tablet
          increment={handleIncrementProduct}
          decrement={handleDecrementProduct}
        />
        <Mobile
          increment={handleIncrementProduct}
          decrement={handleDecrementProduct}
        />
      </div>
    </div>
  )
}

export default BasketCard
