import React from 'react'
// import InputField from '@features/Admin/ui/InputField'
// import { InputType } from '@features/Admin/ui/InputField/types'
// import cn from 'classnames'
// import styles from '@features/Admin/ui/Card/index.module.scss'
// import { Formik } from 'formik'
// import { FurnitureSchema } from '@schema/furniture'
// import TextAriaField from '@features/Admin/ui/TextAriaField'

const HouseFormProduct = () => {
  return (
    <div className="form">В разработке</div>
    // <Formik
    //   initialValues={{
    //     name: '',
    //     image: '',
    //     price: '',
    //     format: '',
    //     description: '',
    //   }}
    //   validationSchema={FurnitureSchema}
    //   validateOnChange={false}
    //   validateOnBlur={false}
    //   onSubmit={async () => {
    //   }}
    // >
    //   {({
    //     errors,
    //     setErrors,
    //     values,
    //     handleChange,
    //     handleSubmit,
    //   }) => (
    //     <form
    //       className="form"
    //       onSubmit={handleSubmit}
    //       onChange={() => {
    //         setErrors({})
    //       }}
    //       noValidate
    //     >
    //       <InputField
    //         type={InputType.Text}
    //         name="name"
    //         value={values.name}
    //         error={errors.name}
    //         placeholder="Дом такой-то"
    //         label="Название"
    //         size="md"
    //         onChange={handleChange}
    //       />
    //       <InputField
    //         type={InputType.Text}
    //         name="image"
    //         value={values.image}
    //         error={errors.image}
    //         placeholder="2123-2"
    //         label="Артикул"
    //         size="md"
    //         onChange={handleChange}
    //       />
    //       <InputField
    //         type={InputType.Number}
    //         name="price"
    //         value={values.price}
    //         error={errors.price}
    //         placeholder="100Р"
    //         label="Цена"
    //         size="md"
    //         onChange={handleChange}
    //       />
    //       <InputField
    //         type={InputType.Text}
    //         name="format"
    //         value={values.format}
    //         error={errors.format}
    //         label="Характеристики"
    //         size="md"
    //         onChange={handleChange}
    //       />
    //
    //       <TextAriaField
    //         name="description"
    //         value={values.description}
    //         label="Описание"
    //         onChange={handleChange}
    //       />
    //
    //       <button
    //         type="submit"
    //         className={cn(
    //           styles.card__button,
    //           styles.card__buttonEdit,
    //         )}
    //       >
    //         Создать
    //       </button>
    //     </form>)}
    // </Formik>
  )
}

export default HouseFormProduct
