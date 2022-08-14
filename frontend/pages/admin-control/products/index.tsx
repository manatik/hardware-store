import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import { InputType } from '@features/Admin/ui/InputField/types'
import InputField from '@features/Admin/ui/InputField'

const Products: NextPage = () => {
  const onChange = (e: any) => {
    // eslint-disable-next-line no-console
    console.log(123, e)
  }
  return (
    <AdminLayout>
      <ContainerProduct
        title="Продукция"
        buttonName="Добавить товар"
        form={
          <form>
            <InputField
              type={InputType.Text}
              name="title"
              value=''
              label="Название"
              size="md"
              onChange={onChange}
            />

            <InputField
              type={InputType.Text}
              name="title"
              value=''
              label="Описание"
              size="md"
              onChange={onChange}
            />

            <InputField
              type={InputType.Text}
              name="title"
              value=''
              label="Что-то еще"
              size="md"
              onChange={onChange}
            />
          </form>
        }
      />
    </AdminLayout>
  )
}

export default Products
