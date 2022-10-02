import React, { useState } from 'react'
import cn from 'classnames'
import { Formik } from 'formik'
import { HouseFormSchema } from '@schema/houseForm'
import { InputType } from '@features/Basic/ui/InputField/types'
import Image from 'next/image'
import Portal from '@features/Basic/common/Portal'
import Modal from '@features/Basic/common/Modal'

import ReactInputMask from 'react-input-mask'
import InputField from '@features/Basic/ui/InputField'
import TextAriaField from '@features/Basic/ui/TextAriaField'

import close from 'assets/close.svg'
import stylesInput from '@features/Basic/ui/InputField/index.module.scss'
import styles from './index.module.scss'

const HouseEquipment = () => {
  const [toggle, setToggle] = useState<boolean>(false)

  const toggleModal = (): void => {
    setToggle(!toggle)
    document.documentElement.classList.toggle('g_lockscroll')
  }

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

      {toggle && <Portal>
        <Modal>
          <div className={styles.equipment__modal}>
            <div
              className={styles.equipment__modal__close}
              onClick={toggleModal}
            >
              <Image src={close} />
            </div>
            <div className={styles.equipment__modal__title}>
              Оставить заявку <br />на домокомплект
            </div>
            <div className={styles.equipment__modal__info}>
              Заполните форму обратной связи и&nbsp;ждите звонка
              в&nbsp;течение суток или&nbsp;позвоните нам&nbsp;по&nbsp;номеру{' '}
              <b>+7&nbsp;909&nbsp;134-90-09</b>
            </div>
            <Formik
              initialValues={{
                name: '',
                phone: '',
                message: '',
              }}
              validationSchema={HouseFormSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={async (values) => {
                console.log(values)
              }}
            >
              {({
                errors,
                setErrors,
                values,
                handleChange,
                handleSubmit,
              }) => (
                <form
                  className={styles.login__form}
                  onSubmit={handleSubmit}
                  onChange={() => {
                    setErrors({})
                  }}
                  noValidate
                >
                  <InputField
                    type={InputType.Text}
                    name="name"
                    placeholder="Имя*"
                    onChange={handleChange}
                    value={values.name}
                    error={errors.name}
                    size="md"
                  />

                  <div className={stylesInput.input__field__wrapper}>
                    <div
                      className={cn(
                        stylesInput.input__field,

                        'md',
                        {
                          [stylesInput.error]: errors.phone,
                          // [styles.disable]: isDisabled,
                        },
                      )}
                    >
                      <ReactInputMask
                        mask="+7 999 999-99-99"
                        type="tel"
                        autoComplete="tel"
                        name="phone"
                        placeholder="+7 999 999-99-99*"
                        onChange={handleChange}
                        value={values.phone}
                        className={stylesInput.input__fieldControl}
                      />
                    </div>
                    {errors.phone && <div className={stylesInput.input__fieldError}>
                      {errors.phone}
                    </div>}
                  </div>

                  <TextAriaField
                    name="message"
                    placeholder="Сообщение"
                    onChange={handleChange}
                    value={values.message}
                  />

                  <button
                    type="submit"
                    className={styles.equipment__modal__button}
                  >
                    Заказать звонок
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </Modal>
      </Portal>}
    </div>
  )
}

export default HouseEquipment
