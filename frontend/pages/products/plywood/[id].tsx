import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import {
  FurniturePhotosModal, Photo, PlywoodItem,
} from '@models/Products'
import LayoutCard from '@features/Basic/common/LayoutCard'

import { available } from '@features/Admin/ui/Products/Plywood/mockData'
import cn from 'classnames'
import BasketCounter from '@features/Basic/ui/Basket/components/BasketCounter'
import Image from 'next/image'
import Portal from '@features/Basic/common/Portal'
import Modal from '@features/Basic/common/Modal'
import close from 'assets/close.svg'

import styles from '@pages/products/index.module.scss'
import stylesModal from '@features/Basic/ui/Opposite/index.module.scss'
import { Formik } from 'formik'
import { InputType } from '@features/Admin/ui/InputField/types'
import InputField from '@features/Admin/ui/InputField'
import { PlywoodOrderSchema } from '@schema/plywood'
import { useAppDispatch } from '@store/hooks'
import { addProduct } from '@store/basket/basketSlice'
import { toast } from 'react-toastify'
import { removePlywoodItem } from '@store/products/productsSlice'

const CardItemPlywood: NextPage<{ product: PlywoodItem }> = ({ product }) => {
  const dispatch = useAppDispatch()
  const [toggle, setToggle] = useState<boolean>(false)
  const [images, setImages] = useState<FurniturePhotosModal>()
  const [currentImage, setCurrentImage] = useState<Photo>()
  const [count, setCount] = useState<number>(1)

  const toggleModal = (): void => {
    if (!count) return
    setToggle(!toggle)
    document.documentElement.classList.toggle('g_lockscroll')
  }

  const handleChangeImages = (id: string) => {
    const result = product?.photos.filter((item) => item.id === id)
    setImages(result[0])
    setCurrentImage(result[0]?.photos[0])
  }

  const handleSetCurrentImage = (filename: string) => {
    const result = images && images.photos.filter((item) => item.filename === filename)
    if (!result) return
    setCurrentImage(result[0])
  }

  const handleAddProduct = () => {
    setCount(count + 1)
  }

  const handleRemoveProduct = () => {
    if (count > 0) setCount(count - 1)
  }

  const setAvailable = (id: string) => {
    const result = available.filter((item) => item.id === id)
    return result[0].name
  }

  useEffect(() => {
    if (product?.photos[0]) {
      setImages(product?.photos[0])
      setCurrentImage(product?.photos[0]?.photos[0])
    }
  }, [product])

  useEffect(() => {
    return () => {
      dispatch(removePlywoodItem())
    }
  }, [])

  return (
    <LayoutCard>
      <div className={styles.products__item}>
        <div className={styles.products__item__left}>
          <div className={styles.products__item__mobile}>
            {product?.available && (
              <div className={styles.products__item__available}>
                {setAvailable(product?.available)}
              </div>
            )}
            {product?.name && (
              <div className={styles.products__item__title}>
                {product?.name}
              </div>
            )}
            {product?.photos && images && (
              <div className={styles.products__item__colors}>
                <div className={styles.products__item__colorsName}>Цвет</div>
                <div className={styles.products__item__colorsValue}>
                  {product?.photos.map((item) => (
                    <div
                      key={item.id}
                      style={{ backgroundColor: item.color }}
                      onClick={() => handleChangeImages(item.id)}
                      className={cn(styles.products__item__color, {
                        [styles.products__item__colorActive]: images.id === item.id,
                      })}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {product?.photos && currentImage?.path && (
            <div className={styles.products__item__currentImage}>
              <Image
                src={currentImage.path}
                alt={currentImage.filename}
                width={610}
                height={400}
              />
            </div>
          )}
          {product?.photos && currentImage?.path && (
            <div className={styles.products__item__images}>
              {images && images.photos.map((item) => (
                <div
                  key={item.filename}
                  className={cn(styles.products__item__images__item, {
                    [styles.products__item__images__itemActive]:
                    item.filename === currentImage.filename,
                  })}
                  onClick={() => handleSetCurrentImage(item.filename)}
                >
                  <Image
                    src={item.path}
                    alt={item.filename}
                    width={187}
                    height={124}
                    layout="responsive"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.products__item__right}>
          <div className={styles.products__item__desktop}>
            {product?.available && (
              <div className={styles.products__item__available}>
                {setAvailable(product?.available)}
              </div>
            )}
            {product?.name && (
              <div className={styles.products__item__title}>{product.name}</div>
            )}
            {product?.photos && images && (
              <div className={styles.products__item__colors}>
                <div className={styles.products__item__colorsName}>Цвет</div>
                <div className={styles.products__item__colorsValue}>
                  {product?.photos.map((item) => (
                    <div
                      key={item.id}
                      style={{ backgroundColor: item?.color }}
                      onClick={() => handleChangeImages(item?.id)}
                      className={cn(styles.products__item__color, {
                        [styles.products__item__colorActive]: images.id === item.id,
                      })}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {product?.description && (
            <div className={styles.products__item__description}>{product?.description}</div>
          )}
          {product?.sorts?.length > 0 && (
            <div className={styles.products__item__sorts}>
              <div className={styles.products__item__sortsName}>Сорт</div>
              <div className={styles.products__item__sortsValue}>
                {product?.sorts?.map((item) => (
                  item.name
                )).join(', ')}
              </div>
            </div>
          )}
          {product?.coatingDensity?.length > 0 && (
            <div className={styles.products__item__density}>
              <div className={styles.products__item__densityName}>Плотность</div>
              <div className={styles.products__item__densityValue}>
                {product?.coatingDensity?.map((item) => (
                  item.name
                )).join(', ')}
              </div>
            </div>
          )}
          <div className={styles.products__item__price}>
            {product?.price > 0 ? (
              <span><b>от {product?.price}</b> руб./шт</span>
            ) : (
              <div className={styles.products__item__priceLow}>Цена по запросу</div>
            )}
          </div>
          <div className={styles.products__item__basket}>
            <BasketCounter
              count={count}
              deleteProduct={handleRemoveProduct}
              addProduct={handleAddProduct}
            />

            <div
              className={cn(styles.products__item__basket__button, {
                [styles.products__item__disable]: !count,
              })}
              onClick={toggleModal}
            >
              Добавить в корзину
            </div>
          </div>
        </div>
      </div>
      {toggle && (
        <Portal>
          <Modal onClose={toggleModal}>
            <div className={stylesModal.opposite}>
              <div
                className={stylesModal.opposite__close}
                onClick={toggleModal}
              >
                <Image
                  src={close}
                  alt="close"
                />
              </div>
              <div className={stylesModal.opposite__info}>
                Для оформления заказа нужно указать параметры фанеры
              </div>

              <Formik
                initialValues={{
                  format: '',
                  widthPlywood: '',
                  sort: '',
                }}
                validationSchema={PlywoodOrderSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values) => {
                  await dispatch(addProduct({
                    ...product,
                    ...values,
                    count,
                    color: images?.color || '#fff',
                  }))
                  toggleModal()
                  setCount(1)
                  toast.success('Товар добавлен в корзину')
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
                    <InputField
                      type={InputType.Text}
                      name="format"
                      value={values.format}
                      error={errors.format}
                      placeholder="1500x3000"
                      label="Формат листа"
                      size="md"
                      onChange={handleChange}
                    />

                    <InputField
                      type={InputType.Text}
                      name="widthPlywood"
                      value={values.widthPlywood}
                      error={errors.widthPlywood}
                      placeholder="5 мм"
                      label="Толщина листа"
                      size="md"
                      onChange={handleChange}
                    />

                    <InputField
                      type={InputType.Text}
                      name="sort"
                      value={values.sort}
                      error={errors.sort}
                      placeholder="S/ВВВ (ls/ll)"
                      label="Сорт"
                      size="md"
                      onChange={handleChange}
                    />

                    <button
                      type="submit"
                      className={stylesModal.opposite__button}
                    >
                      Добавить в корзину
                    </button>
                  </form>
                )}
                </Formik>
            </div>
          </Modal>
        </Portal>
      )}
    </LayoutCard>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.ProductsPagePlywood, context, store),
)

export default CardItemPlywood
