import React, {
  FC, useEffect, useRef, useState,
} from 'react'
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
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getCoatingDensity, getPhotos, getSorts } from '@store/calc/selector'
import SelectField from '@features/Admin/ui/SelectField'
import { available } from '@features/Admin/ui/Products/Plywood/mockData'
import { PlywoodItem } from '@models/Products'
import { fetchPlywoodAsync } from '@store/products/productsSlice'
import { getCategories } from '@store/category/selector'

interface PlywoodFormProductProps {
  item?: PlywoodItem
}
const PlywoodFormProduct: FC<PlywoodFormProductProps> = ({ item }) => {
  const categories = useAppSelector(getCategories)
  const sorts = useAppSelector(getSorts)
  const coatingDensity = useAppSelector(getCoatingDensity)
  const photos = useAppSelector(getPhotos)
  const dispatch = useAppDispatch()
  const [sortData, setSortData] = useState<any>()
  const [photoData, setPhotoData] = useState<any>()
  const [coatingDensityData, setCoatingDensityData] = useState<any>()
  const [availableData, setAvailableData] = useState<any>(available[0].id)
  const formRef = useRef<HTMLFormElement | null>(null)

  const addProduct = async (values: any) => {
    try {
      await plywoodService.plywoodAdd({
        ...values,
        sorts: sortData,
        photos: photoData,
        coatingDensity: coatingDensityData,
        available: availableData,
      })
      toast.success('Товар успешно создан')
      dispatch(fetchPlywoodAsync())
      setAvailableData(available[0].id)
      return 'success'
    } catch (e: any) {
      toast.error(e.error || 'Ошибка запроса')
      return 'error'
    }
  }

  const updateProduct = async (values: any) => {
    try {
      await plywoodService.plywoodUpdate({
        ...values,
        id: item?.id,
        sorts: sortData,
        photos: photoData,
        coatingDensity: coatingDensityData,
        available: availableData,
      })
      toast.success('Товар успешно обновлен')
      dispatch(fetchPlywoodAsync())
    } catch (e: any) {
      toast.error(e.error || 'Ошибка запроса')
    }
  }

  const updateDefaultValueSelect = (defaultValues?: any) => {
    if (!defaultValues) return ''
    return defaultValues?.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  }

  const handleChangeSortData = (target: any) => {
    const result = target.map((item: any) => item.value)
    setSortData(result)
  }

  const handleChangeCoatingDensityData = (target: any) => {
    const result = target.map((item: any) => item.value)
    setCoatingDensityData(result)
  }

  const handleChangePhotoData = (target: any) => {
    const result = target.map((item: any) => item.value)
    setPhotoData(result)
  }

  const handleChangeAvailable = (target: { name: string, value: string }) => {
    const result = available.filter((item) => item.id === target.value)

    setAvailableData(result[0].id)
  }

  useEffect(() => {
    if (item) {
      setSortData(sorts?.map((item: any) => {
        return item.id
      }))
      setCoatingDensityData(coatingDensity?.map((item: any) => {
        return item.id
      }))
      setPhotoData(item.photos?.map((item: any) => {
        return item.id
      }))
      setAvailableData(item.available)
    }
  }, [item])

  return (
    <Formik
      initialValues={{
        name: item?.name || '',
        article: item?.article || '',
        position: item?.position || '',
        categoryId: categories[0].id,
        description: item?.description || '',
        price: item?.price || '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={PlywoodSchema}
      onSubmit={async (values, formikHelpers) => {
        if (item) {
          await updateProduct(values)
        } else {
          const data = await addProduct(values)
          if (data === 'error') return
          formikHelpers.setValues({
            name: '',
            article: '',
            categoryId: categories[0].id,
            position: '',
            description: '',
            price: '',
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
            error={errors.name as string}
            placeholder="Фанера с Юпитера"
            label="Название"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Number}
            name="position"
            value={values.position}
            error={errors.position as string}
            placeholder="1"
            label="Порядковый номер (для отображения на сайте)"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Text}
            name="article"
            value={values.article}
            error={errors.article as string}
            placeholder="2123-2"
            label="Артикул"
            size="md"
            onChange={handleChange}
          />

          <MultiSelectField
            name="sorts"
            options={sorts}
            defaultValue={updateDefaultValueSelect(item?.sorts)}
            label="Сорт"
            size="md"
            onChange={handleChangeSortData}
          />

          <MultiSelectField
            name="coatingDensity"
            options={coatingDensity}
            defaultValue={updateDefaultValueSelect(item?.coatingDensity)}
            label="Плотность"
            size="md"
            onChange={handleChangeCoatingDensityData}
          />

          <MultiSelectField
            name="photos"
            options={photos}
            defaultValue={updateDefaultValueSelect(item?.photos)}
            label="Фотографии"
            size="md"
            onChange={handleChangePhotoData}
          />

          <SelectField
            label="Наличие"
            value={availableData}
            onChange={handleChangeAvailable}
            options={available}
            name="available"
            defaultOption="Выберите наличие"
          />

          <InputField
            type={InputType.Number}
            name="price"
            value={values.price}
            error={errors.price as string}
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
            error={errors.description as string}
          />

          {item ? (
            <button
              type="submit"
              className={cn(
                styles.card__button,
                styles.card__buttonEdit,
              )}
            >
              Сохранить изменения
            </button>
          ) : (
            <button
              type="submit"
              className={cn(
                styles.card__button,
                styles.card__buttonEdit,
              )}
            >
              Создать
            </button>
          )}
        </form>)}
    </Formik>
  )
}

export default PlywoodFormProduct
