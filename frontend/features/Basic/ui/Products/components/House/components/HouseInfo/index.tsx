import React, { useEffect } from 'react'

import house1 from 'assets/house/house-1.webp'
import house2 from 'assets/house/house-2.webp'
import Image from 'next/image'
import scrollToAnchor from '@utils/scrollToAnchor'
import styles from './index.module.scss'

const HouseInfo = () => {
  useEffect(() => {
    scrollToAnchor()
  }, [])
  return (
    <div
      className={styles.info}
      id="house"
    >
      <div className={styles.info__title}>
        Быстровозводимые легкие конструкции
        <br />Сборочные комплекты домов, доступные каждому
      </div>

      <div className={styles.info__container}>
        <div className={styles.info__top}>
          <div className={styles.info__top__left}>
            Благодаря <b>модульным технологиям</b> конструкция дома отличается своей
            быстрой скоростью возведения - <b>до 14 дней</b>, модульная конструкция
            создается <b>по индивидуальному заказу</b> с выбранным внешним видом,
            наружной и внутренней отделкой
            <br />
            <br />
            <b>Высокая энергоэффективность</b> технологии позволяет возводить дом
            в любых климатических условиях - система быстровозводимой каркасной
            технологии при утеплении 300 мм имеет высокую теплозащиту
          </div>
          <div className={styles.info__top__right}>
            <Image
              src={house1}
              width={505}
              height={337}
              placeholder="blur"
              alt=""
            />
          </div>
        </div>
        <div className={styles.info__bottom}>
          <div className={styles.info__bottom__left}>
            <Image
              src={house2}
              width={505}
              height={337}
              placeholder="blur"
              alt=""
            />
          </div>
          <div className={styles.info__bottom__right}>
            Конструкционные детали из фанеры <b>выдерживают большие
            нагрузки</b>, а в соединении дают еще большую прочность
            <br />
            <br />
            Все материалы наших домов <b>экологичные и безопасные</b>
            <br />
            <br />
            Высокоточное оборудование воспроизводит детали
            с идеальной геометрией (с точностью 0,01 мм)
            <br />
            <br />
            Дом можно <b>собрать самостоятельно</b> по инструкции
            - используются готовые пронумерованные детали
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseInfo
