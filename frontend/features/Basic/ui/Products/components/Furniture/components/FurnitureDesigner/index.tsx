import React from 'react'
import Image from 'next/image'
import img from 'assets/furniture/cabinet-6.webp'
import ProductCards, { Links } from '@features/Basic/ui/ProductCards'
import FurnitureOfferCard from '@features/Basic/ui/Products/components/Furniture/components/FurnitureOfferCard'
import { useAppSelector } from '@store/hooks'
import { getFurniture } from '@store/products/selector'

import styles from './index.module.scss'

const FurnitureDesigner = () => {
  const furniture = useAppSelector(getFurniture)
  return (
    <div
      className={styles.designer}
      id="designer"
    >
      <div className={styles.designer__title}>Дизайнерская мебель</div>
      <ProductCards
        products={furniture}
        link={Links.Furniture}
      />

      <div className={styles.designer__info}>
        <div className={styles.designer__left}>
          <Image
            src={img}
            width={505}
            height={318}
            alt=""
          />
        </div>
        <div className={styles.designer__right}>
          Окружая себя красивыми предметами и интересными дизайнерскими вещицами,
          мы <b>заряжаемся позитивом и поднимаем настроение</b> всем, кто находится вокруг нас.
          Вдохновись! Измени мир вокруг!
          <br />
          <br />
          Возможно изготовление мебели <b>по Вашим фото и дизайн
          проектам</b>, при необходимости предлагаем свои варианты.
        </div>
      </div>

      <FurnitureOfferCard />
    </div>
  )
}

export default FurnitureDesigner
