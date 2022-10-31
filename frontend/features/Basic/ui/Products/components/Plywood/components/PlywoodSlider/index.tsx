import React, { FC } from 'react'
import Image from 'next/image'
import sanitizeHTML from '@utils/sanitizeHTML'
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ServiceSlide } from '@features/Basic/ui/Products/types'
import styles from './index.module.scss'

const PlywoodSlider: FC<any> = ({ cards }) => {
  return (
    <div className={styles.slider}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        className={styles.slider}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          type: 'bullets',
          modifierClass: `${styles.slider__pagination} `,
          bulletClass: styles.slider__pagination__bullet,
          bulletActiveClass: styles.slider__pagination__bulletActive,
        }}
        modules={[Pagination, Autoplay]}
      >
        {cards && cards.map((item: ServiceSlide) => (
          <SwiperSlide key={item.number}>
            <div className={styles.slider__card}>
              <div className={styles.slider__card__image}>
                <Image
                  src={item.image}
                  width={614}
                  height={400}
                  placeholder="blur"
                  alt=""
                />
              </div>
              {item.title && (
                <div className={styles.slider__card__description}>
                  {item.number && <span className={styles.slider__card__step}>{item.number} </span>}
                  <span dangerouslySetInnerHTML={{ __html: sanitizeHTML(item.title) }} />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default PlywoodSlider
