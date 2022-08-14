import React from 'react'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import { NextPage } from 'next'

import ContainerProduct from '@features/Admin/common/ContainerProduct'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'

const Categories: NextPage = () => {
  const onChange = (e: any) => {
    // eslint-disable-next-line no-console
    console.log(123, e)
  }
  return (
    <AdminLayout>
      <ContainerProduct
        title="Категории"
        buttonName="Добавить категорию"
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

export default Categories
