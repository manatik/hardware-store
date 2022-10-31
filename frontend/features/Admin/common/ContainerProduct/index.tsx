import React, { FC, ReactElement, useState } from 'react'
// import Card from '@features/Admin/ui/Card'
import Portal from '@features/Basic/common/Portal'
import Modal from '@features/Basic/common/Modal'

import { PropsContainerProduct } from '@features/Admin/common/ContainerProduct/types'
import { IChildren } from '@models/Props/props'

import styles from '@features/Admin/common/ContainerProduct/index.module.scss'

const ContainerProduct: FC<PropsContainerProduct> = ({
  title,
  buttonName,
  form,
  cards,
}): ReactElement<IChildren> => {
  const [toggle, setToggle] = useState<boolean>(false)
  const onToggle = () => {
    setToggle(!toggle)
  }
  return (
    <div className={styles.containerProduct}>
      <div className={styles.containerProduct__header}>
        <div className={styles.containerProduct__title}>{title}</div>
        <div>
          {buttonName && <div
            className={styles.containerProduct__button}
            onClick={onToggle}
                         >
            {buttonName}
          </div>}
        </div>
      </div>
      {cards && <div className={styles.containerProduct__cards}>
        {/* <Card /> */}
      </div>}
      {toggle && <Portal>
        <Modal onClose={onToggle}>
          <>
            <div className={styles.form}>
              <button
                onClick={onToggle}
                className={styles.form__close}
              >
              </button>
              <div className={styles.form__title}>{buttonName}</div>
              {form}
            </div>
          </>
        </Modal>
      </Portal>}
    </div>
  )
}

export default ContainerProduct
