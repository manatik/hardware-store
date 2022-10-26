import React, { FC, useEffect } from 'react'

import Image from 'next/image'
import Desktop from '@features/Basic/ui/Basket/components/BasketCard/components/Desktop'
import Tablet from '@features/Basic/ui/Basket/components/BasketCard/components/Tablet'
import Mobile from '@features/Basic/ui/Basket/components/BasketCard/components/Mobile'
import { PlywoodItem } from '@models/Products'
import { useAppDispatch } from '@store/hooks'
import { decrementCount, incrementCount, removeProduct } from '@store/basket/basketSlice'
import styles from './index.module.scss'

interface BasketCardProps {
  item: PlywoodItem
  id: string
}
const BasketCard: FC<BasketCardProps> = ({ item, id }) => {
  const img = item?.photos[0]?.photos[0]
  const dispatch = useAppDispatch()
  const handleIncrementProduct = (id: string) => {
    dispatch(incrementCount(id))
  }
  const handleDecrementProduct = (id: string) => {
    dispatch(decrementCount(id))
  }
  const handleRemoveItem = (id: string) => {
    dispatch(removeProduct(id))
  }

  useEffect(() => {
    if (item.count === 0) {
      dispatch(removeProduct(id))
    }
  }, [item])
  return (
    <div className={styles.basketCard}>
      <div className={styles.basketCard__image}>
        <Image
          src={img.path}
          alt={img.filename}
          height={105}
          width={133}
          layout="fill"
        />
      </div>
      <div className={styles.basketCard__right}>
        <Desktop
          increment={handleIncrementProduct}
          decrement={handleDecrementProduct}
          removeItem={handleRemoveItem}
          item={item}
          id={id}
        />
        <Tablet
          increment={handleIncrementProduct}
          decrement={handleDecrementProduct}
          removeItem={handleRemoveItem}
          item={item}
          id={id}
        />
        <Mobile
          increment={handleIncrementProduct}
          decrement={handleDecrementProduct}
          removeItem={handleRemoveItem}
          item={item}
          id={id}
        />
      </div>
    </div>
  )
}

export default BasketCard
