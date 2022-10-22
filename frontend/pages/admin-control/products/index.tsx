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
import Card from '@features/Admin/ui/Card'
import InputImage from '@features/Admin/ui/InputImage'
import { convertModelToFormData } from '@utils/convertModelToFormData'
import cn from 'classnames'
import AddPhotos from '@features/Admin/ui/Products/Plywood/Forms/AddPhotos'
import { plywoodService } from '@services/products/plywood.service'

const Products: NextPage = ({ products }: any) => {
  const categories = useAppSelector(getCategories)
  const [data, setData] = useState({
    name: '',
    value: categories[0].id,
  })
  const [images, setImages] = useState<File[]>([])

  const handleSaveImages = async (id: number) => {
    const fd = new FormData()

    for (const img of images) {
      fd.append('photos', img.file)
    }

    fd.append('color', '#fff')

    console.log(images)
    const data = await plywoodService.plywoodAddPhoto(id, fd)
    console.log(data)
  }

  const handleChange = (target: any) => {
    setData(target)
  }

  const onChangeImage = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    setImages(imageList)
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
      <div>
        {products && products.map((item: any) => {
          console.log(item)
          return (
            <Card
              title={item.name}
              image={item.photos?.[0]}
              key={item.id}
              description={item.description}
              form={(
                <>
                  <div>asdasdasd</div>
                  <div>asdasdasd</div>
                  <div>asdasdasd</div>
                  <div>asdasdasd</div>
                  <div>asdasdasd</div>
                  <div>asdasdasd</div>
                </>
              )}
              formPhoto={(
                <AddPhotos
                  images={images}
                  id={item.id}
                  onClick={handleSaveImages}
                  onChange={onChangeImage}
                />
              )}
            />
          )
        })}
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Products, context, store),
)

export default Products
