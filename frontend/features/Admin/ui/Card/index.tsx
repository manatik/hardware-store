import React, { FC, ReactElement, useRef } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import popa from 'assets/popa.jpeg'
import InputField from '@features/Admin/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import { slideToggle } from '@utils/slideToogle'

import styles from './index.module.scss'

const Card: FC = (): ReactElement => {
  const hiddenElem = useRef<HTMLDivElement | null>(null)
  const onChange = (e: any) => {
    // eslint-disable-next-line no-console
    console.log(123, e)
  }

  const toggle = () => {
    slideToggle(hiddenElem.current)
  }
  return (
    <div className={styles.card}>
      <div className={styles.card__inner}>
        <div className={styles.card__left}>
          <div className={styles.card__image}>
            <Image
              src={popa}
              height={120}
              width={120}
            />
          </div>
          <div className={styles.card__left__info}>
            <div className={styles.card__title}>Вишневый пирог</div>
            <div className={styles.card__description}>described</div>
          </div>
        </div>
        <div className={styles.card__right}>
          <div
            className={cn(
              styles.card__button,
              styles.card__buttonEdit,
            )}
            onClick={toggle}
          >
            Редактировать
          </div>
          <div
            className={cn(
              styles.card__button,
              styles.card__buttonRemove,
            )}
          >
            Удалить
          </div>
        </div>
      </div>

      <div
        className={styles.card__hidden}
        ref={hiddenElem}
      >
        <div className={styles.card__edit}>
          <InputField
            type={InputType.Text}
            name="title"
            value=''
            label="Название"
            size="md"
            onChange={onChange}
          />

          <InputField
            type={InputType.Text}
            name="title"
            value=''
            label="Описание"
            size="md"
            onChange={onChange}
          />

          <InputField
            type={InputType.Text}
            name="title"
            value=''
            label="Что-то еще"
            size="md"
            onChange={onChange}
          />

          <div
            className={cn(
              styles.card__button,
              styles.card__buttonEdit,
            )}
          >
            Сохранить изменения
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
