import React, { FC, useState } from 'react'
import cn from 'classnames'
import { PropsCardGrid } from '@features/Admin/ui/CardGrid/types'

import { InputType } from '@features/Admin/ui/InputField/types'
import InputField from '@features/Admin/ui/InputField'
import Portal from '@features/Basic/common/Portal'
import Modal from '@features/Basic/common/Modal'
import { calcAllSchema, CoatingDensitySchema } from '@schema/calc'
import { Formik } from 'formik'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { namePriceSchema } from '@schema/calc/calcAll'
import styles from './index.module.scss'

const MySwal = withReactContent(Swal)

const CardGrid: FC<PropsCardGrid> = ({
  title,
  price = 0,
  description,
  paramValue,
  id = '',
  endpoint = 0,
  onUpdate,
  onRemove,
  images,
  type,
}) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const schemaFurniture = endpoint === 2 ? CoatingDensitySchema : calcAllSchema
  const schema = type === 'furniture' ? schemaFurniture : namePriceSchema
  const onToggle = () => {
    setToggle(!toggle)
  }

  const handleRemove = async (id: string, endpoint: number) => {
    const { isConfirmed } = await MySwal.fire({
      title: 'Вы уверены?',
      text: 'Вы действительно хотите удалить?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e23535',
      cancelButtonColor: '#24822C',
      confirmButtonText: 'Да, удалить!',
      cancelButtonText: 'Отмена',
    })

    if (isConfirmed) {
      onRemove?.(id, endpoint)
    }
  }

  return (
    <div className={styles.cardGrid__wrapper}>
      <div className={styles.cardGrid}>
        <div className={styles.cardGrid__top}>
          {images && (
            <div className={styles.cardGrid__images}>
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                pagination={true}
                modules={[Pagination]}
              >
                {images.map((item) => {
                  return (
                    <SwiperSlide key={item.filename}>
                      <div className={styles.cardGrid__image}>
                        <Image
                          src={item.path}
                          alt={item.filename}
                          layout="fill"
                        />
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          )}
          {title && <div className={styles.cardGrid__top__title}>{title}</div>}
          {price! > 0 && <div className={styles.cardGrid__top__price}>цена {price}₽</div>}
        </div>

        <div className={styles.cardGrid__bottom}>
          <div className={styles.cardGrid__bottom__buttons}>
            {onUpdate && (
              <div
                className={cn(styles.cardGrid__button, styles.cardGrid__buttonEdit)}
                onClick={onToggle}
              >
                Редактировать
              </div>
            )}
            {onRemove && (
              <div
                className={cn(styles.cardGrid__button, styles.cardGrid__buttonRemove)}
                onClick={() => handleRemove(id, endpoint)}
              >
                Удалить
              </div>
            )}
          </div>
          {toggle && <Portal>
              <Modal onClose={onToggle}>
                  <Formik
                    initialValues={{
                      id,
                      name: title,
                      price: price || 0,
                      paramValue,
                      description: description || '',
                    }}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={schema}
                    onSubmit={async (values) => {
                      if (onUpdate) {
                        await onUpdate(id, values, endpoint)
                        onToggle()
                      }
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
                        onSubmit={handleSubmit}
                        onChange={() => {
                          setErrors({})
                        }}
                        noValidate
                      >
                        <div className={styles.form}>
                          <button
                            onClick={onToggle}
                            className={styles.form__close}
                          >
                          </button>
                          <div className={styles.form__title}>{title}</div>
                          <div className={styles.cardGrid__bottom__inputs}>
                            <InputField
                              type={InputType.Text}
                              name="name"
                              value={values.name}
                              error={errors.name}
                              label="Название"
                              size="md"
                              onChange={handleChange}
                            />

                            {description?.length && description?.length > 0 && (
                              <InputField
                                type={InputType.Text}
                                name="description"
                                value={values.description || ''}
                                error={errors.description}
                                label="Название На сайте"
                                size="md"
                                onChange={handleChange}
                              />
                            )}

                            {paramValue?.length && paramValue?.length > 0 && (
                              <InputField
                                type={InputType.Text}
                                name="paramValue"
                                value={values.paramValue || ''}
                                error={errors.paramValue}
                                label="Значение параметра"
                                size="md"
                                onChange={handleChange}
                              />
                            )}

                            {price >= 0 && (
                              <InputField
                                type={InputType.Number}
                                name="price"
                                value={values.price}
                                label="Цена"
                                size="md"
                                onChange={handleChange}
                              />
                            )}

                            <button
                              className={cn(styles.cardGrid__button, styles.cardGrid__buttonEdit)}
                              type="submit"
                            >
                              Сохранить
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
              </Modal>
          </Portal>}
        </div>
      </div>
    </div>
  )
}

export default CardGrid
