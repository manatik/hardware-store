import React, { FC, ReactElement } from 'react'
import { IChildren } from '@models/Props/props'

import styles from './index.module.scss'

const Modal: FC<IChildren> = ({ children }): ReactElement => {
  return <div className={styles.modal}>{children}</div>
}

export default Modal
