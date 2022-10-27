import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { getCookie, setCookie } from 'cookies-next'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getCategories } from '@store/category/selector'
import { getFurniture, getPlywood } from '@store/products/selector'
import { fetchFurnitureAsync, fetchPlywoodAsync } from '@store/products/productsSlice'
import { plywoodService } from '@services/products/plywood.service'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import SelectField from '@features/Admin/ui/SelectField'
import { FurnitureItemModal, PlywoodItem } from '@models/Products'
import { furnitureService } from '@services/products/furniture.service'

const Plywood: any = dynamic(
  () => import('@features/Admin/ui/Products/Plywood'),
  { ssr: false },
)
const House: any = dynamic(
  () => import('@features/Admin/ui/Products/House'),
  { ssr: false },
)
const FurnitureFormProduct: any = dynamic(
  () => import('@features/Admin/ui/Products/Furniture'),
  { ssr: false },
)
const Card: any = dynamic(
  () => import('@features/Admin/ui/Card'),
  { ssr: false },
)

const Products: NextPage = () => {
  const categories = useAppSelector(getCategories)
  const plywood = useAppSelector(getPlywood)
  const furniture = useAppSelector(getFurniture)
  const dispatch = useAppDispatch()
  const [data, setData] = useState({
    name: '',
    value: '',
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

  const removeProductFurniture = async (id: string) => {
    try {
      await furnitureService.furnitureRemove(id)
      toast.success('Товар успешно удален')
      dispatch(fetchFurnitureAsync())
    } catch (e: any) {
      toast.error(e.error || 'Ошибка запроса')
    }
  }

  const handleChange = (target: any) => {
    setData(target)
  }

  useEffect(() => {
    setData({
      name: '',
      value: getCookie('AdminProductSelect') || categories[0].id,
    })
  }, [])

  useEffect(() => {
    setCookie('AdminProductSelect', data.value)
  }, [data])

  return (
    <AdminLayout>
      <ContainerProduct
        title="Продукция"
        buttonName="Добавить товар"
        cards={[]}
        form={
          <>
            {data.value === categories[0].id && <Plywood />}
            {data.value === categories[1].id && <House />}
            {data.value === categories[2].id && <FurnitureFormProduct />}
          </>
        }
      />

      <SelectField
        name="Категории"
        onChange={handleChange}
        value={data.value}
        label="Категории товаров"
        options={categories}
        defaultOption="Выберите категорию..."
      />

      {data.value === categories[0].id && (
        <div>
          {plywood ? plywood.map((item: PlywoodItem) => (
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
          )) : (
          <div>Пока тут ничего нет</div>
          )}
        </div>
      )}

      {data.value === categories[1].id && (
        <div>В разработке</div>
      )}

      {data.value === categories[2].id && (
        <div>
          {furniture ? furniture.map((item: FurnitureItemModal) => (
            <Card
              id={item.id}
              title={item.name}
              images={item.photos}
              key={item.id}
              description={item.description}
              remove={removeProductFurniture}
              form={(
                <FurnitureFormProduct
                  key={item.id}
                  item={item}
                />
              )}
            />
          )) : (
            <div>Пока тут ничего нет</div>
          )}
        </div>
      )}
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Products, context, store),
)

export default Products
