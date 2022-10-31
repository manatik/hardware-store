import React from 'react'
import Image from 'next/image'
import img from 'assets/furniture/cabinet-5.webp'
import styles from './index.module.scss'

const FurnitureOfferCard = () => {
  return (
    <div className={styles.offerCard}>
      <div className={styles.offerCard__left}>
        Приглашаем к&nbsp;сотрудничеству дизайнеров интерьера или&nbsp;представителей
        дизайн-студий. Для&nbsp;более оперативного ответа приложите, пожалуйста,
        к&nbsp;письму проект с&nbsp;мебелью или&nbsp;Вашими пожеланиями
        на&nbsp;почту <a href="mailto:info@plywoodmarket.ru">info@plywoodmarket.ru</a>.
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

export default FurnitureOfferCard
