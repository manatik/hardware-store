import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import AuthContainer from '@features/Basic/common/AuthContainer'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import { Formik, FormikProps } from 'formik'
import { AuthSchema } from '@schema/auth'
import { storageService } from '@utils/storageService'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import { fetchAuthAsync } from '@store/auth/authSlice'
import { getAuthInfo, getAuthError, getAuthLoading } from '@store/auth/selector'
import cn from 'classnames'
import { initBasket } from '@store/basket/basketSlice'
import { AuthModal } from '@models/Auth'
import styles from './index.module.scss'

const Login = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(getAuthInfo)
  const isError = useAppSelector(getAuthError)
  const isLoading = useAppSelector(getAuthLoading)
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const formRef = useRef<FormikProps<AuthModal>>(null)

  const onRegisterLinkClick = async () => {
    storageService.setItem('email', formRef?.current?.values?.email || '')
    await router.push('/')
  }

  useEffect(() => {
    if (auth?.success) router.push('/')
    if (isError && auth?.error) setError(auth.message)
  }, [auth, isError])

  useEffect(() => {
    dispatch(initBasket())

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
            await dispatch(fetchAuthAsync(values))
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
                setError('')
              }}
              noValidate
            >
              <InputField
                type={InputType.Text}
                name="email"
                value={values.email}
                error={errors.email || error}
                placeholder="Электронная почта"
                isDisabled={isLoading}
                size="md"
                onChange={handleChange}
              />
              <InputField
                type={InputType.Password}
                name="password"
                value={values.password}
                error={errors.password}
                placeholder="Пароль"
                isDisabled={isLoading}
                size="md"
                onChange={handleChange}
              />
              <button
                type="submit"
                className={cn(styles.login__submit, {
                  disable: isLoading,
                })}
              >
                Войти
              </button>
            </form>
          )}
        </Formik>
        <div className={styles.login__or}>или</div>
      <button
        className={cn(styles.login__submit, {
          disable: isLoading,
        })}
        onClick={onRegisterLinkClick}
      >
        Создать аккаунт
      </button>
      </div>
    </AuthContainer>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Login, context, store),
)

export default Login
