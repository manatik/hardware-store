import React from 'react'
import { calcAllSchema } from '@schema/calc'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import cn from 'classnames'
import styles from '@features/Admin/ui/Card/index.module.scss'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { furnitureService } from '@services/products/furniture.service'

const Price = () => {
  const addPrice = async (values: { name: string, price: number }) => {
    try {
      await furnitureService.furnitureFeatureAdd(values)
      toast.success('Прайс успешно добавлен')
    } catch (e: any) {
      toast.error(e.message || 'Ошибка сервера')
    }
  }
  return (
    <Formik
      initialValues={{
        name: '',
        // description: '',
        // value: '',
        price: 0,
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={calcAllSchema}
      onSubmit={async (values) => {
        await addPrice(values)
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
            placeholder="С большой подушкой и покраской"
            label="Название"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Number}
            name="price"
            value={values.price}
            error={errors.price}
            placeholder="22 500р"
            label="Стоимость"
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
            Создать
          </button>
        </form>)}
    </Formik>
  )
}

export default Price
