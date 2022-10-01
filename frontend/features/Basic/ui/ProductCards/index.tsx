import React from 'react'

import Image from 'next/image'
import img from 'assets/slider/slide-3.png'
import styles from './index.module.scss'

const ProductCards = () => {
  return (
    <div className={styles.productCards}>
      <div className={styles.productCards__item}>
        <div className={styles.productCards__item__image}>
          <Image src={img} />
        </div>

        <div className={styles.productCards__item__title}>ФК</div>

        <div className={styles.productCards__item__colors}>
          <div
            style={{ backgroundColor: '#000' }}
            className={styles.productCards__item__color}
          />
        </div>

        <div className={styles.productCards__item__bottom}>
          <div className={styles.productCards__item__price}><b>400</b> руб./шт</div>
          <div className={styles.productCards__item__availability}>В наличии</div>
        </div>
      </div>

      <div className={styles.productCards__item}>
        <div className={styles.productCards__item__image}>
          <Image src={img} />
        </div>

        <div className={styles.productCards__item__title}>ФК</div>

        <div className={styles.productCards__item__colors}>
          <div
            style={{ backgroundColor: '#000' }}
            className={styles.productCards__item__color}
          />
        </div>

        <div className={styles.productCards__item__bottom}>
          <div className={styles.productCards__item__price}><b>400</b> руб./шт</div>
          <div className={styles.productCards__item__availability}>В наличии</div>
        </div>
      </div>
      <div className={styles.productCards__item}>
        <div className={styles.productCards__item__image}>
          <Image src={img} />
        </div>

        <div className={styles.productCards__item__title}>ФК</div>

        <div className={styles.productCards__item__colors}>
          <div
            style={{ backgroundColor: '#000' }}
            className={styles.productCards__item__color}
          />
        </div>

        <div className={styles.productCards__item__bottom}>
          <div className={styles.productCards__item__price}><b>400</b> руб./шт</div>
          <div className={styles.productCards__item__availability}>В наличии</div>
        </div>
      </div>
      <div className={styles.productCards__item}>
        <div className={styles.productCards__item__image}>
          <Image src={img} />
        </div>

        <div className={styles.productCards__item__title}>ФК</div>

        <div className={styles.productCards__item__colors}>
          <div
            style={{ backgroundColor: '#000' }}
            className={styles.productCards__item__color}
          />
        </div>

        <div className={styles.productCards__item__bottom}>
          <div className={styles.productCards__item__price}><b>400</b> руб./шт</div>
          <div className={styles.productCards__item__availability}>В наличии</div>
        </div>
      </div>
      <div className={styles.productCards__item}>
        <div className={styles.productCards__item__image}>
          <Image src={img} />
        </div>

        <div className={styles.productCards__item__title}>ФК</div>

        <div className={styles.productCards__item__colors}>
          <div
            style={{ backgroundColor: '#000' }}
            className={styles.productCards__item__color}
          />
        </div>

        <div className={styles.productCards__item__bottom}>
          <div className={styles.productCards__item__price}><b>400</b> руб./шт</div>
          <div className={styles.productCards__item__availability}>В наличии</div>
        </div>
      </div>
      <div className={styles.productCards__item}>
        <div className={styles.productCards__item__image}>
          <Image src={img} />
        </div>

        <div className={styles.productCards__item__title}>ФК</div>

        <div className={styles.productCards__item__colors}>
          <div
            style={{ backgroundColor: '#000' }}
            className={styles.productCards__item__color}
          />
        </div>

        <div className={styles.productCards__item__bottom}>
          <div className={styles.productCards__item__price}><b>400</b> руб./шт</div>
          <div className={styles.productCards__item__availability}>В наличии</div>
        </div>
      </div>
      <div className={styles.productCards__item}>
        <div className={styles.productCards__item__image}>
          <Image src={img} />
        </div>

        <div className={styles.productCards__item__title}>ФК</div>

        <div className={styles.productCards__item__colors}>
          <div
            style={{ backgroundColor: '#000' }}
            className={styles.productCards__item__color}
          />
        </div>

        <div className={styles.productCards__item__bottom}>
          <div className={styles.productCards__item__price}><b>400</b> руб./шт</div>
          <div className={styles.productCards__item__availability}>В наличии</div>
        </div>
      </div>

    </div>
  )
}

export default ProductCards
