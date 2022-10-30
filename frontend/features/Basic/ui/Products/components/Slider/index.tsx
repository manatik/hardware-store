import React, { FC, MutableRefObject } from 'react'

import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { SliderMock } from '@features/Basic/ui/Products/types'

import cn from 'classnames'
import styles from './index.module.scss'

interface SliderProps {
  sliders: SliderMock,
  sliderRef?: MutableRefObject<unknown>,
  autoplay?: boolean,
  onChange?: (swiper: any) => void,
  onClickModal?: (image: any) => void,
}
const Slider: FC<SliderProps> = ({
  sliders,
  sliderRef,
  autoplay = true,
  onChange,
  onClickModal,
}) => {
  return (
    <div
      id="slider"
      className={styles.slider}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={autoplay ? {
          delay: 3000,
          disableOnInteraction: false,
        } : false}
        // @ts-ignore
        ref={sliderRef}
        pagination={{
          type: 'bullets',
          modifierClass: `${styles.slider__pagination} `,
          bulletClass: styles.slider__pagination__bullet,
          bulletActiveClass: styles.slider__pagination__bulletActive,
        }}
        onSlideChange={(swiper) => (onChange ? onChange(swiper) : () => null)}
        modules={[Autoplay, Pagination]}
      >
        {sliders && sliders.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div
              className={cn(styles.slider__slide, {
                [styles.slider__slide__first]: index === 0 && item.title === 'plywood',
                [styles.slider__slide__noCover]: item.title === 'noCover',
              })}
              onClick={() => (onClickModal ? onClickModal(item.image) : () => null)}
            >
              <Image
                src={item.image}
                layout="responsive"
                height={item.height}
                width={item.width}
                placeholder="blur"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider
