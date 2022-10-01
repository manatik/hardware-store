import React, { useState } from 'react'

import cn from 'classnames'
import Plywood from '@features/Basic/ui/Products/components/Plywood'
import Furniture from '@features/Basic/ui/Products/components/Furniture'
import House from '@features/Basic/ui/Products/components/House'
import styles from './index.module.scss'

enum Blocks {
  Plywood = 'plywood',
  Furniture = 'furniture',
  House = 'house',
}

const Products = () => {
  const [product, setProduct] = useState<Blocks>(Blocks.Plywood)

  const blocks: Record<Blocks, () => JSX.Element> = {
    [Blocks.Plywood]: Plywood,
    [Blocks.Furniture]: Furniture,
    [Blocks.House]: House,
  }

  const toggleProduct = (type: Blocks): void => setProduct(type)

  const CurrentComponent = blocks[product]

  return (
    <div className={styles.products}>
      <div className={styles.products__buttons}>
        <div
          className={cn(styles.products__button, {
            [styles.products__buttonActive]: product === Blocks.Plywood,
          })}
          onClick={() => toggleProduct(Blocks.Plywood)}
        >
          Фанера
        </div>
        <div
          className={cn(styles.products__button, {
            [styles.products__buttonActive]: product === Blocks.Furniture,
          })}
          onClick={() => toggleProduct(Blocks.Furniture)}
        >
          Мебель
        </div>
        <div
          className={cn(styles.products__button, {
            [styles.products__buttonActive]: product === Blocks.House,
          })}
          onClick={() => toggleProduct(Blocks.House)}
        >
          Домостроение
        </div>
      </div>

      <CurrentComponent />
    </div>
  )
}

export default Products
