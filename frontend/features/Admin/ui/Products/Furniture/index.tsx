import React, { FC, useEffect, useState } from 'react'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import cn from 'classnames'
import styles from '@features/Admin/ui/Card/index.module.scss'
import { Formik } from 'formik'
import { FurnitureSchema } from '@schema/furniture'
import TextAriaField from '@features/Admin/ui/TextAriaField'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getCategories } from '@store/category/selector'
import { available } from '@features/Admin/ui/Products/Plywood/mockData'
import SelectField from '@features/Admin/ui/SelectField'
import MultiSelectField from '@features/Admin/ui/MuliSelectField'
import { getFurnitureFeature, getFurnitureParams, getFurniturePhotos } from '@store/products/selector'
import { toast } from 'react-toastify'
import { fetchFurnitureAsync } from '@store/products/productsSlice'
import { furnitureService } from '@services/products/furniture.service'
import { FurnitureItemModal } from '@models/Products'

interface FurnitureFormProductProps {
  item?: FurnitureItemModal
}
const FurnitureFormProduct: FC<FurnitureFormProductProps> = ({ item }) => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(getCategories)
  const photos = useAppSelector(getFurniturePhotos)
  const feature = useAppSelector(getFurnitureFeature)
  const params = useAppSelector(getFurnitureParams)
  const [availableData, setAvailableData] = useState<any>(available[0].id)
  const [photoData, setPhotoData] = useState<any>()
  const [pricesData, setPricesData] = useState<any>()
  const [paramsData, setParamsData] = useState<any>()

  const addProduct = async (values: any) => {
    try {
      await furnitureService.furnitureAdd({
        ...values,
        features: pricesData,
        photos: photoData,
        available: availableData,
        parameters: paramsData,
      })
      toast.success('Товар успешно создан')
      dispatch(fetchFurnitureAsync())
      setAvailableData(available[0].id)
      return 'success'
    } catch (e: any) {
      toast.error(e.error || 'Ошибка запроса')
      return 'error'
    }
  }

  const updateProduct = async (values: any) => {
    try {
      await furnitureService.furnitureUpdate({
        ...values,
        id: item?.id,
        features: pricesData,
        photos: photoData,
        available: availableData,
        parameters: paramsData,
      })
      toast.success('Товар успешно обновлен')
      dispatch(fetchFurnitureAsync())
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

  const handleChangePricesData = (target: any) => {
    const result = target.map((item: any) => item.value)

    setPricesData(result)
  }

  const handleChangeParamsData = (target: any) => {
    const result = target.map((item: any) => item.value)

    setParamsData(result)
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
      setPricesData(item.features?.map((item: any) => {
        return item.id
      }))
      setPhotoData(item.photos?.map((item: any) => {
        return item.id
      }))
      setParamsData(item.parameters?.map((item: any) => {
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
        categoryId: categories[2].id,
        position: item?.position || '',
        width: item?.width || 0,
        height: item?.height || 0,
        depth: item?.depth || 0,
        description: item?.description || '',
      }}
      validationSchema={FurnitureSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, formikHelpers) => {
        if (item) {
          await updateProduct(values)
        } else {
          const data = await addProduct(values)
          if (data === 'error') return
          formikHelpers.setValues({
            name: '',
            article: '',
            categoryId: categories[2].id,
            position: '',
            width: 0,
            height: 0,
            depth: 0,
            description: '',
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
            placeholder="Стул"
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
            error={errors.article}
            placeholder="2123-2"
            label="Артикул"
            size="md"
            onChange={handleChange}
          />

          <SelectField
            label="Наличие"
            value={availableData}
            onChange={handleChangeAvailable}
            options={available}
            name="available"
            defaultOption="Выберите наличие"
          />

          {feature && (
            <MultiSelectField
              name="prices"
              options={feature}
              defaultValue={updateDefaultValueSelect(item?.features)}
              label="Прайсы"
              size="md"
              onChange={handleChangePricesData}
            />
          )}

          {params && (
            <MultiSelectField
              name="params"
              options={params}
              defaultValue={updateDefaultValueSelect(item?.parameters)}
              label="Доп характеристика"
              size="md"
              onChange={handleChangeParamsData}
            />
          )}

          {photos && (
            <MultiSelectField
              name="photos"
              options={photos}
              defaultValue={updateDefaultValueSelect(item?.photos)}
              label="Фотографии"
              size="md"
              onChange={handleChangePhotoData}
            />
          )}

          <InputField
            type={InputType.Number}
            name="height"
            value={values.height}
            error={errors.height}
            placeholder="77,6 см"
            label="Высота"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Number}
            name="width"
            value={values.width}
            error={errors.width}
            placeholder="140 см"
            label="Ширина"
            size="md"
            onChange={handleChange}
          />

          <InputField
            type={InputType.Number}
            name="depth"
            value={values.depth}
            error={errors.depth}
            placeholder="81,6 см"
            label="Глубина"
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

export default FurnitureFormProduct
