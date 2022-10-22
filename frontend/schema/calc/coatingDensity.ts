import * as Yup from 'yup'

export const CoatingDensitySchema = Yup.object().shape({
  name: Yup.string()
    .test('len', 'Буквы только на латинице', (val: any) => {
      if (!val) return false
      return /^[A-Za-z0-9]+$/i.test(val)
    })
    .trim()
    .required('Введите название'),
  price: Yup.string()
    .trim()
    .required('Введите цену'),
})
