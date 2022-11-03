import React, { useRef } from 'react'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import cn from 'classnames'
import styles from '@features/Admin/ui/Card/index.module.scss'
import { Formik } from 'formik'
import { CalcData } from '@models/Calc'
import { toast } from 'react-toastify'
import { fetchCalcAddParamsAsync } from '@store/calc/calcSlice'
import { useAppDispatch } from '@store/hooks'
import { namePriceSchema } from '@schema/calc/calcAll'

const Type = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const dispatch = useAppDispatch()

  const addType = async (data: CalcData) => {
    try {
      await dispatch(fetchCalcAddParamsAsync({ ...data, id: 5 }))
      toast.success('Вид фанеры успешно добавлен')
    } catch (e) {
      toast.error('Ошибка сервера')
    }
  }

  return (
    <Formik
      initialValues={{
        name: '',
        price: 0,
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={namePriceSchema}
      onSubmit={async (values, formikHelpers) => {
        await addType(values as CalcData)
        formikHelpers.setValues({
          name: '',
          price: 0,
        })
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
            placeholder="Ламинированная (F/W)"
            label="Вид фанеры"
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

export default Type
