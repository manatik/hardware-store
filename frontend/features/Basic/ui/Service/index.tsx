import React from 'react'
import Image from 'next/image'
import { serviceSlide } from '@features/Basic/ui/Products/mockData'

import sanitizeHTML from '@utils/sanitizeHTML'
import styles from './index.module.scss'

const Service = () => {
  return (
    <>
      <div className={styles.service__cards}>
        {serviceSlide && serviceSlide.map((item) => (
          <div
            className={styles.service__card}
            key={item.number}
          >
            <div className={styles.service__card__image}>
              <Image
                src={item.image}
                placeholder="blur"
                width={659}
                height={472}
                layout="responsive"
                alt=""
              />
            </div>
            <div className={styles.service__card__description}>
              <span className={styles.service__card__step}>{item.number} </span>
              <span dangerouslySetInnerHTML={{ __html: sanitizeHTML(item.title) }} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Service
