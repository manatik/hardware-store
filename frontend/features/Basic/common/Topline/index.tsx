import React, {
  FC, ReactElement, useState,
} from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Opposite from '@features/Basic/ui/Opposite'

import basket from 'assets/layout/fa-shopping-bag.svg'

import MobileMenu from '@features/Basic/common/Topline/components/MobileMenu'
import { useAppSelector } from '@store/hooks'
import { getUserInfo } from '@store/app/selector'
import { getBasketEntities } from '@store/basket/selector'
import styles from './index.module.scss'

interface ToplineProps {
  dark: boolean;
  absolute: boolean;
}

export enum ToplineLinks {
  Home = '/',
  Products = '/products',
  Service = '/service',
  Contacts = '/contacts',
  Basket = '/basket',
  Admin = '/admin-control/products',
}

const Topline: FC<ToplineProps> = ({
  dark,
  absolute,
}): ReactElement => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [mobileMenu, setMobileMenu] = useState<boolean>(false)
  const basketEntities = useAppSelector(getBasketEntities)
  const user = useAppSelector(getUserInfo)
  const { pathname } = useRouter()

  const toggleMobileMenu = (): void => {
    setMobileMenu(!mobileMenu)
    document.documentElement.classList.add('g_lockscroll')
  }

  const toggleModal = (): void => {
    if (mobileMenu) toggleMobileMenu()

    setToggle(!toggle)
    document.documentElement.classList.add('g_lockscroll')
  }

  return (
    <header
      className={cn(styles.topline, {
        [styles.toplineDark]: dark,
      })}
    >
      <div
        className={cn(styles.topline__inner, {
          [styles.toplineAbsolute]: absolute,
        })}
      >
        <div
          className={styles.topline__left}
        >
          <Link href={ToplineLinks.Home}>
            <a
              className={cn(styles.topline__left__logo, {
                [styles.topline__left__logoDark]: dark,
              })}
            />
          </Link>
          <div
            className={cn(styles.topline__links, {
              [styles.topline__linksAdmin]: user?.isAdmin,
            })}
          >
            {user?.isAdmin && (
              <Link href={ToplineLinks.Admin}>
                <a
                  className={cn(styles.topline__link, {
                    [styles.topline__linkDark]: dark,
                  })}
                >Админка</a>
              </Link>
            )}
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

        </div>
        <div className={styles.topline__right}>
          <div className={styles.topline__social}>
            <a
              href="https://www.ozon.ru/seller/plywood-market-622604/products/?miniapp=seller_622604"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.topline__social__link, {
                [styles.topline__social__link__darkOzon]: dark,
                [styles.topline__social__link__lightOzon]: !dark,
              })}
            />
            <a
              href="https://vk.com/plywood_market"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.topline__social__link, {
                [styles.topline__social__link__darkVk]: dark,
                [styles.topline__social__link__lightVk]: !dark,
              })}
            />

            <a
              href="https://t.me/plywood_market"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.topline__social__link, {
                [styles.topline__social__link__darkTg]: dark,
                [styles.topline__social__link__lightTg]: !dark,
              })}
            />

            <a
              href="https://api.whatsapp.com/send?phone=79091349009&text="
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.topline__social__link, {
                [styles.topline__social__link__darkWu]: dark,
                [styles.topline__social__link__lightWu]: !dark,
              })}
            />
          </div>
          <div className={styles.topline__inter}>
            <button
              className={styles.topline__call}
              onClick={toggleModal}
            >Заказать звонок
            </button>
            <Link href={`${ToplineLinks.Basket}?redirectUrl=${pathname || ''}`}>
              <a className={styles.topline__basket}>
                 <Image
                   src={basket}
                   alt="basket"
                 />
                {basketEntities.length > 0 && (
                  <span className={styles.topline__basket__point}>{basketEntities.length}</span>
                )}
              </a>
            </Link>
            <div
              className={cn(styles.topline__mobile, {
                [styles.topline__mobileDark]: dark,
              })}
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
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

      {mobileMenu && (
        <MobileMenu
          onClose={toggleMobileMenu}
          openCall={toggleModal}
        />
      )}
    </header>
  )
}

export default Topline
