import React from 'react'

import PlywoodSlider from '@features/Basic/ui/Products/components/Plywood/components/PlywoodSlider'

import { productsSlider } from '@features/Basic/ui/Products/mockData'
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
      <div className={styles.production__container_desktop}>
        <div className={styles.production__text}>
          С помощью стабильных поставок фанеры <b>ГОСТ</b> образца любого объема,
          сорта и толщины можем гарантировать <b>своевременное и качественное
          выполнение</b> наших услуг по доставке и обработке фанеры, разработке технических решений.
          Грамотно выстроенный технологический процесс обеспечивает{' '}
          <b>эффективное производство с минимальными потерями</b>.
        </div>
        <Image
          src={image1}
          width={502}
          height={329}
          alt=""
        />
        <Image
          src={image2}
          width={502}
          height={329}
          alt=""
        />
        <Image
          src={image3}
          width={715}
          height={329}
          alt=""
        />
      </div>

      <div className={styles.production__container_mobile}>
        <div className={styles.production__text}>
          С помощью стабильных поставок фанеры <b>ГОСТ</b> образца любого объема,
          сорта и толщины можем гарантировать <b>своевременное и качественное
          выполнение</b> наших услуг по доставке и обработке фанеры, разработке технических решений.
          Грамотно выстроенный технологический процесс обеспечивает{' '}
          <b>эффективное производство с минимальными потерями</b>.
        </div>

        <PlywoodSlider cards={productsSlider} />
      </div>
    </div>
  )
}

export default PlywoodProduction
