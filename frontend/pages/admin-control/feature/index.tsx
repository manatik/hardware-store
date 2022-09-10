import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import CardGrid from '@features/Admin/ui/CardGrid'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

import FeatureForm from '@features/Admin/ui/Feature'
import styles from './index.module.scss'

const Feature: NextPage = () => {
  return (
    <AdminLayout>
      <ContainerProduct
        title="Техничесткие характеристики"
        buttonName="Добавить характеристику"
        form={<FeatureForm />}
      />
      <div className={styles.feature}>
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Характеристики Фанеры</div>
          <div className={styles.feature__card__container}>
            {/* <CardGrid */}
            {/*  title="Формат листа" */}
            {/*  description="5x10" */}
            {/*  type="1525x3050" */}
            {/*  price={1300} */}
            {/* /> */}
          </div>
        </div>
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Характеристики Мебели</div>
        </div>
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Характеристики Домов</div>
        </div>
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Feature, context, store),
)

export default Feature
