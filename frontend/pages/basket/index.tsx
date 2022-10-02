import React from 'react'
import LayoutCard from '@features/Basic/common/LayoutCard'

import BasketForm from '@features/Basic/ui/Basket/components/BasketForm'
import BasketCard from '@features/Basic/ui/Basket/components/BasketCard'
import styles from './index.module.scss'

const Basket = () => {
  return (
    <LayoutCard>
      <div className={styles.basket__title}>Оформить заказ</div>
      <BasketCard />
      <BasketCard />
      <BasketCard />

      <BasketForm />
    </LayoutCard>
  )
}

export default Basket
