import React, { useEffect } from 'react'
import LayoutCard from '@features/Basic/common/LayoutCard'

import BasketForm from '@features/Basic/ui/Basket/components/BasketForm'
import BasketCard from '@features/Basic/ui/Basket/components/BasketCard'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { initBasket } from '@store/basket/basketSlice'
import { getBasketEntities } from '@store/basket/selector'
import { PlywoodItem } from '@models/Products'
import Link from 'next/link'
import { ToplineLinks } from '@features/Basic/common/Topline'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import { yandexCounter } from '@utils/metrics/yandexCounter'
import styles from './index.module.scss'

const Basket = () => {
  const dispatch = useAppDispatch()
  const basketEntities = useAppSelector(getBasketEntities)

  useEffect(() => {
    dispatch(initBasket())

    yandexCounter.initReach('BasketPage')
  }, [])

  return (
    <LayoutCard>
      {basketEntities.length > 0 ? (
        <div className={styles.basket__title}>Оформить заказ</div>
      ) : (
        <div className={styles.basket__title}>Корзина</div>
      )}

      {basketEntities.length <= 0 && (
        <div className={styles.basket__low}>
          <div className={styles.basket__description}>
            В корзине пусто, перейдите в каталог, чтобы добавить товары
          </div>
          <div>
            <Link href={ToplineLinks.Products}>
              <a
                type="submit"
                className={styles.basket__button}
              >
                Перейти в каталог
              </a>
            </Link>
          </div>
        </div>
      )}

      {basketEntities && basketEntities.map((item: PlywoodItem) => {
        const id = String(item.id) + item.sort + item.widthPlywood + item.format + item.color

        return (
          <BasketCard
            id={id}
            item={item}
            key={id}
          />
        )
      })}

      {basketEntities.length > 0 && <BasketForm />}
    </LayoutCard>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Basket, context, store),
)

export default Basket
