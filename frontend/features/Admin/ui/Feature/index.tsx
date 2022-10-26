import React from 'react'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import cn from 'classnames'
import styles from '@features/Admin/ui/Card/index.module.scss'
import { Formik } from 'formik'
import { useAppDispatch } from '@store/hooks'

const FeatureForm = () => {
  const dispatch = useAppDispatch()

  return (
    <Formik
      initialValues={{
        format: '',
        size: '',
        price: '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values) => {
        // @ts-ignore
        await dispatch(fetchAddFormatAsync(values))
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
            name="format"
            value={values.format}
            error={errors.format}
            placeholder="4x8"
            label="Формат"
            size="md"
            onChange={handleChange}
          />
          <InputField
            type={InputType.Text}
            name="size"
            value={values.size}
            error={errors.size}
            placeholder="1220x2440"
            label="Размер"
            size="md"
            onChange={handleChange}
          />
          <InputField
            type={InputType.Number}
            name="price"
            value={values.price}
            error={errors.price}
            placeholder="100Р"
            label="Цена"
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
            Создать товар
          </button>
        </form>)}
    </Formik>
  )
}

export default FeatureForm
