import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import vk from 'assets/layout/vk.svg'
import tg from 'assets/layout/tg.svg'
import wu from 'assets/layout/wu.svg'
import ozon from 'assets/layout/ozon-light-min.svg'

import cn from 'classnames'
import styles from './index.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__top}>
          <div className={styles.footer__links}>
            <Link href="/">
              <a className={styles.footer__link__logo} />
            </Link>
            <div className={styles.footer__links__content}>
              <Link href="/">
                <a className={styles.footer__link}>Главная</a>
              </Link>
              <Link href="/products">
                <a className={styles.footer__link}>Продукты</a>
              </Link>
              <Link href="/service">
                <a className={styles.footer__link}>Сервис</a>
              </Link>
              <Link href="/contacts">
                <a className={styles.footer__link}>Контакты</a>
              </Link>
            </div>
            <div className={styles.footer__links__social_mobile}>
              <a
                href="https://www.ozon.ru/seller/plywood-market-622604/products/?miniapp=seller_622604"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.footer__social__link, styles.footer__social__linkOzon)}
              />
              <a
                href="https://vk.com/plywood_market"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.footer__social__link, styles.footer__social__linkVk)}
              />
              <a
                href="https://t.me/plywood_market"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.footer__social__link, styles.footer__social__linkTg)}
              />
              <a
                href="https://api.whatsapp.com/send?phone=79091349009&text=Plywood%20Market"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.footer__social__link, styles.footer__social__linkWu)}
              />
            </div>
          </div>
          <div className={styles.footer__links_mobile}>
            <Link href="/">
              <a className={styles.footer__link}>Главная</a>
            </Link>
            <Link href="/products">
              <a className={styles.footer__link}>Продукты</a>
            </Link>
            <Link href="/service">
              <a className={styles.footer__link}>Сервис</a>
            </Link>
            <Link href="/contacts">
              <a className={styles.footer__link}>Контакты</a>
            </Link>
          </div>
          <div className={styles.footer__right}>
            <div className={styles.footer__contact}>
              <div className={styles.footer__contact__link}>+79091349009</div>
              <div className={styles.footer__contact__link}>
                г. Киров, ул. Индустриальная&nbsp;20А
              </div>
            </div>
            <div className={styles.footer__social}>
              <a
                href="https://www.ozon.ru/seller/plywood-market-622604/products/?miniapp=seller_622604"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__social__link}
              >
                <Image
                  src={ozon}
                  alt="ozon"
                />
              </a>
              <a
                href="https://vk.com/plywood_market"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__social__link}
              >
                <Image
                  src={vk}
                  alt="vk"
                />
              </a>
              <a
                href="https://t.me/plywood_market"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__social__link}
              >
                <Image
                  src={tg}
                  alt='tg'
                />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=79091349009&text=Plywood%20Market"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__social__link}
              >
                <Image
                  src={wu}
                  alt="wu"
                />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          Plywood Market. Copyright ©️ 2022
        </div>
      </div>
    </footer>
  )
}

export default Footer
