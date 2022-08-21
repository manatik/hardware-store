import React, { FC, useState } from 'react'
import cn from 'classnames'
import { PropsCardGrid } from '@features/Admin/ui/CardGrid/types'

import { InputType } from '@features/Admin/ui/InputField/types'
import InputField from '@features/Admin/ui/InputField'
import Portal from '@features/Basic/common/Portal'
import Modal from '@features/Basic/common/Modal'
import styles from './index.module.scss'

const CardGrid: FC<PropsCardGrid> = ({
  title,
  description,
  type,
  price,
}) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const onChange = (e: any) => {
    // eslint-disable-next-line no-console
    console.log(123, e)
  }

  const onToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div className={styles.cardGrid__wrapper}>
      <div className={styles.cardGrid}>
        <div className={styles.cardGrid__top}>
          {title && <div className={styles.cardGrid__top__title}>{title}</div>}
          {description && <div className={styles.cardGrid__top__description}>{description}</div>}
          {type && <div className={styles.cardGrid__top__description}>{type}</div>}
          {price && <div className={styles.cardGrid__top__price}>{price}</div>}
        </div>

        <div className={styles.cardGrid__bottom}>
          <div className={styles.cardGrid__bottom__buttons}>
            <div
              className={cn(styles.cardGrid__button, styles.cardGrid__buttonEdit)}
              onClick={onToggle}
            >
              Редактировать
            </div>
            <div className={cn(styles.cardGrid__button, styles.cardGrid__buttonRemove)}>
              Удалить
            </div>
          </div>
          {toggle && <Portal>
            <Modal>
              <>
                <div className={styles.form}>
                  <button
                    onClick={onToggle}
                    className={styles.form__close}
                  >
                  </button>
                  <div className={styles.form__title}>{title}</div>
                  <div className={styles.cardGrid__bottom__inputs}>
                    <InputField
                      type={InputType.Text}
                      name="title"
                      value={title}
                      label="Название"
                      size="md"
                      onChange={onChange}
                    />

                    <InputField
                      type={InputType.Text}
                      name="description"
                      value={description}
                      label="Описание"
                      size="md"
                      onChange={onChange}
                    />

                    <InputField
                      type={InputType.Text}
                      name="type"
                      value={type}
                      label="Тип"
                      size="md"
                      onChange={onChange}
                    />

                    <InputField
                      type={InputType.Text}
                      name="price"
                      value={price}
                      label="Цена"
                      size="md"
                      onChange={onChange}
                    />

                    <div
                      className={cn(styles.cardGrid__button, styles.cardGrid__buttonEdit)}
                      onClick={onToggle}
                    >
                      Сохранить
                    </div>
                  </div>
                </div>
              </>
            </Modal>
          </Portal>}
        </div>
      </div>
    </div>
  )
}

export default CardGrid
