import * as Yup from 'yup'

export const FurnitureSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
  article: Yup.string()
    .trim()
    .required('Введите артикул'),
  width: Yup.number()
    .required('Введите ширину, если она не нужна тогда 0'),
  height: Yup.number()
    .required('Введите высоту, если она не нужна тогда 0'),
  depth: Yup.number()
    .required('Введите глубину, если она не нужна тогда 0'),
})
