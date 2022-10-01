import React, { FC } from 'react'

import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { SliderMock } from '@features/Basic/ui/Products/types'

import styles from './index.module.scss'

const Slider: FC<{sliders: SliderMock}> = ({ sliders }) => {
  return (
    <div className={styles.slider}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          type: 'bullets',
          modifierClass: `${styles.slider__pagination} `,
          bulletClass: styles.slider__pagination__bullet,
          bulletActiveClass: styles.slider__pagination__bulletActive,
        }}
        modules={[Pagination, Autoplay]}
      >
        {sliders && sliders.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.slider__slide}>
              <Image
                src={item.image}
                layout="responsive"
                height={430}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider
