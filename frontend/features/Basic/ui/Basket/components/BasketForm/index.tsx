import React from 'react'
import cn from 'classnames'
import { Formik } from 'formik'
import { BasketFormSchema } from '@schema/basketForm'

import InputField from '@features/Basic/ui/InputField'
import ReactInputMask from 'react-input-mask'
import stylesInput from '@features/Basic/ui/InputField/index.module.scss'
import { InputType } from '@features/Basic/ui/InputField/types'

import styles from './index.module.scss'

const BasketForm = () => {
  return (
    <div className={styles.basketForm}>
      <div className={styles.basketForm__title}>Контактные данные</div>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          email: '',
        }}
        validationSchema={BasketFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
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
            className={styles.basketForm__form}
            onSubmit={handleSubmit}
            onChange={() => {
              setErrors({})
            }}
            noValidate
          >
            <InputField
              type={InputType.Text}
              name="name"
              placeholder="Миронова Алена Максимовна"
              onChange={handleChange}
              value={values.name}
              error={errors.name}
              size="md"
            />

            <div className={stylesInput.input__field__wrapper}>
              <div
                className={cn(stylesInput.input__field, 'md', {
                  [stylesInput.error]: errors.phone,
                  // [styles.disable]: isDisabled,
                })}
              >
                <ReactInputMask
                  mask="+7 999 999-99-99"
                  type="tel"
                  autoComplete="tel"
                  name="phone"
                  placeholder="+7 999 999-99-99"
                  onChange={handleChange}
                  value={values.phone}
                  className={stylesInput.input__fieldControl}
                />
              </div>
              {errors.phone && <div className={stylesInput.input__fieldError}>
                {errors.phone}
              </div>}
            </div>

            <InputField
              type={InputType.Email}
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              value={values.email}
              error={errors.email}
              size="md"
            />

            <button
              type="submit"
              className={styles.basketForm__button}
            >
              Оформить заказ
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default BasketForm
