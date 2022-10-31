import React, { FC } from 'react'
import styles from '@features/Basic/ui/Basket/components/BasketCard/index.module.scss'
import BasketCounter from '@features/Basic/ui/Basket/components/BasketCounter'
import Image from 'next/image'
import remove from 'assets/remove.svg'
import { BlockProps } from '@features/Basic/ui/Basket/components/BasketCard/types'

const Mobile: FC<BlockProps> = ({
  increment, decrement, item, removeItem, id,
}) => {
  return (
    <div className={styles.basketCard__right_mobile}>
      <div className={styles.basketCard__right_mobile__top}>
        {item?.name && (
          <div className={styles.basketCard__title}>{item?.name}</div>
        )}
      </div>

      <div className={styles.basketCard__right_mobile__body}>
        {item.color && (
          <div className={styles.basketCard__color_block}>
            Цвет
            <div
              style={{ backgroundColor: item.color }}
              className={styles.basketCard__color}
            />
          </div>
        )}
        {item.price > 0 ? (
          <div className={styles.basketCard__price}>
            <b>от {item.price}</b> руб./шт
          </div>
        ) : (
          <div className={styles.basketCard__price}>
            <b>Цена по запросу</b>
          </div>
        )}
      </div>
      <div className={styles.basketCard__right_mobile__bottom}>
        <BasketCounter
          addProduct={() => increment(id)}
          deleteProduct={() => decrement(id)}
          count={item.count as number}
        />

        <div className={styles.basketCard__remove}>
          <Image
            src={remove}
            onClick={() => removeItem(id)}
            alt="remove"
          />
        </div>
      </div>
    </div>
  )
}

export default Mobile
