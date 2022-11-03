import React from 'react'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import cn from 'classnames'
import styles from '@features/Admin/ui/Card/index.module.scss'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { furnitureService } from '@services/products/furniture.service'
import { fetchFurnitureAsync } from '@store/products/productsSlice'
import { useAppDispatch } from '@store/hooks'
import { calcParams } from '@schema/calc/calcAll'

const Params = () => {
  const dispatch = useAppDispatch()
  const addPrice = async (values: { name: string, value: string }) => {
    try {
      const data = await furnitureService.furnitureParamsAdd(values)
      if (data.success) {
        await dispatch(fetchFurnitureAsync())
        toast.success('Прайс успешно добавлен')
      }
      return 'success'
    } catch (e: any) {
      toast.error(e.message || 'Ошибка сервера')
      return 'error'
    }
  }
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        value: '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={calcParams}
      onSubmit={async (values, formikHelpers) => {
        const data = await addPrice(values)
        if (data === 'success') {
          formikHelpers.setValues({
            name: '',
            description: '',
            value: '',
          })
        }
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
            placeholder="С большой подушкой и покраской - диван"
            label="Название"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="description"
            value={values.description}
            error={errors.description}
            placeholder="С большой подушкой и покраской"
            label="Название на сайте"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="value"
            value={values.value}
            error={errors.value}
            placeholder="22 см"
            label="Значение"
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

export default Params
