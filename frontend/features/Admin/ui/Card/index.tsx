import React, { FC, ReactElement, useRef } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import popa from 'assets/popa.jpeg'
import { slideToggle } from '@utils/slideToogle'
import { CardProps } from '@features/Admin/ui/Card/types'

import styles from './index.module.scss'

const Card: FC<CardProps> = ({
  image,
  title,
  description,
  form,
  formPhoto,
  remove = true,
  edit = true,
  addPhotos = true,
}): ReactElement => {
  const hiddenElemForm = useRef<HTMLDivElement | null>(null)
  const hiddenElemPhoto = useRef<HTMLDivElement | null>(null)

  const toggle = () => {
    slideToggle(hiddenElemForm.current)
  }

  const toggleFormPhoto = () => {
    slideToggle(hiddenElemPhoto.current)
  }
  return (
    <div className={styles.card}>
      <div className={styles.card__inner}>
        <div className={styles.card__left}>
          {image && <div className={styles.card__image}>
            <Image
              src={image.path}
              alt={image.filename}
              height={120}
              width={120}
            />
          </div>}
          <div className={styles.card__left__info}>
            {title && <div className={styles.card__title}>{title}</div>}
            {description && <div className={styles.card__description}>{description}</div>}
          </div>
        </div>
        {(edit || remove || addPhotos) && <div className={styles.card__right}>
          {addPhotos && formPhoto
            && <div
              className={cn(
                styles.card__button,
                styles.card__buttonEdit,
              )}
              onClick={toggleFormPhoto}
               >
              Добавить фото
            </div>}
          {edit && form
            && <div
              className={cn(
                styles.card__button,
                styles.card__buttonEdit,
              )}
              onClick={toggle}
               >
              Редактировать
            </div>}
          {remove
            && <div
              className={cn(
                styles.card__button,
                styles.card__buttonRemove,
              )}
               >
              Удалить
            </div>}
        </div>}
      </div>

      {formPhoto && (
        <div
          className={styles.card__hidden}
          ref={hiddenElemPhoto}
        >
        <div className={styles.card__edit}>
          {formPhoto}
        </div>
      </div>
      )}
      {form && (
        <div
          className={styles.card__hidden}
          ref={hiddenElemForm}
        >
          <div className={styles.card__edit}>
            {form}
          </div>
        </div>
      )}
    </div>
  )
}

export default Card
