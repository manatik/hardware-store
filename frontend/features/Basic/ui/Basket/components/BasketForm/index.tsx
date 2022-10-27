import React from 'react'
import cn from 'classnames'
import { Formik } from 'formik'
import { BasketFormSchema } from '@schema/basketForm'

import InputField from '@features/Basic/ui/InputField'
import ReactInputMask from 'react-input-mask'
import stylesInput from '@features/Basic/ui/InputField/index.module.scss'
import { InputType } from '@features/Basic/ui/InputField/types'
import { orderService } from '@services/order/order.service'
import { group } from 'radash'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getCategories } from '@store/category/selector'
import { getBasketEntities } from '@store/basket/selector'
import { FurnitureItemModal } from '@models/Products'
import { toast } from 'react-toastify'
import { removeBasket } from '@store/basket/basketSlice'
import styles from './index.module.scss'

const BasketForm = () => {
  const categories = useAppSelector(getCategories)
  const basket = useAppSelector(getBasketEntities)
  const dispatch = useAppDispatch()

  const handleSubmit = async (values: any) => {
    const basketCategory = group(basket, (item: FurnitureItemModal) => item.category.id)
    const data = {
      ...values,
      products: {
        plywood: basketCategory[categories[0].id],
        furniture: basketCategory[categories[2].id],
      },
    }
    try {
      await orderService.orderEmail(data)
      const payload = await orderService.orderAdd(data)
      if (payload.success) {
        toast.success('Мы приняли ваш заказ')
        await dispatch(removeBasket())
      }
    } catch (e: any) {
      toast.success(e.message || 'Ошибка сервера')
    }
  }
  return (
    <div className={styles.basketForm}>
      <div className={styles.basketForm__title}>Контактные данные</div>
      <Formik
        initialValues={{
          fio: '',
          phone: '',
          email: '',
        }}
        validationSchema={BasketFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values) => {
          await handleSubmit(values)
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
              name="fio"
              placeholder="Имя*"
              onChange={handleChange}
              value={values.fio}
              error={errors.fio}
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
                  placeholder="Телефон*"
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
              placeholder="Email"
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
