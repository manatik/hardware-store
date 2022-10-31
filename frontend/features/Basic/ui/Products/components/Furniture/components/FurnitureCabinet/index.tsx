import React, { useEffect } from 'react'
import Image from 'next/image'
import FurnitureOfferCard from '@features/Basic/ui/Products/components/Furniture/components/FurnitureOfferCard'
import scrollToAnchor from '@utils/scrollToAnchor'

import img1 from 'assets/furniture/cabinet-1.webp'
import img2 from 'assets/furniture/cabinet-2.webp'
import img3 from 'assets/furniture/cabinet-3.webp'
import img4 from 'assets/furniture/cabinet-4.webp'
import styles from './index.module.scss'

const FurnitureCabinet = () => {
  useEffect(() => {
    scrollToAnchor()
  }, [])
  return (
    <div
      className={styles.cabinet}
      id="cabinet"
    >
      <div className={styles.cabinet__title}>Корпусная мебель</div>
      <div className={styles.cabinet__container}>
        <div className={styles.cabinet__left}>
          Изготовление на&nbsp;заказ корпусной мебели из&nbsp;<b>фанеры, ДСП, МДФ</b>.
          <br />
          <br />
          Наша мебель отличается эгологичными и&nbsp;безопасными материалами,
          высоким качеством и&nbsp;надёжностью исполнения.
          Наш&nbsp;приоритет&nbsp;— это&nbsp;<b>здоровье, безопасность и&nbsp;комфорт</b>.
          <br />
          <br />
          Изготавливаем мебель <b>по&nbsp;Вашим фото</b> и&nbsp;<b>дизайн проектам</b>,
          при&nbsp;необходимости предлагаем свои варианты. Цена рассчитывается <b>индивидуально</b>
          по&nbsp;каждому проекту, высылается по&nbsp;запросу.
        </div>
        <div className={styles.cabinet__right}>
          <div className={styles.cabinet__right__item}>
             <Image
               src={img1}
               width={244}
               height={157}
               placeholder="blur"
               alt=""
             />
          </div>
          <div className={styles.cabinet__right__item}>
             <Image
               src={img2}
               width={244}
               height={157}
               placeholder="blur"
               alt=""
             />
          </div>
          <div className={styles.cabinet__right__item}>
             <Image
               src={img3}
               width={244}
               height={157}
               placeholder="blur"
               alt=""
             />
          </div>
          <div className={styles.cabinet__right__item}>
             <Image
               src={img4}
               width={244}
               height={157}
               placeholder="blur"
               alt=""
             />
          </div>
        </div>
      </div>

      <FurnitureOfferCard />
    </div>
  )
}

export default FurnitureCabinet
