import React, {
  FC, MutableRefObject, useEffect, useState,
} from 'react'

import {
  Autoplay, Pagination, Navigation,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { SliderMock } from '@features/Basic/ui/Products/types'

import cn from 'classnames'
import deviceTypeByWidth, { DeviceType } from '@utils/getDeviceType'
import styles from './index.module.scss'

interface SliderProps {
  sliders: SliderMock,
  nav?: boolean,
  sliderRef?: MutableRefObject<unknown>,
  autoplay?: boolean,
  onChange?: (swiper: any) => void,
  onClickModal?: (image: any, index: number) => void,
}

const Slider: FC<SliderProps> = ({
  sliders,
  sliderRef,
  autoplay = true,
  onChange,
  onClickModal,
  nav = false,
}) => {
  const [device, setDevice] = useState<DeviceType>()

  useEffect(() => {
    window.addEventListener('resize', () => {
      setDevice(deviceTypeByWidth())
    })

    return () => {
      window.removeEventListener('resize', () => {
        setDevice(deviceTypeByWidth())
      })
    }
  }, [])

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
        navigation={device !== DeviceType.smartphone ? nav : false}
        pagination={{
          type: 'bullets',
          modifierClass: `${styles.slider__pagination} `,
          bulletClass: styles.slider__pagination__bullet,
          bulletActiveClass: styles.slider__pagination__bulletActive,
        }}
        onSlideChange={(swiper) => (onChange ? onChange(swiper) : () => null)}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {sliders && sliders.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div
              className={cn(styles.slider__slide, {
                [styles.slider__slide__first]: index === 0 && item.title === 'plywood',
                [styles.slider__slide__noCover]: item.title === 'noCover',
              })}
              onClick={() => (onClickModal ? onClickModal(item, index) : () => null)}
            >
              <Image
                src={item.image}
                layout="responsive"
                height={item.height}
                width={item.width}
                placeholder="blur"
                alt={`slide${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider
