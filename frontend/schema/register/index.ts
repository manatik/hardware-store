import * as Yup from 'yup'

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Некорректный адрес электронной почты')
    .required('Введите электронную почту'),
  passwordVisibility: Yup.boolean(),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(50, 'Пароль должен содержать максимум 50 символов')
    .when('passwordVisibility', {
      is: true,
      then: Yup.string().required('Введите пароль'),
    }),
})
