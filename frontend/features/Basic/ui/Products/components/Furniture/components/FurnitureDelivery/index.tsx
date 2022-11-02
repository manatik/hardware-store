import React, { useEffect } from 'react'

import Image from 'next/image'

import delivery1 from 'assets/furniture/delivery-1.png'
import delivery2 from 'assets/furniture/delivery-2.png'
import delivery3 from 'assets/furniture/delivery-3.png'
import scrollToAnchor from '@utils/scrollToAnchor'
import styles from './index.module.scss'

const FurnitureDelivery = () => {
  useEffect(() => {
    scrollToAnchor()
  }, [])
  return (
    <div
      className={styles.delivery}
      id="delivery"
    >
      <div className={styles.delivery__title}>Доставка</div>
      <div className={styles.delivery__container}>
        <div className={styles.delivery__left}>
          Доставка осуществляется <b>во&nbsp;все&nbsp;регионы России</b>{' '}
          любой транспортной компанией. Напишите нам, и&nbsp;мы&nbsp;рассчитаем
          точную стоимость доставки в&nbsp;ваш&nbsp;город. Часть мебели разборная,
          поставляется в&nbsp;разобранном виде с&nbsp;фурнитурой и&nbsp;инструкцией по&nbsp;сборке.
        </div>
        <div className={styles.delivery__right}>
          Самостоятельно можно рассчитать стоимость доставки следующими транспортными компаниями
          <div className={styles.delivery__images}>
            <a
              href="https://www.cdek-calc.ru/"
              target="_blank"
              rel="noreferrer"
              className={styles.delivery__images__item}
            >
              <Image
                src={delivery1}
                alt=""
              />
            </a>
            <a
              href="https://www.pochta.ru/parcels?addressFrom=6b1bab7d-ee45-4168-a2a6-4ce2880d90d3"
              target="_blank"
              rel="noreferrer"
              className={styles.delivery__images__item}
            >
              <Image
                src={delivery2}
                alt=""
              />
            </a>
            <a
              href="https://pecom.ru/services-are/shipping-request/"
              target="_blank"
              rel="noreferrer"
              className={styles.delivery__images__item}
            >
              <Image
                src={delivery3}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FurnitureDelivery
