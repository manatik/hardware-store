import * as Yup from 'yup'

export const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Некорректный адрес электронной почты')
    .required('Введите электронную почту'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(50, 'Пароль может содержать максимум 50 символов')
    .required('Введите пароль'),
})
