import React from 'react'

import Image from 'next/image'

import delivery1 from 'assets/furniture/delivery-1.png'
import delivery2 from 'assets/furniture/delivery-2.png'
import delivery3 from 'assets/furniture/delivery-3.png'
import styles from './index.module.scss'

const FurnitureDelivery = () => {
  return (
    <div
      className={styles.delivery}
      id="delivery"
    >
      <div className={styles.delivery__title}>Доставка</div>
      <div className={styles.delivery__container}>
        <div className={styles.delivery__left}>
          Доставка осуществляется <b>во&nbsp;все&nbsp;регионы Росси</b>{' '}
          любой транспортной компанией. Напишите нам, и&nbsp;мы&nbsp;рассчитаем
          точную стоимость доставки в&nbsp;ваш&nbsp;город. Часть мебели разборная,
          поставляется в&nbsp;разобранном виде с&nbsp;фурнитурой и&nbsp;инструкцией по&nbsp;сборке.
        </div>
        <div className={styles.delivery__right}>
          Самостоятельно можно рассчитать стоимость доставки следующими транспортными компаниями
          <div className={styles.delivery__images}>
            <div className={styles.delivery__images__item}>
              <Image src={delivery1} />
            </div>
            <div className={styles.delivery__images__item}>
              <Image src={delivery2} />
            </div>
            <div className={styles.delivery__images__item}>
              <Image src={delivery3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FurnitureDelivery
