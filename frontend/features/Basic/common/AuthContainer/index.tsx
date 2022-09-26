import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { IChildren } from '@models/Props/props'

import styles from './index.module.scss'

const AuthContainer: FC<IChildren> = ({ children }) => {
  const router = useRouter()
  return (
    <div className={styles.auth}>
      <button
        onClick={() => router.push('/')}
        className={styles.auth__close}
      />

      <div className={styles.auth__container}>
        {children}
      </div>
    </div>
  )
}

export default AuthContainer
