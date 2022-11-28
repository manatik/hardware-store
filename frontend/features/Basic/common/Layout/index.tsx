import React, { FC, useEffect } from 'react'
import { Children } from '@models/Props/props'
import Topline from '@features/Basic/common/Topline'
import Footer from '@features/Basic/common/Footer'

import cn from 'classnames'
import { yandexCounter } from '@utils/metrics/yandexCounter'
import styles from './index.module.scss'

interface LayoutProps {
  children: Children;
  pageName: string;
  absolute?: boolean;
  dark?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  absolute = true,
  dark = false,
  pageName,
}) => {
  const [scroll, setScroll] = React.useState(0)

  const handleScroll = () => {
    setScroll(window.scrollY)
  }

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    yandexCounter.initReach(pageName)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      <div className={!absolute ? styles.layout : ''}>
        <Topline
          absolute={absolute}
          dark={dark}
        />
        <main className={styles.layout__content}>
          {children}
          <div
            className={cn(styles.layout__scroll, {
              [styles.layout__scrollActive]: scroll > 100,
            })}
          >
            <div
              className={styles.layout__scroll_btn}
              onClick={handleScrollTop}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
