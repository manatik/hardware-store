import React, { FC, ReactElement } from 'react'
import { Children } from '@models/Props/props'

import styles from './index.module.scss'

const Modal: FC<Children> = ({ children }): ReactElement => {
  return <div className={styles.modal}>{children}</div>
}

export default Modal
