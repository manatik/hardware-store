import React from 'react'
import Image from 'next/image'
import info from 'assets/furniture/info.webp'
import styles from './index.module.scss'

const FurnitureInfo = () => {
  return (
    <div
      className={styles.info}
      id="furniture"
    >
      <div className={styles.info__left}>
        <div className={styles.info__title}>
          Причины выбрать <br />мебель из фанеры
        </div>
        <div className={styles.info__image}>
           <Image
             src={info}
             width={715}
             placeholder="blur"
             layout="fill"
             alt=""
           />
        </div>
      </div>
      <div className={styles.info__right}>
        <div className={styles.info__item}>
          <div className={styles.info__item__title}>
            Прочность
          </div>
          <div className={styles.info__item__text}>
            Фанера обладает суперпрочными свойствами, в&nbsp;конструкциях
            эта&nbsp;прочность приумножается. Способность поглощать энергию
            при&nbsp;ударе без&nbsp;разрушений, т.к. фанера обладает большим запасом прочности.
          </div>
        </div>

        <div className={styles.info__item}>
          <div className={styles.info__item__title}>
            Привлекательность
          </div>
          <div className={styles.info__item__text}>
            Не&nbsp;будем исключать и&nbsp;такое свойство,
            как&nbsp;привлекательный внешний вид&nbsp;и&nbsp;эстетичность
          </div>
        </div>

        <div className={styles.info__item}>
          <div className={styles.info__item__title}>
            Устойчивость
          </div>
          <div className={styles.info__item__text}>
            Следующее свойство влагостойкости и&nbsp;водостойкости
            позволяет смело использовать данный материал как&nbsp;дома,
            так&nbsp;и&nbsp;на&nbsp;улице
          </div>
        </div>

        <div className={styles.info__item}>
          <div className={styles.info__item__title}>
            Экологичность
          </div>
          <div className={styles.info__item__text}>
            Фанеру относят к&nbsp;натуральным и&nbsp;безопасным материалам
          </div>
        </div>
      </div>
    </div>
  )
}

export default FurnitureInfo
