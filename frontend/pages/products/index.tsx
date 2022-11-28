import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Layout from '@features/Basic/common/Layout'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import ProductsFeature from '@features/Basic/ui/Products'
import { useAppDispatch } from '@store/hooks'
import { initBasket } from '@store/basket/basketSlice'

import styles from './index.module.scss'

const Products: NextPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initBasket())
  }, [])
  return (
    <Layout
      dark={true}
      absolute={false}
      pageName="ProductionPage"
    >
      <div className={styles.products}>
        <div className={styles.products__inner}>
          <div className={styles.products__title}>Продукты</div>
          <ProductsFeature />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.ProductsPage, context, store),
)

export default Products
