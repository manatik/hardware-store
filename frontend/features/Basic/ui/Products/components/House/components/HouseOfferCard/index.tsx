import React from 'react'

import Image from 'next/image'
import img from 'assets/house/offer.webp'
import styles from './index.module.scss'

const HouseOfferCard = () => {
  return (
    <div className={styles.offerCard}>
      <div className={styles.offerCard__left}>
        Легкий вес  деталей обеспечивает <b>комфортную сборку дома</b>,
        это позволяет использовать данные
        дома на&nbsp;легких фундаментах. Высокий коэффициент использования
        фанеры (до&nbsp;90 %) позволяет <b>экономить до&nbsp;25 %</b> на&nbsp;стоимости
        строительства (при&nbsp;строительстве собственными силами){' '}
        <b>с&nbsp;минимальными отходами</b> при&nbsp;сборке.
      </div>
      <div className={styles.offerCard__right}>
        <Image
          src={img}
          placeholder="blur"
          layout="fill"
          alt=""
        />
      </div>
    </div>
  )
}

export default HouseOfferCard
