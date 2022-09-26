import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import vk from 'assets/layout/vk.svg'
import tg from 'assets/layout/tg.svg'
import wu from 'assets/layout/wu.svg'
import basket from 'assets/layout/fa-shopping-bag.svg'
import styles from './index.module.scss'

const Topline = () => {
  return (
    <div className={styles.topline}>
      <div className={styles.topline__inner}>
        <div className={styles.topline__left}>
          <Link href="/">
            <a className={styles.topline__link}>Главная</a>
          </Link>
          <Link href="/products">
            <a className={styles.topline__link}>Продукты</a>
          </Link>
          <Link href="/service">
            <a className={styles.topline__link}>Сервис</a>
          </Link>
          <Link href="/contacts">
            <a className={styles.topline__link}>Контакты</a>
          </Link>
        </div>
        <div className={styles.topline__right}>
          <div className={styles.topline__social}>
            <div className={styles.topline__social__link}><Image src={vk} /></div>
            <div className={styles.topline__social__link}><Image src={tg} /></div>
            <div className={styles.topline__social__link}><Image src={wu} /></div>
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
