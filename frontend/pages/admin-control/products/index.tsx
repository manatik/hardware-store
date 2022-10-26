import React, { useState } from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'

import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import SelectField from '@features/Admin/ui/SelectField'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getCategories } from '@store/category/selector'
import Furniture from '@features/Admin/ui/Products/Furniture'
import Plywood from '@features/Admin/ui/Products/Plywood'
import House from '@features/Admin/ui/Products/House'
import Card from '@features/Admin/ui/Card'
import { plywoodService } from '@services/products/plywood.service'
import { toast } from 'react-toastify'
import { getPlywood } from '@store/products/selector'
import { fetchPlywoodAsync } from '@store/products/productsSlice'
import { PlywoodItem } from '@models/Products'

const Products: NextPage = () => {
  const categories = useAppSelector(getCategories)
  const plywood = useAppSelector(getPlywood)
  const dispatch = useAppDispatch()
  const [data, setData] = useState({
    name: '',
    value: categories[0].id,
  })

  const removeProductPlywood = async (id: string) => {
    try {
      await plywoodService.plywoodRemove(id)
      toast.success('Товар успешно удален')
      dispatch(fetchPlywoodAsync())
    } catch (e: any) {
      toast.error(e.error || 'Ошибка запроса')
    }
  }

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

            {data.value === categories[0].id && <Plywood />}
            {data.value === categories[1].id && <House />}
            {data.value === categories[2].id && <Furniture />}
          </>
        }
      />
      <div>
        {plywood && plywood.map((item: PlywoodItem) => (
          <Card
            id={item.id}
            title={item.name}
            images={item.photos}
            key={item.id}
            description={item.description}
            remove={removeProductPlywood}
            form={(
              <Plywood
                key={item.id}
                item={item}
              />
              )}
          />
        ))}
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Products, context, store),
)

export default Products
