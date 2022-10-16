import React, { useEffect, useRef, useState } from 'react'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import cn from 'classnames'
import { Formik } from 'formik'

import styles from '@features/Admin/ui/Card/index.module.scss'
import { plywoodService } from '@services/products/plywood.service'
import { PlywoodSchema } from '@schema/plywood'
import MultiSelectField from '@features/Admin/ui/MuliSelectField'
import { flat } from 'radash'
import { toast } from 'react-toastify'

const PlywoodFormProduct = () => {
  const [option, setOption] = useState()
  const [formatsData, setFormatsData] = useState<any>()
  const formRef = useRef<HTMLFormElement | null>(null)

  const addProduct = async (values: any) => {
    try {
      await plywoodService.plywoodAdd({
        ...values,
        formatIds: formatsData,
      })
    } catch (e: any) {
      toast.error('Ошибка запроса')
    }
  }

  const handleCahnge = () => {
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const options = Object.entries(formats).map(([_, value]) => {
    //   // @ts-ignore
    //   const result = value && Array.from(value).map((item) => {
    //     // @ts-ignore
    //     return { value: item.id, label: `${item.format} => ${item.size}` }
    //   })
    //   return result
    // })
    //
    // // @ts-ignore
    // setOption(flat(options))
  }

  const handleChangeFormatsData = (target: any) => {
    const result = target.map((item: any) => String(item.value))
    setFormatsData(result)
  }

  useEffect(() => {
    handleCahnge()
  }, [])

  return (
    <Formik
      initialValues={{
        name: '',
        article: '',
        price: '',
        categoryId: 3,
        surfaceIds: [],
        width: '',
        class: '',
        densityPlywood: '',
        glue: '',
        membraneType: '',
        densityMembrane: '',
        guaranteePeriod: '',
        humidity: '',
        wearResistance: '',
        photos: [],
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

          <MultiSelectField
            defaultValue={option}
            options={option}
            onChange={handleChangeFormatsData}
            name="formatIds"
            label="Выберите формат доски"
          />

          <InputField
            type={InputType.Number}
            name="width"
            value={values.width}
            error={errors.width}
            placeholder="6-40"
            label="Толщина листа мм"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="class"
            value={values.class}
            error={errors.class}
            placeholder="Е1"
            label="Класс эмиссии формальдегида"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="densityPlywood"
            value={values.densityPlywood}
            error={errors.densityPlywood}
            placeholder="650-730"
            label="Плотность фанеры"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="glue"
            value={values.glue}
            error={errors.glue}
            placeholder="ФСФ"
            label="Категория клея"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="membraneType"
            value={values.membraneType}
            error={errors.membraneType}
            placeholder="Фенольная"
            label="Тип пленки"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="densityMembrane"
            value={values.densityMembrane}
            error={errors.densityMembrane}
            placeholder="120 / 220"
            label="Плотность пленки"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="guaranteePeriod"
            value={values.guaranteePeriod}
            error={errors.guaranteePeriod}
            placeholder="5 лет"
            label="Гарантийный срок хранения"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="humidity"
            value={values.humidity}
            error={errors.humidity}
            placeholder="<12"
            label="Влажность фанеры %"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="wearResistance"
            value={values.wearResistance}
            error={errors.wearResistance}
            placeholder="360-740"
            label="Износостойкость"
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

export default PlywoodFormProduct
