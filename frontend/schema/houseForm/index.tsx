import * as Yup from 'yup'

export const HouseFormSchema = Yup.object().shape({
  fio: Yup.string()
    .required('Введите имя'),
  phone: Yup.string()
    .test('len', 'Некорректно введен номер телефона', (val: any) => {
      if (!val) return false
      const valDashes = val.replace(/-|_|\s/g, '').length
      return valDashes === 12
    })
    .required('Необходимо ввести номер телефона'),
})
