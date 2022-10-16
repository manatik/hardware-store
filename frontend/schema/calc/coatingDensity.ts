import * as Yup from 'yup'

export const CoatingDensitySchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
})
