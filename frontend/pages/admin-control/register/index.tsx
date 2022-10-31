import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import AuthContainer from '@features/Basic/common/AuthContainer'
import { Formik, FormikProps } from 'formik'
import { AuthSchema } from '@schema/auth'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import { storageService } from '@utils/storageService'

import styles from '@pages/admin-control/login/index.module.scss'
import { AuthModal } from '@models/Auth'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { fetchRegisterAsync } from '@store/register/registerSlice'
import { getRegisterLoading, getRegisterError, getRegisterInfo } from '@store/register/selector'
import cn from 'classnames'
import { initBasket } from '@store/basket/basketSlice'

const Register = () => {
  const dispatch = useAppDispatch()
  const register = useAppSelector(getRegisterInfo)
  const isError = useAppSelector(getRegisterError)
  const isLoading = useAppSelector(getRegisterLoading)
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const formRef = useRef<FormikProps<AuthModal>>(null)

  const onLoginLinkClick = async () => {
    storageService.setItem('email', formRef?.current?.values?.email || '')
    await router.push('/admin-control/login')
  }

  useEffect(() => {
    if (register?.success) router.push('/')
    if (isError && register?.error) setError(register.message)
  }, [register, isError])

  useEffect(() => {
    dispatch(initBasket())

    return () => {
      storageService.removeItem('email')
    }
  }, [])
  return (
    <AuthContainer>
      <div className={styles.login}>
        <div className={styles.login__title}>Регистрация Plywood Market</div>
        <div className={styles.login__description}>
          Создайте аккаунт, что бы воспользоваться всеми возможностями сервиса
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
            await dispatch(fetchRegisterAsync(values))
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
                disabled={isLoading}
              >
                Создать аккаунт
              </button>
              <button
                className={cn(styles.login__submit, {
                  disable: isLoading,
                })}
                onClick={onLoginLinkClick}
                disabled={isLoading}
              >
                Уже есть аккаунт
              </button>
            </form>
          )}
        </Formik>
      </div>
    </AuthContainer>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Register, context, store),
)

export default Register
