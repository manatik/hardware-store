import React, {
  FC, ReactElement, useEffect, useState,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'

import vk from 'assets/layout/vk.svg'
import tg from 'assets/layout/tg.svg'
import wu from 'assets/layout/wu.svg'
import vkDark from 'assets/layout/vk-dark.svg'
import tgDark from 'assets/layout/tg-dark.svg'
import wuDark from 'assets/layout/wu-dark.svg'
import basket from 'assets/layout/fa-shopping-bag.svg'
import cn from 'classnames'
import styles from './index.module.scss'

interface ToplineProps {
  dark: boolean;
  link?: string;
}

const Topline: FC<ToplineProps> = ({ dark, link }): ReactElement => {
  const [socialIcon, setSocialIcon] = useState({
    vk,
    tg,
    wu,
  })

  console.log(link)

  useEffect(() => {
    if (dark) {
      setSocialIcon({
        vk: vkDark,
        tg: tgDark,
        wu: wuDark,
      })
    }
  }, [dark])

  return (
    <div
      className={cn(styles.topline, {
        [styles.toplineDark]: dark,
      })}
    >
      <div
        className={styles.topline__inner}
      >
        <div
          className={cn(styles.topline__left, {
            [styles.topline__leftDark]: dark,
          })}
        >
          <Link href="/">
            <a
              className={cn(styles.topline__link, {
                [styles.topline__linkDark]: dark,
              })}
            >Главная</a>
          </Link>
          <Link href="/products">
            <a
              className={cn(styles.topline__link, {
                [styles.topline__leftActive]: link === '/products',
                [styles.topline__linkDark]: dark,
              })}
            >Продукты</a>
          </Link>
          <Link href="/service">
            <a
              className={cn(styles.topline__link, {
                [styles.topline__leftActive]: link === '/service',
                [styles.topline__linkDark]: dark,
              })}
            >Сервис</a>
          </Link>
          <Link href="/contacts">
            <a
              className={cn(styles.topline__link, {
                [styles.topline__leftActive]: link === '/contacts',
                [styles.topline__linkDark]: dark,
              })}
            >Контакты</a>
          </Link>
        </div>
        <div className={styles.topline__right}>
          <div className={styles.topline__social}>
            <div className={styles.topline__social__link}><Image src={socialIcon.vk} /></div>
            <div className={styles.topline__social__link}><Image src={socialIcon.tg} /></div>
            <div className={styles.topline__social__link}><Image src={socialIcon.wu} /></div>
          </div>
          <div className={styles.topline__inter}>
            <button className={styles.topline__call}>Заказать звонок</button>
            <button className={styles.topline__basket}>
              <Image src={basket} />
              <span className={styles.topline__basket__point}>3</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topline
