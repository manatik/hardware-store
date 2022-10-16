import React, { useRef } from 'react'
import { Formik } from 'formik'
import { CoatingDensitySchema } from '@schema/calc'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import cn from 'classnames'
import styles from '@features/Admin/ui/Card/index.module.scss'

const WidthPlywood = () => {
  const formRef = useRef<HTMLFormElement | null>(null)

  return (
    <Formik
      initialValues={{
        name: '',
        price: '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={CoatingDensitySchema}
      onSubmit={async (values) => {
        console.log(values)
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
          ref={formRef}
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
            placeholder="5 мм"
            label="Толщина листа"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Number}
            name="price"
            value={values.price}
            error={errors.price}
            placeholder="100₽"
            label="Надбавка к цене за плотность"
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

export default WidthPlywood
