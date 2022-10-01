import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import vk from 'assets/layout/vk.svg'
import tg from 'assets/layout/tg.svg'
import wu from 'assets/layout/wu.svg'

import styles from './index.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__top}>
          <div className={styles.footer__links}>
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
          <div className={styles.footer__contact}>
            <div className={styles.footer__contact__link}>+79091349009</div>
            <div className={styles.footer__contact__link}>
              г. Киров, ул. Индустриальная&nbsp;20А
            </div>
          </div>
          <div className={styles.footer__social}>
            <div className={styles.footer__social__link}><Image src={vk} /></div>
            <div className={styles.footer__social__link}><Image src={tg} /></div>
            <div className={styles.footer__social__link}><Image src={wu} /></div>
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
