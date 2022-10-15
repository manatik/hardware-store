import React, { FC } from 'react'
import { BlockProps } from '@features/Basic/ui/Basket/components/BasketCard/types'
import styles from '@features/Basic/ui/Basket/components/BasketCard/index.module.scss'
import BasketCounter from '@features/Basic/ui/Basket/components/BasketCounter'
import Image from 'next/image'
import remove from 'assets/remove.svg'

const Tablet: FC<BlockProps> = ({ increment, decrement }) => {
  return (
    <div className={styles.basketCard__right_tablet}>
      <div className={styles.basketCard__right_tablet__top}>
        <div className={styles.basketCard__title}>Ламинированная  (F/H)</div>
        <div className={styles.basketCard__color_block}>
          Цвет
          <div
            style={{ backgroundColor: '#000' }}
            className={styles.basketCard__color}
          />
        </div>
        <BasketCounter
          addProduct={() => increment('1')}
          deleteProduct={() => decrement('1')}
          count={10}
        />

        <div className={styles.basketCard__remove}>
          <Image src={remove} />
        </div>
      </div>
      <div className={styles.basketCard__right_tablet__bottom}>
        <div className={styles.basketCard__price}>Цена по запросу</div>
      </div>
    </div>
  )
}

export default Tablet
