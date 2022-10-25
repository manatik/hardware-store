import React, { FC } from 'react'
import styles from '@features/Basic/ui/Basket/components/BasketCard/index.module.scss'
import cn from 'classnames'

interface BasketCounterProps {
  addProduct: () => void,
  deleteProduct: () => void,
  count: number
}

const BasketCounter: FC<BasketCounterProps> = ({ addProduct, deleteProduct, count }) => {
  return (
    <div className={styles.basketCard__counter}>
      <div
        className={cn(styles.basketCard__counter__button, {
          [styles.basketCard__counter__buttonActive]: count > 0,
        })}
        onClick={deleteProduct}
      >&minus;</div>
      <div className={styles.basketCard__counter__count}>{count}</div>
      <div
        className={styles.basketCard__counter__buttonActive}
        onClick={addProduct}
      >+</div>
    </div>
  )
}

export default BasketCounter
