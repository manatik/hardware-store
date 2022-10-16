import React, { useState } from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
// import CardGrid from '@features/Admin/ui/CardGrid'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

import SelectField from '@features/Admin/ui/SelectField'
import CoatingDensity from '@features/Admin/ui/Calc/CoatingDensity'
import Formats from '@features/Admin/ui/Calc/Formats'
import Sort from '@features/Admin/ui/Calc/Sort'
import WidthPlywood from '@features/Admin/ui/Calc/WidthPlywood'
import Type from '@features/Admin/ui/Calc/Type'

import { features } from '@features/Admin/ui/Calc/mockData'
import styles from './index.module.scss'

const Calc: NextPage = ({ formatPlywood }: any) => {
  const [data, setData] = useState({
    name: '',
    value: 1,
  })

  const handleChange = (target: any) => {
    setData(target)
  }
  return (
    <AdminLayout>
      <ContainerProduct
        title="Калькулятор"
        buttonName="Добавить характеристику"
        form={
          <>
            <SelectField
              name="Характеристики"
              onChange={handleChange}
              value={data.value}
              label="Характеристики"
              options={features}
              defaultOption="Выберите характеристику..."
            />

            {Number(data.value) === 1 && <CoatingDensity />}
            {Number(data.value) === 2 && <Formats />}
            {Number(data.value) === 3 && <Sort />}
            {Number(data.value) === 4 && <WidthPlywood />}
            {Number(data.value) === 5 && <Type />}
          </>
        }
      />
      <div className={styles.feature}>
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Характеристики Фанеры</div>
          <div className={styles.feature__card__container}>
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
  (store) => async (context) => useServerSideProps(ProjectPage.Calc, context, store),
)

export default Calc
