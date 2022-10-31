import React, { useEffect, useRef, useState } from 'react'
import { houseVariantsLinks, ProductLinks } from '@features/Basic/ui/Products/mockData'
import Links from '@features/Basic/ui/Products/components/Links'
import Slider from '@features/Basic/ui/Products/components/Slider'
import {
  slider1, slider2, slider3, slider4, slider5,
} from '@features/Basic/ui/Products/components/House/mockData'
import { SliderMock } from '@features/Basic/ui/Products/types'
import scrollToAnchor from '@utils/scrollToAnchor'
import { PhotoSwipe } from 'react-photoswipe'
import styles from './index.module.scss'

enum Sliders {
  One = '#one',
  Two = '#two',
  Three = '#three',
  Four = '#four',
  Five = '#five',
}

const HouseVariants = () => {
  const [currentSlider, setCurrentSlider] = useState<Sliders>(Sliders.One)
  const [zoom, setZoom] = useState<SliderMock>([])
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const sliderRef = useRef()

  const handleCurrentSlider = (id: Sliders) => {
    setCurrentSlider(id)
    if (sliderRef) { // @ts-ignore
      sliderRef?.current.swiper.slideTo(0)
    }
  }

  const sliders: Record<Sliders, SliderMock> = {
    [Sliders.One]: slider1,
    [Sliders.Two]: slider2,
    [Sliders.Three]: slider3,
    [Sliders.Four]: slider4,
    [Sliders.Five]: slider5,
  }

  const currentSlidersList: SliderMock = sliders[currentSlider]

  const handleModalImage = (itemCurrent: any) => {
    const arr = [...currentSlidersList]
    const lol = arr.findIndex((item) => itemCurrent.id === item.id)
    arr.splice(lol, 1)
    arr.unshift(itemCurrent)

    setZoom(arr)
    setToggleModal(!toggleModal)
  }

  useEffect(() => {
    scrollToAnchor()
  }, [])

  return (
    <div
      className={styles.variant}
      id="plan"
    >
      <div className={styles.variant__title}>
        Варианты планировок
      </div>

      <Links
        links={houseVariantsLinks}
        defaultLink={ProductLinks.OneHouseDefault}
        onClick={handleCurrentSlider}
      />

      <div className={styles.variant__container}>
        <Slider
          sliders={currentSlidersList}
          sliderRef={sliderRef}
          onClickModal={handleModalImage}
          autoplay={false}
          nav={true}
        />
      </div>

      {toggleModal && (
        <PhotoSwipe
          isOpen={true}
          items={zoom.map((item) => {
            return {
              src: item.image.src,
              thumbnail: item.image.src,
              w: item.width,
              h: item.height,
            }
          })}
          options={{
            bgOpacity: 0.7,
          }}
          onClose={() => setToggleModal(!toggleModal)}
        />
      )}
    </div>
  )
}

export default HouseVariants
