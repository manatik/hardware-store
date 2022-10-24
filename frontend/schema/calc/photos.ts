import * as Yup from 'yup'

export const photosSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
})
