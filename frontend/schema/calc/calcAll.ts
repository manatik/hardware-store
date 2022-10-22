import * as Yup from 'yup'

export const calcAllSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
  price: Yup.string()
    .trim()
    .required('Введите цену'),
})
