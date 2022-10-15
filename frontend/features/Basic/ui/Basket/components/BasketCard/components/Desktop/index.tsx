import React, { FC } from 'react'
import BasketCounter from '@features/Basic/ui/Basket/components/BasketCounter'
import Image from 'next/image'

import remove from 'assets/remove.svg'
import styles from '@features/Basic/ui/Basket/components/BasketCard/index.module.scss'
import { BlockProps } from '@features/Basic/ui/Basket/components/BasketCard/types'

const Desktop: FC<BlockProps> = ({ increment, decrement }) => {
  return (
    <div className={styles.basketCard__right_desktop}>
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
        addProduct={() => increment('1')}
        deleteProduct={() => decrement('1')}
        count={10}
      />

      <div className={styles.basketCard__remove}>
        <Image src={remove} />
      </div>
    </div>
  )
}

export default Desktop
