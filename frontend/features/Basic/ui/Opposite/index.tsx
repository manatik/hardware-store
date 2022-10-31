import React, { FC, useEffect } from 'react'
import Modal from '@features/Basic/common/Modal'
import Image from 'next/image'
import { Formik } from 'formik'
import { HouseFormSchema } from '@schema/houseForm'
import InputField from '@features/Basic/ui/InputField'
import { InputType } from '@features/Basic/ui/InputField/types'
import stylesInput from '@features/Basic/ui/InputField/index.module.scss'
import cn from 'classnames'
import ReactInputMask from 'react-input-mask'
import TextAriaField from '@features/Basic/ui/TextAriaField'
import Portal from '@features/Basic/common/Portal'

import { orderService } from '@services/order/order.service'
import close from 'assets/close.svg'
import { toast } from 'react-toastify'
import styles from './index.module.scss'

interface OppositeProps {
  onClose: () => void;
  title: string;
}
const Opposite: FC<OppositeProps> = ({ onClose, title }) => {
  const handleSubmit = async (values: any) => {
    try {
      const { success } = await orderService.orderEmail(values)
      if (success) toast.success('Заявка отправлена, скоро мы вам перезвоним!')
      return 'success'
    } catch (e: any) {
      toast.error(e.message || 'Ошибка сервера')
      return 'error'
    }
  }

  useEffect(() => {
    document.documentElement.classList.add('g_lockscroll')
    return () => document.documentElement.classList.remove('g_lockscroll')
  }, [])

  return (
    <Portal>
      <Modal onClose={onClose}>
        <div className={styles.opposite}>
          <div
            className={styles.opposite__close}
            onClick={onClose}
          >
            <Image
              src={close}
              alt="close"
            />
          </div>
          <div className={styles.opposite__title}>{title}</div>
          <div className={styles.opposite__info}>
            Заполните форму обратной связи и&nbsp;ждите звонка
            в&nbsp;течение суток или&nbsp;позвоните нам&nbsp;по&nbsp;номеру{' '}
            <b>+7&nbsp;909&nbsp;134-90-09</b>
          </div>
          <Formik
            initialValues={{
              fio: '',
              phone: '',
              message: '',
            }}
            validationSchema={HouseFormSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={async (values) => {
              const data = await handleSubmit(values)

              if (data === 'success') onClose()
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
                  name="fio"
                  placeholder="Имя*"
                  onChange={handleChange}
                  value={values.fio}
                  error={errors.fio}
                  size="md"
                />

                <div className={stylesInput.input__field__wrapper}>
                  <div
                    className={cn(
                      stylesInput.input__field,

                      'md',
                      {
                        [stylesInput.error]: errors.phone,
                        // [styles.disable]: isDisabled,
                      },
                    )}
                  >
                    <ReactInputMask
                      mask="+7 999 999-99-99"
                      type="tel"
                      autoComplete="tel"
                      name="phone"
                      placeholder="+7 999 999-99-99*"
                      onChange={handleChange}
                      value={values.phone}
                      className={stylesInput.input__fieldControl}
                    />
                  </div>
                  {errors.phone && <div className={stylesInput.input__fieldError}>
                    {errors.phone}
                  </div>}
                </div>

                <TextAriaField
                  name="message"
                  placeholder="Сообщение"
                  onChange={handleChange}
                  value={values.message}
                />

                <button
                  type="submit"
                  className={styles.opposite__button}
                >
                  Заказать звонок
                </button>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </Portal>
  )
}

export default Opposite
