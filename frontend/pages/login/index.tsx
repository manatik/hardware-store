import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import AuthContainer from '@features/Basic/common/AuthContainer'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import { Formik, FormikProps } from 'formik'
import { AuthSchema } from '@schema/auth'
import { storageService } from '@utils/storageService'
import { AuthForm } from 'types/auth'

import styles from './index.module.scss'

const Login = () => {
  const router = useRouter()
  const formRef = useRef<FormikProps<AuthForm>>(null)

  const onRegisterLinkClick = () => {
    storageService.setItem('email', formRef?.current?.values?.email || '')
    router.push('/register')
  }

  useEffect(() => {
    return () => {
      storageService.removeItem('email')
    }
  }, [])
  return (
    <AuthContainer>
      <div className={styles.login}>
        <div className={styles.login__title}>Авторизация Plywood Market</div>
        <div className={styles.login__description}>
          Войдите в аккаунт, что бы воспользоваться всеми возможностями сервиса
        </div>
        <Formik
          innerRef={formRef}
          initialValues={{
            email: storageService.getItem('email') || '',
            password: '',
          }}
          validationSchema={AuthSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values) => {
            // eslint-disable-next-line no-console
            console.log(values)
          }}
        >
          {({
            errors,
            setErrors,
            values,
            handleChange,
            handleSubmit,
          }) => (
            <form
              className={styles.login__form}
              onSubmit={handleSubmit}
              onChange={() => {
                setErrors({})
              }}
              noValidate
            >
              <InputField
                type={InputType.Text}
                name="email"
                value={values.email}
                error={errors.email}
                placeholder="Электронная почта"
                size="md"
                onChange={handleChange}
              />
              <InputField
                type={InputType.Password}
                name="password"
                value={values.password}
                error={errors.password}
                placeholder="Пароль"
                size="md"
                onChange={handleChange}
              />
              <button
                type="submit"
                className={styles.login__submit}
              >
                Войти
              </button>
            </form>
          )}
        </Formik>
        <div className={styles.login__or}>или</div>
      <button
        className={styles.login__submit}
        onClick={onRegisterLinkClick}
      >
        Создать аккаунт
      </button>
      </div>
    </AuthContainer>
  )
}

export default Login
