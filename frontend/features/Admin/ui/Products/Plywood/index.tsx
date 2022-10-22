import React, { useRef, useState } from 'react'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import cn from 'classnames'
import { Formik } from 'formik'

import styles from '@features/Admin/ui/Card/index.module.scss'
import { plywoodService } from '@services/products/plywood.service'
import { PlywoodSchema } from '@schema/plywood'
import MultiSelectField from '@features/Admin/ui/MuliSelectField'

import { toast } from 'react-toastify'
import TextAriaField from '@features/Admin/ui/TextAriaField'
import { useAppSelector } from '@store/hooks'
import { getCoatingDensity, getSorts } from '@store/calc/selector'
import SelectField from '@features/Admin/ui/SelectField'
import { available } from '@features/Admin/ui/Products/Plywood/mockData'

const PlywoodFormProduct = () => {
  const sorts = useAppSelector(getSorts)
  const coatingDensity = useAppSelector(getCoatingDensity)
  const [sortData, setSortData] = useState<any>()
  const [coatingDensityData, setCoatingDensityData] = useState<any>()
  const [availableData, setAvailableData] = useState<any>(available[0].id)
  const formRef = useRef<HTMLFormElement | null>(null)

  const addProduct = async (values: any) => {
    try {
      await plywoodService.plywoodAdd({
        ...values,
        sorts: sortData,
        coatingDensity: coatingDensityData,
        available: availableData,
      })
    } catch (e: any) {
      toast.error('Ошибка запроса')
    }
  }

  const handleChangeSortData = (target: any) => {
    const result = target.map((item: any) => Number(item.value))
    setSortData(result)
  }

  const handleChangeCoatingDensityData = (target: any) => {
    const result = target.map((item: any) => Number(item.value))
    setCoatingDensityData(result)
  }

  const handleChangeAvailable = (target: { name: string, value: string }) => {
    const result = available.filter((item) => item.id === target.value)

    setAvailableData(result[0].id)
  }

  return (
    <Formik
      initialValues={{
        name: '',
        article: '',
        categoryId: 3,
        description: '',
        price: '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={PlywoodSchema}
      onSubmit={async (values) => {
        await addProduct(values)
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
            placeholder="Фанера с Юпитера"
            label="Название"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="article"
            value={values.article}
            error={errors.article}
            placeholder="2123-2"
            label="Артикул"
            size="md"
            onChange={handleChange}
          />

           <MultiSelectField
             name="sorts"
             options={sorts}
             label="Сорт"
             size="md"
             onChange={handleChangeSortData}
           />

          <MultiSelectField
            name="sorts"
            options={coatingDensity}
            label="Плотность"
            size="md"
            onChange={handleChangeCoatingDensityData}
          />

          <SelectField
            label="Наличие"
            value={availableData.id}
            onChange={handleChangeAvailable}
            options={available}
            name="available"
            defaultOption="Выберите наличие"
          />

          <InputField
            type={InputType.Number}
            name="price"
            value={values.price}
            error={errors.price}
            placeholder="1000 Р"
            label="Цена"
            size="md"
            onChange={handleChange}
          />

          <TextAriaField
            name="description"
            label="Описание"
            onChange={handleChange}
            value={values.description}
            placeholder="Что-то о товаре"
            error={errors.description}
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

export default PlywoodFormProduct
