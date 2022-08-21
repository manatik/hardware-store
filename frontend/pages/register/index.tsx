import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import AuthContainer from '@features/Basic/common/AuthContainer'
import { Formik, FormikProps } from 'formik'
import { AuthSchema } from '@schema/auth'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import { storageService } from '@utils/storageService'

import styles from '@pages/login/index.module.scss'
import { AuthForm } from 'types/auth'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import { useAppDispatch } from '@store/hooks'
import { fetchRegisterAsync } from '@store/register/registerSlice'

const Register = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const formRef = useRef<FormikProps<AuthForm>>(null)

  const onLoginLinkClick = () => {
    storageService.setItem('email', formRef?.current?.values?.email || '')
    router.push('/login')
  }

  useEffect(() => {
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
                Создать аккаунт
              </button>
              <button
                className={styles.login__submit}
                onClick={onLoginLinkClick}
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
  ({ dispatch }) => async (context) => useServerSideProps(ProjectPage.Register, context, dispatch),
)

export default Register
