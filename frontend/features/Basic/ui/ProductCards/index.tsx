import React, { FC } from 'react'

import Image from 'next/image'
import { PlywoodItem } from '@models/Products'
import { available } from '@features/Admin/ui/Products/Plywood/mockData'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './index.module.scss'

export enum Links {
  Plywood = 'plywood',
  Furniture = 'furniture'
}

interface ProductCardsProps {
  products: PlywoodItem[];
  link: Links;
}

const ProductCards: FC<ProductCardsProps> = ({ products, link }) => {
  const { pathname } = useRouter()
  const setAvailable = (id: string) => {
    const result = available.filter((item) => item.id === id)
    return result[0].name
  }

  return (
    <div className={styles.productCards}>
      {products && products.map((item: PlywoodItem) => {
        return (
          <Link
            key={item.id}
            href={`/products/${link}/${item.id}?redirectUrl=${pathname}`}
          >
            <a
              className={styles.productCards__item}
            >
              {item.photos && (
                <div className={styles.productCards__item__image}>
                  <Image
                    src={item.photos[0].photos[0].path}
                    alt={item.photos[0].photos[0].filename}
                    width={400}
                    height={250}
                  />
                </div>
              )}

              {item.name && <div className={styles.productCards__item__title}>{item.name}</div>}

              {item.photos && (
                <div className={styles.productCards__item__colors}>
                  {item.photos.map((item) => (
                    <div
                      key={item.id}
                      style={{ backgroundColor: item.color }}
                      className={styles.productCards__item__color}
                    />
                  ))}
                </div>
              )}

              {(item.price || item.available) && (
                <div className={styles.productCards__item__bottom}>
                  {item.price > 0 ? (
                    <div className={styles.productCards__item__price}>
                      <b>от {item.price}</b> руб./шт
                    </div>
                  ) : (
                    <div className={styles.productCards__item__availability}>
                      <b>Цена по запросу</b>
                    </div>
                  )}
                  {item.available && (
                    <div className={styles.productCards__item__availability}>
                      {setAvailable(item.available)}
                    </div>
                  )}
                </div>
              )}
            </a>
          </Link>
        )
      })}
    </div>
  )
}

export default ProductCards
