import React, { FC, ReactElement } from 'react'
import { Children } from '@models/Props/props'

import styles from './index.module.scss'

const Modal: FC<{children: Children, onClose: () => void}> = ({
  children, onClose,
}): ReactElement => {
  return (
    <div
      onClick={onClose}
      className={styles.modal}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
