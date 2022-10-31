import React from 'react'
import Image from 'next/image'
import img1 from 'assets/house/cabinet-1.png'
import img2 from 'assets/house/cabinet-2.png'
import img3 from 'assets/house/cabinet-3.png'
import img4 from 'assets/house/cabinet-4.png'

import styles from './index.module.scss'

const HouseCabinet = () => {
  return (
    <div
      className={styles.cabinet}
    >
      <div className={styles.cabinet__container}>
        <div className={styles.cabinet__left}>
          Наше производство позволяет изготавливать <b>до&nbsp;30 домокомплектов в&nbsp;месяц</b>
          <br />
          <br />
          Наши дома могут поставляться <b>с&nbsp;комплектом мебели собственного производства</b>{' '}
          (спальня, шкафы, кухонный гарнитур и&nbsp;т.д.)
          <br />
          <br />
          Для расчета стоимости <b>оставьте заявку</b> с указанием
          желаемой площади, этажности дома и варианта комплектации
        </div>
        <div className={styles.cabinet__right}>
          <div className={styles.cabinet__right__item}>
            <Image
              src={img1}
              placeholder="blur"
              alt=""
            />
          </div>
          <div className={styles.cabinet__right__item}>
            <Image
              src={img2}
              placeholder="blur"
              alt=""
            />
          </div>
          <div className={styles.cabinet__right__item}>
            <Image
              src={img3}
              placeholder="blur"
              alt=""
            />
          </div>
          <div className={styles.cabinet__right__item}>
            <Image
              src={img4}
              placeholder="blur"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseCabinet
