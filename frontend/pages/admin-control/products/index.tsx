import React, { useState } from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'

import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import SelectField from '@features/Admin/ui/SelectField'
import { useAppSelector } from '@store/hooks'
import { getCategories } from '@store/category/selector'
import Furniture from '@features/Admin/ui/Products/Furniture'
import Plywood from '@features/Admin/ui/Products/Plywood'
import House from '@features/Admin/ui/Products/House'

const Products: NextPage = () => {
  const categories = useAppSelector(getCategories)
  const [data, setData] = useState({
    name: '',
    value: categories[0].id,
  })

  const handleChange = (target: any) => {
    setData(target)
  }

  return (
    <AdminLayout>
      <ContainerProduct
        title="Продукция"
        buttonName="Добавить товар"
        cards={[]}
        form={
          <>
            <SelectField
              name="Категории"
              onChange={handleChange}
              value={data.value}
              label="Категории товаров"
              options={categories}
              defaultOption="Выберите категорию..."
            />

             {Number(data.value) === 1 && <Plywood />}
             {Number(data.value) === 2 && <House />}
             {Number(data.value) === 3 && <Furniture />}
          </>
        }
      />
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Products, context, store),
)

export default Products
