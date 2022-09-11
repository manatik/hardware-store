import * as Yup from 'yup'

export const FurnitureSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
})
