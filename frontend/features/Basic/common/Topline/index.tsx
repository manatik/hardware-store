import React, {
  FC, ReactElement, useState,
} from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Opposite from '@features/Basic/ui/Opposite'

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
}

enum ToplineLinks {
  Home = '/',
  Products = '/products',
  Service = '/service',
  Contacts = '/contacts',
  Basket = '/basket',
}

const Topline: FC<ToplineProps> = ({
  dark,
  absolute,
}): ReactElement => {
  const [toggle, setToggle] = useState<boolean>(false)
  const { pathname } = useRouter()

  const toggleModal = (): void => {
    setToggle(!toggle)
    document.documentElement.classList.toggle('g_lockscroll')
  }

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
                  [styles.topline__leftActive]: pathname === ToplineLinks.Products,
                  [styles.topline__linkDark]: dark,
                })}
              >Продукты</a>
             </Link>
             <Link href={ToplineLinks.Service}>
              <a
                className={cn(styles.topline__link, {
                  [styles.topline__leftActive]: pathname === ToplineLinks.Service,
                  [styles.topline__linkDark]: dark,
                })}
              >Сервис</a>
             </Link>
             <Link href={ToplineLinks.Contacts}>
              <a
                className={cn(styles.topline__link, {
                  [styles.topline__leftActive]: pathname === ToplineLinks.Contacts,
                  [styles.topline__linkDark]: dark,
                })}
              >Контакты</a>
             </Link>
          </div>
          <div className={styles.topline__right}>
            <div className={styles.topline__social}>
              {dark
                ? <>
                  <a
                    href="https://vk.com/plywood_market"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.topline__social__link}
                  ><Image src={vkDark} /></a>

                  <a
                    href="https://t.me/plywood_market"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.topline__social__link}
                  ><Image src={tgDark} /></a>

                  <a
                    href="https://api.whatsapp.com/send?phone=79091349009&text=Plywood%20Market"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.topline__social__link}
                  ><Image src={wuDark} /></a>
                </>
                : <>
                  <a
                    href="https://vk.com/plywood_market"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.topline__social__link}
                  ><Image src={vkLight} /></a>

                  <a
                    href="https://t.me/plywood_market"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.topline__social__link}
                  ><Image src={tgLight} /></a>

                  <a
                    href="https://api.whatsapp.com/send?phone=79091349009&text=Plywood%20Market"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.topline__social__link}
                  ><Image src={wuLight} /></a>
                </>
              }
            </div>
            <div className={styles.topline__inter}>
              <button
                className={styles.topline__call}
                onClick={toggleModal}
              >Заказать звонок</button>
              <Link href={`${ToplineLinks.Basket}?redirectUrl=${pathname || ''}`}>
                <a className={styles.topline__basket}>
                  <Image src={basket} />
                  <span className={styles.topline__basket__point}>3</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {toggle && (
        <Opposite
          onClose={toggleModal}
          title="Остались вопросы?"
        />
      )}
    </header>
  )
}

export default Topline
