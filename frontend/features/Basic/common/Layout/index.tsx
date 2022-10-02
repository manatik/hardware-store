import React, { FC } from 'react'
import { Children } from '@models/Props/props'
import Topline from '@features/Basic/common/Topline'
import Footer from '@features/Basic/common/Footer'

import styles from './index.module.scss'

interface LayoutProps {
  children: Children;
  absolute?: boolean;
  dark?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  absolute = true,
  dark = false,
}) => {
  return (
    <>
      <div className={!absolute ? styles.layout : ''}>
        <Topline
          absolute={absolute}
          dark={dark}
        />
        <main className={styles.layout__content}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
