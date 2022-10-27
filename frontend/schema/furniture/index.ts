import * as Yup from 'yup'

export const FurnitureSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
  article: Yup.string()
    .trim()
    .required('Введите артикул'),
  width: Yup.string()
    .trim()
    .required('Введите ширину'),
  height: Yup.string()
    .trim()
    .required('Введите высоту'),
  depth: Yup.string()
    .trim()
    .required('Введите глубину'),
})
