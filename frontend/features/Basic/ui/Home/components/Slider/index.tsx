import React, {
  FC, ReactElement, useRef, useState,
} from 'react'
import {
  Swiper, SwiperSlide,
} from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper'
import Image from 'next/image'

import slide1 from 'assets/slider/slide-1.webp'
import slide2 from 'assets/slider/slide-2.webp'
import slide3 from 'assets/slider/slide-11.webp'
import slide4 from 'assets/slider/slide-4.webp'
import slide5 from 'assets/slider/slide-5.webp'

import cn from 'classnames'
import styles from './index.module.scss'

const Slider: FC = (): ReactElement => {
  const [pagination, setPagination] = useState<{current: number, total: number}>({
    current: 0,
    total: 0,
  })
  const prevRef = useRef<null | HTMLDivElement>(null)
  const nextRef = useRef<null | HTMLDivElement>(null)

  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        className={styles.slider}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          type: 'progressbar',
          modifierClass: `${styles.slider__progress} `,
          progressbarFillClass: styles.slider__progress__fill,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
          disabledClass: styles.slider__navigation__disable,
        }}
        modules={[Pagination, Navigation]}
        onSlideChange={(swiperCore) => {
          const {
            // @ts-ignore
            imagesLoaded,
            realIndex,
          } = swiperCore

          setPagination({ current: realIndex, total: imagesLoaded })
        }}
        onSwiper={(swiperCore) => {
          const {
            // @ts-ignore
            imagesLoaded,
            realIndex,
          } = swiperCore

          setPagination({ current: realIndex, total: imagesLoaded })
        }}
      >
        <SwiperSlide>
          <div className={cn(styles.slide__wrap, styles.slide__wrap_one)}>
            <div className={styles.slide}>
              <div className={styles.slide__position}>
                <div className={styles.slide__title}>
                  Ценности, которые<br />сохраняются надолго
                </div>
                <div className={styles.slide__description}>
                  Гарантия своевременного
                  и&nbsp;качественного выполнения&nbsp;услуг по&nbsp;обработке фанеры,
                  изготовлению мебели и&nbsp;домов, разработке технических решений
                </div>
              </div>
            </div>
            <Image
              src={slide1}
              // placeholder="blur"
              layout="fill"
              quality={100}
              alt=""
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={cn(styles.slide__wrap, styles.slide__wrap_two)}>
            <div className={styles.slide}>
              <div className={styles.slide__position}>
                <div className={styles.slide__title}>
                  Эксперты по&nbsp;фанере
                </div>
                <div className={styles.slide__description}>
                  Гарантия своевременного
                  и&nbsp;качественного выполнения&nbsp;услуг по&nbsp;обработке фанеры,
                  изготовлению мебели и&nbsp;домов, разработке технических решений
                </div>
              </div>
            </div>
            <Image
              src={slide2}
              layout="fill"
              quality={100}
              // placeholder="blur"
              alt=""
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={cn(styles.slide__wrap, styles.slide__wrap_three)}>
            <div className={styles.slide}>
              <div className={styles.slide__position}>
                <div className={styles.slide__title}>Жизнь, полная фанеры</div>
                <div className={styles.slide__description}>
                  Гарантия своевременного
                  и&nbsp;качественного выполнения&nbsp;услуг по&nbsp;обработке фанеры,
                  изготовлению мебели и&nbsp;домов, разработке технических решений
                </div>
              </div>
            </div>
            <Image
              src={slide3}
              layout="fill"
              quality={100}
              // placeholder="blur"
              alt=""
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.slide__wrap}>
            <div className={styles.slide}>
              <div className={styles.slide__position}>
                <div className={styles.slide__title}>
                  Отражение природы в вашем доме
                </div>
                <div className={styles.slide__description}>
                  Гарантия своевременного
                  и&nbsp;качественного выполнения&nbsp;услуг по&nbsp;обработке фанеры,
                  изготовлению мебели и&nbsp;домов, разработке технических решений
                </div>
              </div>
            </div>
            <Image
              src={slide4}
              layout="fill"
              quality={100}
              // placeholder="blur"
              alt=""
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={cn(styles.slide__wrap, styles.slide__wrap_five)}>
            <div className={styles.slide}>
              <div className={styles.slide__position}>
                <div className={styles.slide__title}>Ценим искусство природы</div>
                <div className={styles.slide__description}>
                  Гарантия своевременного
                  и&nbsp;качественного выполнения&nbsp;услуг по&nbsp;обработке фанеры,
                  изготовлению мебели и&nbsp;домов, разработке технических решений
                </div>
              </div>
            </div>
            <Image
              src={slide5}
              layout="fill"
              quality={100}
              // placeholder="blur"
              alt=""
            />
          </div>
        </SwiperSlide>

        <div className={styles.slider__nav}>
          {pagination && (
            <div className={styles.slider__pagination}>
                <span
                  className={styles.slider__pagination__current}
                >{pagination.current + 1}</span>
              /
              <span className={styles.slider__pagination__total}>5</span>
            </div>
          )}

          <div className={styles.slider__navigation}>
            <div
              className={styles.slider__navigation__prev}
              ref={prevRef}
            />
            <div
              className={styles.slider__navigation__next}
              ref={nextRef}
            />
          </div>
        </div>
      </Swiper>
    </>
  )
}

export default Slider
