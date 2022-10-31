import React, { useEffect, useRef, useState } from 'react'

import cn from 'classnames'
import Plywood from '@features/Basic/ui/Products/components/Plywood'
import Furniture from '@features/Basic/ui/Products/components/Furniture'
import House from '@features/Basic/ui/Products/components/House'
import { getCookie, setCookie } from 'cookies-next'

import { plywood } from '@features/Basic/ui/Products/mockData'
import Slider from '@features/Basic/ui/Products/components/Slider'
import styles from './index.module.scss'

export enum Blocks {
  Plywood = 'plywood',
  Furniture = 'furniture',
  House = 'house',
}

const Products = () => {
  const [product, setProduct] = useState<Blocks>(Blocks.Plywood)
  const sliderRef = useRef()
  const blockActive = getCookie('ProductBlock')

  const blocks: Record<Blocks, () => JSX.Element> = {
    [Blocks.Plywood]: Plywood,
    [Blocks.Furniture]: Furniture,
    [Blocks.House]: House,
  }

  const toggleProduct = (type: Blocks): void => {
    setProduct(type)
    setCookie('ProductBlock', type)

    if (type === Blocks.Plywood) { // @ts-ignore
      sliderRef?.current.swiper.slideTo(0)
    }
    if (type === Blocks.Furniture) { // @ts-ignore
      sliderRef?.current.swiper.slideTo(1)
    }
    if (type === Blocks.House) { // @ts-ignore
      sliderRef?.current.swiper.slideTo(2)
    }
  }

  const handleChangeSlide = (item: any, index: number) => {
    if (!sliderRef.current) return
    if (index === 2) { // @ts-ignore
      sliderRef?.current.swiper.slideTo(0)
    } else { // @ts-ignore
      sliderRef?.current.swiper.slideTo(index + 1)
    }
  }

  const handleSlideComponent = (swiper: any) => {
    if (!sliderRef.current) return
    const activeSlide = swiper.activeIndex

    if (activeSlide === 0) setProduct(Blocks.Plywood)
    if (activeSlide === 1) setProduct(Blocks.Furniture)
    if (activeSlide === 2) setProduct(Blocks.House)
  }

  const CurrentComponent = blocks[product]

  useEffect(() => {
    if (blockActive) setProduct(blockActive as Blocks)

    if (blockActive === Blocks.Plywood) { // @ts-ignore
      sliderRef?.current.swiper.slideTo(0)
    }
    if (blockActive === Blocks.Furniture) { // @ts-ignore
      sliderRef?.current.swiper.slideTo(1)
    }
    if (blockActive === Blocks.House) { // @ts-ignore
      sliderRef?.current.swiper.slideTo(2)
    }
  }, [blockActive])

  return (
    <div className={styles.products}>
      <div className={styles.products__buttons}>
        <div
          className={cn(styles.products__button, {
            [styles.products__buttonActive]: product === Blocks.Plywood,
          })}
          onClick={() => toggleProduct(Blocks.Plywood)}
        >
          Фанера
        </div>
        <div
          className={cn(styles.products__button, {
            [styles.products__buttonActive]: product === Blocks.Furniture,
          })}
          onClick={() => toggleProduct(Blocks.Furniture)}
        >
          Мебель
        </div>
        <div
          className={cn(styles.products__button, {
            [styles.products__buttonActive]: product === Blocks.House,
          })}
          onClick={() => toggleProduct(Blocks.House)}
        >
          Домостроение
        </div>
      </div>

      <Slider
        sliders={plywood}
        sliderRef={sliderRef}
        autoplay={false}
        onChange={handleSlideComponent}
        onClickModal={handleChangeSlide}
      />
      <CurrentComponent />
    </div>
  )
}

export default Products
