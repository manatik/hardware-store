import React from 'react'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import CardGrid from '@features/Admin/ui/CardGrid'

import styles from './index.module.scss'

const feature = () => {
  const onChange = (e: any) => {
    // eslint-disable-next-line no-console
    console.log(123, e)
  }

  return (
    <AdminLayout>
      <ContainerProduct
        title="Техничесткие характеристики"
      />
      <div className={styles.feature}>
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Характеристики Фанеры</div>
          <div className={styles.feature__card__container}>
            <CardGrid
              title="Формат листа"
              description="4x8"
              type="1220x2440"
              price={1300}
            />
            <CardGrid
              title="Формат листа"
              description="4x8"
              type="2440x1220"
              price={1300}
            />
            <CardGrid
              title="Формат листа"
              description="8x4"
              type="1250x2500"
              price={1100}
            />
            <CardGrid
              title="Формат листа"
              description="8x4"
              type="2500x1250"
              price={1100}
            />
            <CardGrid
              title="Формат листа"
              description="5x10"
              type="1500x1300"
              price={300}
            />
            <CardGrid
              title="Формат листа"
              description="5x10"
              type="1525x3050"
              price={1300}
            />
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

export default feature
