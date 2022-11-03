import * as Yup from 'yup'

export const calcAllSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
  price: Yup.string()
    .trim()
    .required('Введите цену'),
  description: Yup.string()
    .trim()
    .required('Введите название которое будет отображаться на сайте'),
})

export const namePriceSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
  price: Yup.string()
    .trim()
    .required('Введите цену'),
})

export const calcParams = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
  value: Yup.string()
    .trim()
    .required('Введите значение'),
  description: Yup.string()
    .trim()
    .required('Введите название которое будет отображаться на сайте'),
})
