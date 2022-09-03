import React from 'react'
import { NextPage } from 'next'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import cn from 'classnames'

import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import Card from '@features/Admin/ui/Card'
import InputField from '@features/Admin/ui/InputField'

import { Category } from '@models/Category'
import { CategorySchema } from '@schema/category'
import { InputType } from '@features/Admin/ui/InputField/types'

import { categoryService } from '@services/category/category.service'

import styles from '@features/Admin/ui/Card/index.module.scss'

const Categories: NextPage = ({ categories }: any) => {
  const updateCategory = async (values: { id: string, name: string, article: string }) => {
    try {
      await categoryService.categoryUpdate(values)
      toast.success('Категория успешно обновлена')
    } catch (e) {
      toast.error('Ошибка запроса')
    }
  }

  return (
    <AdminLayout>
      <ContainerProduct
        title="Категории"
      />
      {categories && categories.map((item: Category) => (
        <Card
          key={item.id}
          title={item.name}
          description={item.article}
          remove={false}
          form={
            <>
              <Formik
                initialValues={{
                  name: item.name,
                  article: item.article,
                }}
                validationSchema={CategorySchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values) => {
                  await updateCategory({ ...values, id: item.id })
                }}
              >
                {({
                  errors,
                  setErrors,
                  values,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form
                    className="form"
                    onSubmit={handleSubmit}
                    onChange={() => {
                      setErrors({})
                    }}
                    noValidate
                  >
                    <InputField
                      type={InputType.Text}
                      name="name"
                      value={values.name}
                      error={errors.name}
                      placeholder="Название категории"
                      size="md"
                      onChange={handleChange}
                    />
                    <InputField
                      type={InputType.Text}
                      name="article"
                      value={values.article}
                      error={errors.article}
                      placeholder="Артикул категории"
                      size="md"
                      onChange={handleChange}
                    />

                    <button
                      type="submit"
                      className={cn(
                        styles.card__button,
                        styles.card__buttonEdit,
                      )}
                    >
                      Сохранить изменения
                    </button>
                  </form>)}
              </Formik>
            </>
          }
        />
      ))}
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    return useServerSideProps(ProjectPage.Categories, context, store)
  },
)

export default Categories
