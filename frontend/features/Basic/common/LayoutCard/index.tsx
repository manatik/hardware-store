import React, { FC } from 'react'
import { Children } from '@models/Props/props'

import close from 'assets/close.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './index.module.scss'

interface LayoutCardProps {
  children: Children
}
const LayoutCard: FC<LayoutCardProps> = ({ children }) => {
  const { query, push } = useRouter()
  const redirectUrl = query.redirectUrl as string || '/'
  const hash = query.hash ? `#${query.hash}` : ''

  const onClose = (): Promise<boolean> => push(`${redirectUrl}${hash}`)

  return (
    <div className={styles.layoutCard}>
      <div className={styles.layoutCard__inner}>
        <div className={styles.layoutCard__close_block}>
          <button
            onClick={onClose}
            className={styles.layoutCard__close}
          >
            <Image
              src={close}
              alt="close"
            />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

export default LayoutCard
