import React, { FC } from 'react'
import { BlockProps } from '@features/Basic/ui/Basket/components/BasketCard/types'
import styles from '@features/Basic/ui/Basket/components/BasketCard/index.module.scss'
import BasketCounter from '@features/Basic/ui/Basket/components/BasketCounter'
import Image from 'next/image'
import remove from 'assets/remove.svg'

const Tablet: FC<BlockProps> = ({
  increment, decrement, item, removeItem, id,
}) => {
  return (
    <div className={styles.basketCard__right_tablet}>
      <div className={styles.basketCard__right_tablet__top}>
        {item?.name && (
          <div className={styles.basketCard__title}>{item?.name}</div>
        )}
        {item.color ? (
          <div className={styles.basketCard__color_block}>
            Цвет
            <div
              style={{ backgroundColor: item.color }}
              className={styles.basketCard__color}
            />
          </div>
        ) : (
          <div />
        )}
        <BasketCounter
          addProduct={() => increment(id)}
          deleteProduct={() => decrement(id)}
          count={item.count as number}
        />

        <div
          className={styles.basketCard__remove}
        >
          <Image
            src={remove}
            onClick={() => removeItem(id)}
            alt="remove"
          />
        </div>
      </div>
      <div className={styles.basketCard__right_tablet__bottom}>
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
    </div>
  )
}

export default Tablet
