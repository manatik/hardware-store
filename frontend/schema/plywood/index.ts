import * as Yup from 'yup'

export const PlywoodSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
  article: Yup.string()
    .trim()
    .required('Введите артикул'),
  price: Yup.string()
    .trim()
    .required('Укажите цену'),
  description: Yup.string()
    .trim()
    .required('Укажите описание'),
})

export const PlywoodOrderSchema = Yup.object().shape({
  format: Yup.string()
    .trim()
    .required('Укажите формат листа'),
  widthPlywood: Yup.string()
    .trim()
    .required('Укажите толщину листа'),
  sort: Yup.string()
    .trim()
    .required('Укажите сорт'),
})
