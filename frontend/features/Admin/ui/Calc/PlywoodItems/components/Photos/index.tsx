import React, { useRef, useState } from 'react'
import { photosSchema } from '@schema/calc'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import cn from 'classnames'
import styles from '@features/Admin/ui/Card/index.module.scss'
import { Formik } from 'formik'
import AddPhotos from '@features/Admin/ui/Products/Plywood/Forms/AddPhotos'
import { ImageType } from 'react-images-uploading'
import { toast } from 'react-toastify'
import { fetchPlywoodAsync } from '@store/products/productsSlice'
import { useAppDispatch } from '@store/hooks'
import { photosService } from '@services/calc/photos/photos.servise'

const Photos = () => {
  const dispatch = useAppDispatch()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [images, setImages] = useState<ImageType[]>([])
  const [color, setColor] = useState<string>('#fff')

  const handleSaveImages = async (name: string) => {
    const fd = new FormData()

    // eslint-disable-next-line no-restricted-syntax
    for (const img of images) {
      fd.append('photos', img.file || '')
    }

    fd.append('color', color || '#fff')
    fd.append('name', name)

    try {
      const { message } = await photosService.add(fd)
      toast.success(message || 'Фотографии успешно добавлены')
      dispatch(fetchPlywoodAsync())
      setImages([])
      setColor('#fff')
      return 'success'
    } catch (e: any) {
      toast.error(e.error || 'Ошибка запроса')
      return 'error'
    }
  }

  const onChangeImage = (imageList: any) => {
    setImages(imageList)
  }

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={photosSchema}
      onSubmit={async (values, formikHelpers) => {
        const data = await handleSaveImages(values.name)
        if (data === 'success') formikHelpers.setValues({ name: '' })
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
            placeholder="Ламинированная - коричневая"
            label="Название + цвет"
            size="md"
            onChange={handleChange}
          />

          <AddPhotos
            images={images}
            color={color}
            onChangeColor={setColor}
            onChange={onChangeImage}
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

export default Photos
