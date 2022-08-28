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
  remove = true,
  edit = true,
}): ReactElement => {
  const hiddenElem = useRef<HTMLDivElement | null>(null)

  const toggle = () => {
    slideToggle(hiddenElem.current)
  }
  return (
    <div className={styles.card}>
      <div className={styles.card__inner}>
        <div className={styles.card__left}>
          {image && <div className={styles.card__image}>
            <Image
              src={popa}
              height={120}
              width={120}
            />
          </div>}
          <div className={styles.card__left__info}>
            {title && <div className={styles.card__title}>{title}</div>}
            {description && <div className={styles.card__description}>{description}</div>}
          </div>
        </div>
        {(edit || remove) && <div className={styles.card__right}>
          {edit
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

      {form && <div
        className={styles.card__hidden}
        ref={hiddenElem}
               >
        <div className={styles.card__edit}>
          {form}
        </div>
      </div>}
    </div>
  )
}

export default Card
