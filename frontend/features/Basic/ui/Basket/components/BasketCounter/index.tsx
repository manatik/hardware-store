import React, { FC } from 'react'
import styles from '@features/Basic/ui/Basket/components/BasketCard/index.module.scss'

interface BasketCounterProps {
  addProduct: () => void,
  deleteProduct: () => void,
  count: number
}

const BasketCounter: FC<BasketCounterProps> = ({ addProduct, deleteProduct, count }) => {
  return (
    <div className={styles.basketCard__counter}>
      <div
        className={styles.basketCard__counter__button}
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
