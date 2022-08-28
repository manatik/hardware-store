import * as Yup from 'yup'

export const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
  article: Yup.string()
    .trim()
    .required('Введите артикул'),
})
