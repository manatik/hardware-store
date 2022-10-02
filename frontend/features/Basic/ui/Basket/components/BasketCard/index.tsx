import React from 'react'

import BasketCounter from '@features/Basic/ui/Basket/components/BasketCounter'
import Image from 'next/image'
import img from 'assets/slider/slide-3.png'
import remove from 'assets/remove.svg'
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
      <div className={styles.basketCard__image}><Image src={img} /></div>
      <div className={styles.basketCard__title}>Ламинированная  (F/H)</div>
      <div className={styles.basketCard__color_block}>
        Цвет
        <div
          style={{ backgroundColor: '#000' }}
          className={styles.basketCard__color}
        />
      </div>
      <div className={styles.basketCard__price}>Цена по запросу</div>

      <BasketCounter
        addProduct={() => handleIncrementProduct('1')}
        deleteProduct={() => handleDecrementProduct('1')}
        count={10}
      />

      <div className={styles.basketCard__remove}>
        <Image src={remove} />
      </div>
    </div>
  )
}

export default BasketCard
