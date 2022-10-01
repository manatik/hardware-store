import React from 'react'
import Image from 'next/image'

import card from 'assets/service/card-1.png'
import card2 from 'assets/service/card-2.png'
import card3 from 'assets/service/card-3.png'
import card4 from 'assets/service/card-4.png'
import card5 from 'assets/service/card-5.png'
import card6 from 'assets/service/card-6.png'
import card7 from 'assets/service/card-7.png'
import card8 from 'assets/service/card-8.png'
import card9 from 'assets/service/card-9.png'

import styles from './index.module.scss'

const Service = () => {
  return (
    <div className={styles.service}>
      <div className={styles.service__inner}>
        <div className={styles.service__cards}>

          <div className={styles.service__card}>
            <div className={styles.service__card__image}>
              <Image
                src={card}
                placeholder="blur"
              />
            </div>
            <div className={styles.service__card__description}>
              <span className={styles.service__card__step}>01 </span>
              Фрезерование
            </div>
          </div>

          <div className={styles.service__card}>
            <div className={styles.service__card__image}>
              <Image
                src={card2}
                placeholder="blur"
              />
            </div>
            <div className={styles.service__card__description}>
              <span className={styles.service__card__step}>02 </span>
              Сверление отверстий
            </div>
          </div>

          <div className={styles.service__card}>
            <div className={styles.service__card__image}>
              <Image
                src={card3}
                placeholder="blur"
              />
            </div>
            <div className={styles.service__card__description}>
              <span className={styles.service__card__step}>03 </span>
              Пропилы любой ширины и&nbsp;глубины
            </div>
          </div>

          <div className={styles.service__card}>
            <div className={styles.service__card__image}>
              <Image
                src={card4}
                placeholder="blur"
              />
            </div>
            <div className={styles.service__card__description}>
              <span className={styles.service__card__step}>04 </span>
              «Шип-паз» любого профиля
            </div>
          </div>

          <div className={styles.service__card}>
            <div className={styles.service__card__image}>
              <Image
                src={card5}
                placeholder="blur"
              />
            </div>
            <div className={styles.service__card__description}>
              <span className={styles.service__card__step}>05 </span>
              Снятие фаски с&nbsp;различным радиусом закругления
            </div>
          </div>

          <div className={styles.service__card}>
            <div className={styles.service__card__image}>
              <Image
                src={card6}
                placeholder="blur"
              />
            </div>
            <div className={styles.service__card__description}>
              <span className={styles.service__card__step}>06 </span>
              Распил в&nbsp;нужный формат
            </div>
          </div>

          <div className={styles.service__card}>
            <div className={styles.service__card__image}>
              <Image
                src={card7}
                placeholder="blur"
              />
            </div>
            <div className={styles.service__card__description}>
              <span className={styles.service__card__step}>07 </span>
              Нанесение пластика (HPL/CPL покрытие)
            </div>
          </div>

          <div className={styles.service__card}>
            <div className={styles.service__card__image}>
              <Image
                src={card8}
                placeholder="blur"
              />
            </div>
            <div className={styles.service__card__description}>
              <span className={styles.service__card__step}>08 </span>
              Покраска материала
            </div>
          </div>

          <div className={styles.service__card}>
            <div className={styles.service__card__image}>
              <Image
                src={card9}
                placeholder="blur"
              />
            </div>
            <div className={styles.service__card__description}>
              <span className={styles.service__card__step}>09 </span>
              Разработка готовых решений фото
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Service
