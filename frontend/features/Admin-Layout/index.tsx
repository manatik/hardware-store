import React, { FC, ReactElement } from 'react'
import Link from 'next/link'
import { Children } from 'models/Props/props'
import styles from './index.module.scss'

const AdminLayout: FC<Children> = ({ children }): ReactElement => {
  return (
    <>
      <div className={styles.adminLayout__header}>
        <div className={styles.adminLayout__header_container}>
          <div className={styles.adminLayout__header_content}>
            <Link href='/'>
              <a className={styles.adminLayout__link}>
                Главная
              </a>
            </Link>
            <Link href='/admin-control'>
              <a className={styles.adminLayout__link}>
                Админка
              </a>
            </Link>
            <Link href='/admin-control/categories'>
              <a className={styles.adminLayout__link}>
                Категории
              </a>
            </Link>
            <Link href='/admin-control/products'>
              <a className={styles.adminLayout__link}>
                Продукция
              </a>
            </Link>
            <Link href='/admin-control/orders'>
              <a className={styles.adminLayout__link}>
                Заказы
              </a>
            </Link>
            <Link href='/admin-control/users'>
              <a className={styles.adminLayout__link}>
                Пользователи
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.adminLayout__main}>
        <div className={styles.adminLayout__main_container}>
          {children}
        </div>
      </div>
    </>
  )
}

export default AdminLayout
