import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useAppDispatch } from '@store/hooks'
import { addProduct } from '@store/basket/basketSlice'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import LayoutCard from '@features/Basic/common/LayoutCard'
import styles from '@pages/products/index.module.scss'
import cn from 'classnames'
import Image from 'next/image'
import BasketCounter from '@features/Basic/ui/Basket/components/BasketCounter'
import { FurnitureItemModal, FurniturePhotosModal, Photo } from '@models/Products'
import { available } from '@features/Admin/ui/Products/Plywood/mockData'
import { toast } from 'react-toastify'
import { removeFurnitureItem } from '@store/products/productsSlice'

const CardItem: NextPage<{ product: FurnitureItemModal }> = ({ product }) => {
  const dispatch = useAppDispatch()
  const [images, setImages] = useState<FurniturePhotosModal>()
  const [currentImage, setCurrentImage] = useState<Photo>()
  const [count, setCount] = useState<number>(1)

  const handleSetCurrentImage = (filename: string) => {
    const result = images && images.photos.filter((item) => item?.filename === filename)
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
    return result[0]?.name || ''
  }

  const onSubmit = async () => {
    await dispatch(addProduct({
      ...product,
      count,
    }))
    setCount(1)
    toast.success('Товар добавлен в корзину')
  }

  useEffect(() => {
    if (product?.photos[0]) {
      setImages(product?.photos[0])
      setCurrentImage(product?.photos[0]?.photos[0])
    }
  }, [product])

  useEffect(() => {
    return () => {
      dispatch(removeFurnitureItem())
    }
  }, [])

  return (
    <LayoutCard>
      <div className={styles.products__item}>
        <div className={styles.products__item__left}>
          <div
            className={cn(
              styles.products__item__mobile,
              styles.products__item__mobile_furniture,
            )}
          >
            {product?.available && (
              <div className={styles.products__item__available}>
                {setAvailable(product?.available)}
              </div>
            )}
            {product?.name && (
              <div className={styles.products__item__title}>
                {product?.name || ''}
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
          {product?.photos && (
            <div className={styles.products__item__images}>
              {images?.photos?.map((item) => (
                <div
                  key={item?.filename}
                  className={cn(styles.products__item__images__item, {
                    [styles.products__item__images__itemActive]:
                    item?.filename === currentImage?.filename,
                  })}
                  onClick={() => handleSetCurrentImage(item?.filename)}
                >
                  <Image
                    src={item?.path}
                    alt={item?.filename}
                    width={187}
                    height={124}
                    layout="responsive"
                  />
                </div>
              ))}
            </div>
          )}
          <div
            className={cn(
              styles.products__item__mobile,
              styles.products__item__mobile_furniture,
              styles.products__item__mobile_description,
            )}
          >
            {product?.description && (
              <div className={styles.products__item__description}>
                {product?.description}
              </div>
            )}
            {product?.height > 0 && (
              <div className={styles.products__item__param}>
                <div className={styles.products__item__paramName}>Высота</div>
                <div>{Intl.NumberFormat('ru-RU').format(product.height)} см</div>
              </div>
            )}
             {product?.width > 0 && (
              <div className={styles.products__item__param}>
                <div className={styles.products__item__paramName}>Ширина</div>
                <div>{Intl.NumberFormat('ru-RU').format(product.width)} см</div>
              </div>
             )}
            {product?.depth > 0 && (
              <div className={styles.products__item__param}>
                <div className={styles.products__item__paramName}>Глубина</div>
                <div>{Intl.NumberFormat('ru-RU').format(product?.depth)} см</div>
              </div>
            )}
            {product?.parameters && (
              product.parameters.map((item) => (
                <div
                  key={item.id}
                  className={styles.products__item__param}
                >
                  <div className={styles.products__item__paramName}>
                    {item.description}
                  </div>
                  <div>{item.value}</div>
                </div>
              ))
            )}
            {product?.features && <div className={styles.products__item__prices__title}>Цена</div>}
            {product?.features
              && product?.features.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className={styles.products__item__prices}
                  >
                    <div className={styles.products__item__pricesValue}>{item?.description}</div>
                    <div className={styles.products__item__pricesName}>
                      {Intl.NumberFormat('ru-RU').format(item?.price)} руб.
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={styles.products__item__right}>
          <div className={styles.products__item__desktop}>
            {product?.available && (
              <div className={styles.products__item__available}>
                {setAvailable(product?.available)}
              </div>
            )}
            {product?.name && (
              <div className={styles.products__item__title}>{product?.name}</div>
            )}
            {product?.description && (
              <div className={styles.products__item__description}>
                {product?.description}
              </div>
            )}
            {product?.height > 0 && (
              <div className={styles.products__item__param}>
                <div className={styles.products__item__paramName}>Высота</div>
                <div>{Intl.NumberFormat('ru-RU').format(product?.height)} см</div>
              </div>
            )}
            {product?.width > 0 && (
              <div className={styles.products__item__param}>
                <div className={styles.products__item__paramName}>Ширина</div>
                <div>{Intl.NumberFormat('ru-RU').format(product?.width)} см</div>
              </div>
            )}
            {product?.depth > 0 && (
              <div className={styles.products__item__param}>
                <div className={styles.products__item__paramName}>Глубина</div>
                <div>{Intl.NumberFormat('ru-RU').format(product?.depth)} см</div>
              </div>
            )}
            {product?.parameters && (
              product.parameters.map((item) => (
                <div
                  key={item.id}
                  className={styles.products__item__param}
                >
                  <div className={styles.products__item__paramName}>
                    {item.description}
                  </div>
                  <div>{item.value}</div>
                </div>
              ))
            )}
            {product?.features && <div className={styles.products__item__prices__title}>Цена</div>}
            {product?.features
              && product?.features.map((item) => (
                <div
                  key={item?.id}
                  className={styles.products__item__prices}
                >
                  <div className={styles.products__item__pricesValue}>{item?.description}</div>
                  <div className={styles.products__item__pricesName}>
                    {Intl.NumberFormat('ru-RU').format(item?.price)} руб.
                  </div>
                </div>
              ))}
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
               onClick={onSubmit}
             >
              Добавить в корзину
             </div>
          </div>
        </div>
      </div>
    </LayoutCard>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    return useServerSideProps(ProjectPage.ProductsPageFurniture, context, store)
  },
)

export default CardItem
