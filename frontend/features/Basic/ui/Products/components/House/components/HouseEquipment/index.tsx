import React, { useEffect, useState } from 'react'

import Opposite from '@features/Basic/ui/Opposite'
import scrollToAnchor from '@utils/scrollToAnchor'
import styles from './index.module.scss'

const HouseEquipment = () => {
  const [toggle, setToggle] = useState<boolean>(false)

  const toggleModal = (): void => {
    setToggle(!toggle)
    document.documentElement.classList.toggle('g_lockscroll')
  }

  useEffect(() => {
    scrollToAnchor()
  }, [])

  return (
    <div
      className={styles.equipment}
      id="options"
    >
      <div className={styles.equipment__title}>
        Варианты комплектации
      </div>

      <div className={styles.equipment__content}>
        <div className={styles.equipment__card}>
          <div className={styles.equipment__card__top}>
            <div className={styles.equipment__card__title}>Домокомлект</div>
            <ul className={styles.equipment__card__body}>
              <li>— Домокомплект из&nbsp;фанеры
                (стеновые панели, дверные и&nbsp;оконные проёмы)
              </li>
              <li>— Крепление стеновых панелей</li>
              <li>— Межкомнатные перегородки</li>
            </ul>
          </div>

          <div
            className={styles.equipment__card__button}
            onClick={toggleModal}
          >
            Оставить заявку
          </div>
        </div>

        <div className={styles.equipment__card}>
          <div className={styles.equipment__card__top}>
            <div className={styles.equipment__card__title}>Теплый контур</div>
            <ul className={styles.equipment__card__body}>
              <li>— Свайный фундамент</li>
              <li>— Утепление</li>
              <li>— Кровля</li>
              <li>— Обшивка стен</li>
              <li>— Межкомнатные перегородки</li>
              <li>— Гидроизоляция</li>
              <li>— Окна и двери</li>
              <li>— Вентиляция</li>
            </ul>
          </div>

          <div
            className={styles.equipment__card__button}
            onClick={toggleModal}
          >
            Оставить заявку
          </div>
        </div>

        <div className={styles.equipment__card}>
          <div className={styles.equipment__card__top}>
            <div className={styles.equipment__card__title}>Под отделку</div>
            <ul className={styles.equipment__card__body}>
              <li>— Водоподготовка</li>
              <li>— Канализация</li>
              <li>— Электроснабжение</li>
              <li>— Гидроизоляция душевой</li>
              <li>— Подготовка стен к отделке</li>
            </ul>
          </div>

          <div
            className={styles.equipment__card__button}
            onClick={toggleModal}
          >
            Оставить заявку
          </div>
        </div>

        <div className={styles.equipment__card}>
          <div className={styles.equipment__card__top}>
            <div className={styles.equipment__card__title}>Под ключ</div>
            <ul className={styles.equipment__card__body}>
              <li>— Отделка стен</li>
              <li>— Сантехника и&nbsp;электротехника</li>
              <li>— Напольное покрытие</li>
              <li>— Плинтуса</li>
              <li>— Межкомнатные двери</li>
              <li>— Кондиционирование</li>
              <li>— Мебель</li>
              <li>— Душевые и&nbsp;кухонные принадлежности</li>
            </ul>
          </div>

          <div
            className={styles.equipment__card__button}
            onClick={toggleModal}
          >
            Оставить заявку
          </div>
        </div>
      </div>

      {toggle && (
        <Opposite
          title="Оставить заявку на домокомплект"
          onClose={toggleModal}
        />
      )}
    </div>
  )
}

export default HouseEquipment
