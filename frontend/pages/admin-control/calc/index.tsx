import React, { useState } from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

import SelectField from '@features/Admin/ui/SelectField'
import CoatingDensity from '@features/Admin/ui/Calc/PlywoodItems/components/CoatingDensity'
import Formats from '@features/Admin/ui/Calc/PlywoodItems/components/Formats'
import Sort from '@features/Admin/ui/Calc/PlywoodItems/components/Sort'
import WidthPlywood from '@features/Admin/ui/Calc/PlywoodItems/components/WidthPlywood'
import Type from '@features/Admin/ui/Calc/PlywoodItems/components/Type'
import PhotosPlywood from '@features/Admin/ui/Calc/PlywoodItems/components/Photos'

import {
  features,
  furniture,
  products,
} from '@features/Admin/ui/Calc/mockData'
import PlywoodItems from '@features/Admin/ui/Calc/PlywoodItems'
import FurnitureItems from '@features/Admin/ui/Calc/FurnitureItems'
import Price from '@features/Admin/ui/Calc/FurnitureItems/components/Price'
import PhotosFurniture from '@features/Admin/ui/Calc/FurnitureItems/components/Photos'

const Calc: NextPage = () => {
  const [dataPlywood, setDataPlywood] = useState({
    name: '',
    value: 1,
  })
  const [dataFurniture, setDataFurniture] = useState({
    name: '',
    value: 1,
  })

  const [dataProduct, setDataProduct] = useState({
    name: '',
    value: 1,
  })

  const handleChangeProducts = (target: any) => {
    setDataProduct(target)
  }

  const handleChangeFurniture = (target: any) => {
    setDataFurniture(target)
  }

  const handleChange = (target: any) => {
    setDataPlywood(target)
  }
  return (
    <AdminLayout>
      <ContainerProduct
        title="Калькулятор"
        buttonName="Добавить характеристику"
        form={
          <>
            {Number(dataProduct.value) === 1 && (
              <>
                <SelectField
                  name="Характеристики"
                  onChange={handleChange}
                  value={dataPlywood.value}
                  label="Характеристики"
                  options={features}
                  defaultOption="Выберите характеристику..."
                />

                {Number(dataPlywood.value) === 1 && <CoatingDensity />}
                {Number(dataPlywood.value) === 2 && <Formats />}
                {Number(dataPlywood.value) === 3 && <Sort />}
                {Number(dataPlywood.value) === 4 && <WidthPlywood />}
                {Number(dataPlywood.value) === 5 && <Type />}
                {Number(dataPlywood.value) === 6 && <PhotosPlywood />}
              </>
            )}

            {Number(dataProduct.value) === 2 && (
              <>
                <SelectField
                  name="Характеристики"
                  onChange={handleChangeFurniture}
                  value={dataFurniture.value}
                  label="Характеристики"
                  options={furniture}
                  defaultOption="Выберите характеристику..."
                />

                {Number(dataFurniture.value) === 1 && <Price />}
                {Number(dataFurniture.value) === 2 && <PhotosFurniture />}
              </>
            )}
          </>
        }
      />

      <SelectField
        name="Характеристики товара"
        onChange={handleChangeProducts}
        value={dataProduct.value}
        label="Характеристики товара"
        options={products}
        defaultOption="Выберите тип товара"
      />

      {Number(dataProduct.value) === 1 && <PlywoodItems />}
      {Number(dataProduct.value) === 2 && <FurnitureItems />}
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Calc, context, store),
)

export default Calc
