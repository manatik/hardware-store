import React, {
  FC, ReactElement,
} from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import vkLight from 'assets/layout/vk.svg'
import tgLight from 'assets/layout/tg.svg'
import wuLight from 'assets/layout/wu.svg'
import vkDark from 'assets/layout/vk-dark.svg'
import tgDark from 'assets/layout/tg-dark.svg'
import wuDark from 'assets/layout/wu-dark.svg'
import basket from 'assets/layout/fa-shopping-bag.svg'
import styles from './index.module.scss'

interface ToplineProps {
  dark: boolean;
  absolute: boolean;
  link?: string;
}

enum ToplineLinks {
  Home = '/',
  Products = '/products',
  Service = '/service',
  Contacts = '/contacts',
}

const Topline: FC<ToplineProps> = ({
  dark,
  link,
  absolute,
}): ReactElement => {
  return (
    <header
      className={cn(styles.topline__wrap, {
        [styles.toplineDark]: dark,
      })}
    >
      <div
        className={styles.topline}
      >
        <div
          className={cn(styles.topline__inner, {
            [styles.toplineAbsolute]: absolute,
          })}
        >
          <div
            className={cn(styles.topline__left, {
              [styles.topline__leftDark]: dark,
            })}
          >
             <Link href={ToplineLinks.Home}>
              <a
                className={cn(styles.topline__link, {
                  [styles.topline__linkDark]: dark,
                })}
              >Главная</a>
             </Link>
             <Link href={ToplineLinks.Products}>
              <a
                className={cn(styles.topline__link, {
                  [styles.topline__leftActive]: link === ToplineLinks.Products,
                  [styles.topline__linkDark]: dark,
                })}
              >Продукты</a>
             </Link>
             <Link href={ToplineLinks.Service}>
              <a
                className={cn(styles.topline__link, {
                  [styles.topline__leftActive]: link === ToplineLinks.Service,
                  [styles.topline__linkDark]: dark,
                })}
              >Сервис</a>
             </Link>
             <Link href={ToplineLinks.Contacts}>
              <a
                className={cn(styles.topline__link, {
                  [styles.topline__leftActive]: link === ToplineLinks.Contacts,
                  [styles.topline__linkDark]: dark,
                })}
              >Контакты</a>
             </Link>
          </div>
          <div className={styles.topline__right}>
            <div className={styles.topline__social}>
              {dark
                ? <>
                  <div className={styles.topline__social__link}><Image src={vkDark} /></div>
                  <div className={styles.topline__social__link}><Image src={tgDark} /></div>
                  <div className={styles.topline__social__link}><Image src={wuDark} /></div>
                </>
                : <>
                  <div className={styles.topline__social__link}><Image src={vkLight} /></div>
                  <div className={styles.topline__social__link}><Image src={tgLight} /></div>
                  <div className={styles.topline__social__link}><Image src={wuLight} /></div>
                </>
              }
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
    </header>
  )
}

export default Topline
