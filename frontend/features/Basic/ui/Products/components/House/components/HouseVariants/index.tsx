import React, { useRef, useState } from 'react'
import { houseVariantsLinks, ProductLinks } from '@features/Basic/ui/Products/mockData'
import Links from '@features/Basic/ui/Products/components/Links'
import Slider from '@features/Basic/ui/Products/components/Slider'
import {
  slider1, slider2, slider3, slider4, slider5,
} from '@features/Basic/ui/Products/components/House/mockData'
import { SliderMock } from '@features/Basic/ui/Products/types'
import Portal from '@features/Basic/common/Portal'
import Modal from '@features/Basic/common/Modal'
import Image from 'next/image'
import close from 'assets/close.svg'
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
  const [toggleModal, setToggleModal] = useState(null)
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

  const handleModalImage = (image: any) => {
    if (toggleModal) {
      setToggleModal(null)
    } else {
      setToggleModal(image)
    }
  }

  const currentSlidersList: SliderMock = sliders[currentSlider]

  return (
    <div
      className={styles.variant}
      id="options"
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
        />
      </div>
      {toggleModal && (
        <Portal>
          <Modal>
            <div className={styles.variant__modal}>
              <div
                className={styles.variant__close}
                onClick={handleModalImage}
              >
                <Image
                  src={close}
                  alt="close"
                />
              </div>
              <Image
                src={toggleModal}
                alt=""
              />
            </div>
          </Modal>
        </Portal>
      )}
    </div>
  )
}

export default HouseVariants
