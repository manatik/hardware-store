import React from 'react'

import Image from 'next/image'

import image1 from 'assets/products/plywood/production1.webp'
import image2 from 'assets/products/plywood/production2.webp'
import image3 from 'assets/products/plywood/production3.webp'
import styles from './index.module.scss'

const PlywoodProduction = () => {
  return (
    <div
      className={styles.production}
      id="production"
    >
      <div className={styles.production__title}>Производство</div>
      <div className={styles.production__container}>
        <div className={styles.production__text}>
          С помощью стабильных поставок фанеры <b>ГОСТ</b> образца  любого объема,
          сорта и толщины можем гарантировать <b>своевременное и качественное
          выполнение</b> наших услуг по доставке и обработке фанеры, разработке технических решений.
          Грамотно выстроенный технологический процесс обеспечивает
          <b>эффективное производство с минимальными потерями</b>.
        </div>
         <Image src={image1} />
         <Image src={image2} />
         <Image src={image3} />
      </div>
    </div>
  )
}

export default PlywoodProduction
