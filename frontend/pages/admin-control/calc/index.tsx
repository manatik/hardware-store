import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import { getCookie, setCookie } from 'cookies-next'
import {
  features,
  FeaturesEnum,
  furniture,
  FurnitureEnum,
  products,
  ProductsEnum,
} from '@features/Admin/ui/Calc/mockData'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import SelectField from '@features/Admin/ui/SelectField'

import CoatingDensity from '@features/Admin/ui/Calc/PlywoodItems/components/CoatingDensity'
import Formats from '@features/Admin/ui/Calc/PlywoodItems/components/Formats'
import Sort from '@features/Admin/ui/Calc/PlywoodItems/components/Sort'
import WidthPlywood from '@features/Admin/ui/Calc/PlywoodItems/components/WidthPlywood'
import Type from '@features/Admin/ui/Calc/PlywoodItems/components/Type'
import PhotosPlywood from '@features/Admin/ui/Calc/PlywoodItems/components/Photos'

import Price from '@features/Admin/ui/Calc/FurnitureItems/components/Price'
import PhotosFurniture from '@features/Admin/ui/Calc/FurnitureItems/components/Photos'
import Params from '@features/Admin/ui/Calc/FurnitureItems/components/Params'

const PlywoodItems: any = dynamic(
  () => import('@features/Admin/ui/Calc/PlywoodItems'),
  { ssr: false },
)
const FurnitureItems: any = dynamic(
  () => import('@features/Admin/ui/Calc/FurnitureItems'),
  { ssr: false },
)

const Calc: NextPage = () => {
  const [dataPlywood, setDataPlywood] = useState({
    name: '',
    value: 0,
  })
  const [dataFurniture, setDataFurniture] = useState({
    name: '',
    value: 0,
  })

  const [dataProduct, setDataProduct] = useState({
    name: '',
    value: 0,
  })

  const handleChangeProducts = (target: any) => {
    setDataProduct({ name: target.name, value: Number(target.value) })
  }

  const handleChangeFurniture = (target: any) => {
    setDataFurniture({ name: target.name, value: Number(target.value) })
  }

  const handleChange = (target: any) => {
    setDataPlywood({ name: target.name, value: Number(target.value) })
  }

  useEffect(() => {
    setDataProduct({
      name: '',
      value: Number(getCookie('AdminCalcSelect')) || 0,
    })
  }, [])

  useEffect(() => {
    setCookie('AdminCalcSelect', dataProduct.value)
  }, [dataProduct])

  return (
    <AdminLayout>
      <ContainerProduct
        title="Характеристики товаров"
        buttonName="Добавить характеристику"
        form={
          <>
            {Number(dataProduct.value) === ProductsEnum.PLYWOOD && (
              <div style={{ width: '100%' }}>
                <SelectField
                  name="Характеристики"
                  onChange={handleChange}
                  value={dataPlywood.value}
                  label="Характеристики"
                  options={features}
                  defaultOption="Выберите характеристику..."
                />

                {dataPlywood.value === FeaturesEnum.COATING_DENSITY && <CoatingDensity />}
                {dataPlywood.value === FeaturesEnum.FORMATS && <Formats />}
                {dataPlywood.value === FeaturesEnum.SORT && <Sort />}
                {dataPlywood.value === FeaturesEnum.WIDTH_PLYWOOD && <WidthPlywood />}
                {dataPlywood.value === FeaturesEnum.TYPE && <Type />}
                {dataPlywood.value === FeaturesEnum.PHOTOS_PLYWOOD && <PhotosPlywood />}
              </div>
            )}

            {Number(dataProduct.value) === ProductsEnum.FURNITURE && (
              <div style={{ width: '100%' }}>
                <SelectField
                  name="Характеристики"
                  onChange={handleChangeFurniture}
                  value={dataFurniture.value}
                  label="Характеристики"
                  options={furniture}
                  defaultOption="Выберите характеристику..."
                />

                {dataFurniture.value === FurnitureEnum.PRICE && <Price />}
                {dataFurniture.value === FurnitureEnum.PHOTOS_FURNITURE && <PhotosFurniture />}
                {dataFurniture.value === FurnitureEnum.PARAMS_FURNITURE && <Params />}
              </div>
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

      {dataProduct.value === ProductsEnum.PLYWOOD && <PlywoodItems />}
      {dataProduct.value === ProductsEnum.FURNITURE && <FurnitureItems />}
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Calc, context, store),
)

export default Calc
